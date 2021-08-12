import { AppPage } from '@_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserStoryPage, Props } from '@page-components/user-story';
import { userRequiredServerSideProps } from '@utils/auth';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { Story } from '@model/story/interface';

interface Query {
  storyId?: Story['storyId'];
}

const UserStoryPageHandler: AppPage<Props> = (props) => {
  return <UserStoryPage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props, Query>(
  async ({ locale, req, query }) => {
    const user = req.user;
    const storyId = query.storyId;
    const story =
      mockStories.filter(
        (story) =>
          story.authorUserId === user.userId && story.storyId === storyId
      )[0] || null;
    const pages = story
      ? mockStoryPages.filter((page) => page.storyId === story.storyId)
      : null;

    return {
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'user-stories'])),
        story,
        pages,
      },
    };
  }
);

export default UserStoryPageHandler;
