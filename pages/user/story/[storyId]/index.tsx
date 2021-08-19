import { AppPage } from '@_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { mockStories, mockStoryPages } from '@model/story/mock';
import { Story } from '@model/story/interface';
import { userRequiredServerSideProps } from '@utils/auth';
import { pick } from '@utils/pick';
import { UserStoryPage, Props } from '@page-components/user-story';

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

    let story: Props['story'] = mockStories.filter(
      (story) => story.authorUserId === user.userId && story.storyId === storyId
    )[0];
    story = story
      ? pick(story, ['storyId', 'state', 'entryPageId', 'title'])
      : null;

    const pages: Props['pages'] = story
      ? mockStoryPages
          .filter((page) => page.storyId === story!.storyId)
          .map((page) => pick(page, ['pageId', 'name', 'storyId']))
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
