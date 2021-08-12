import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage, GetServerSideProps } from '@_app';
import { StoriesPage, Props } from '@page-components/stories';
import { mockStories } from '@model/story/mock';
import { StoryState } from '@model/story/interface';

const StoriesPageHandler: AppPage<Props> = (props: Props) => {
  return <StoriesPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'stories'])),
    stories: mockStories.filter(
      (story) => story.state === StoryState.PUBLISHED
    ),
  },
});

export default StoriesPageHandler;
