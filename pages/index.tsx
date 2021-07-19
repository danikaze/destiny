import { AppPage } from '@_app';
import { IndexPage, Props } from '@page-components/index';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const IndexPageHandler: AppPage<Props> = () => {
  return <IndexPage />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default IndexPageHandler;
