import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage } from '@_app';
import { StoryPage } from '@model/story/interface';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { userRequiredServerSideProps } from '@utils/auth';
import { UserStoryPagePage, Props } from '@page-components/user-story-page';

interface Query {
  storyId: StoryPage['storyId'];
  pageId: StoryPage['pageId'];
}

const UserStoryPagePageHandler: AppPage<Props> = (props) => {
  return <UserStoryPagePage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props, Query>(
  async ({ locale, req, query }) => {
    const user = req.user;
    const { storyId, pageId } = query;

    const story =
      mockStories.filter(
        (story) =>
          story.authorUserId === user.userId && story.storyId === storyId
      )[0] || null;

    const allPages = story
      ? mockStoryPages.filter((page) => page.storyId === storyId)
      : null;

    const page = allPages
      ? allPages.filter((page) => page.pageId === pageId)[0] || null
      : null;

    const pages = allPages
      ? allPages.map((page) => ({ pageId: page.pageId, name: page.name }))
      : null;

    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'user-stories'])),
        story,
        page,
        pages,
      },
    };
  }
);

export default UserStoryPagePageHandler;
