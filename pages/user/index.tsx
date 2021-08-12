import { AppPage } from '@_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserPage, Props } from '@page-components/user';
import { userRequiredServerSideProps } from '@utils/auth';

const UserPageHandler: AppPage<Props> = (props) => {
  return <UserPage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps(
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'user'])),
      },
    };
  }
);

export default UserPageHandler;
