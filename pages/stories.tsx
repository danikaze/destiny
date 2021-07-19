import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage } from '@_app';
import { Props } from '@page-components/index';
import { StoriesPage } from '@page-components/stories';
import { mockStories } from '@model/story/mock';

const StoriesPageHandler: AppPage<Props> = () => {
  return <StoriesPage stories={mockStories} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default StoriesPageHandler;
