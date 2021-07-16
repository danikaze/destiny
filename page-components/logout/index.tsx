import { FC } from 'react';
import { Page } from '@components/page';

export type Props = {};

export const LogoutPage: FC<Props> = () => {
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  return <Page active="user" title={title} header="Logged-out" />;
};
