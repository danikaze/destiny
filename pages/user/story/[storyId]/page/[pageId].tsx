import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage } from '@_app';
import { StoryPage } from '@model/story/interface';
import { userRequiredServerSideProps } from '@utils/auth';
import { pick } from '@utils/pick';
import { UserStoryPagePage, Props } from '@page-components/user-story-page';
import { readUserStory } from '@model/story';

interface Query {
  storyId: StoryPage['storyId'];
  pageId: StoryPage['pageId'];
}

const UserStoryPagePageHandler: AppPage<Props> = (props) => {
  return <UserStoryPagePage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props, Query>(
  async ({ locale, req, query }) => {
    const { userId } = req.user;
    const { storyId, pageId } = query;

    const data = await readUserStory(userId, storyId as string);
    let story: Props['story'] = null;
    let page: Props['page'] = null;
    let pages: Props['pages'] = null;

    if (data) {
      story = data.story;
      page = pick(data.pages.filter((page) => page.pageId === pageId)[0], [
        'storyId',
        'pageId',
        'name',
        'content',
        'options',
      ]);
      pages = data.pages.map((page) => pick(page, ['pageId', 'name']));
    }

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
