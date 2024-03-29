import { IncomingMessage } from 'http';
import App, { AppContext } from 'next/app';
import { UserAuthData } from '@model/user';
import { Auth } from '.';
import { ComponentType, useEffect } from 'react';
import { AppType } from '@_app';
import { NextComponentType } from 'next';

interface AuthRequest extends IncomingMessage {
  session?: {
    passport: {
      user: UserAuthData | undefined;
    };
  };
}

interface Props {
  user?: UserAuthData | undefined;
}

// this allows to maintain the user data in client-side navigation
let userData: UserAuthData | undefined;

export type AcceptedComponent = ComponentType & {
  getInitialProps?: NextComponentType<AppContext>['getInitialProps'];
};

export function wrapApp(Component: AcceptedComponent): AppType {
  const AppWithAuth = ({ user, ...props }: Props) => {
    useEffect(() => {
      userData = user;
    }, [user]);

    return (
      <Auth.Provider value={user}>
        <Component {...props} />
      </Auth.Provider>
    );
  };

  AppWithAuth.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(appContext)
      : {};

    const req = appContext.ctx.req as AuthRequest;
    // tslint:disable-next-line:no-unnecessary-type-annotation
    let user: Props['user'] = (!IS_SERVER && userData) || undefined;
    if (!user) {
      user =
        req && req.session && req.session.passport && req.session.passport.user;
    }

    return {
      ...appProps,
      user,
      pageProps: {
        ...appProps.pageProps,
        ...pageProps,
      },
    };
  };

  return AppWithAuth as AppType;
}
