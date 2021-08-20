import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage, GetServerSideProps } from '@_app';
import { StoriesPage, Props } from '@page-components/stories';
import { readPublishedStories } from '@model/story';
import { pick } from '@utils/pick';

const StoriesPageHandler: AppPage<Props> = (props: Props) => {
  return <StoriesPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'stories'])),
    stories: (await readPublishedStories()).map((story) =>
      pick(story, ['storyId', 'title', 'lastPageId'])
    ),
  },
});

export default StoriesPageHandler;
