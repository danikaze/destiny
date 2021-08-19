import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage } from '@_app';
import { StoryPage } from '@model/story/interface';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { userRequiredServerSideProps } from '@utils/auth';
import { pick } from '@utils/pick';
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

    let story: Props['story'] =
      mockStories.filter(
        (story) =>
          story.authorUserId === user.userId && story.storyId === storyId
      )[0] || null;
    story = story ? pick(story, ['storyId']) : null;

    const allPages = story
      ? mockStoryPages.filter((page) => page.storyId === storyId)
      : null;

    let page = allPages
      ? allPages.filter((page) => page.pageId === pageId)[0]
      : null;
    page = page
      ? pick(page, ['storyId', 'pageId', 'name', 'content', 'options'])
      : null;

    const pages = allPages
      ? allPages.map((page) => pick(page, ['pageId', 'name']))
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
