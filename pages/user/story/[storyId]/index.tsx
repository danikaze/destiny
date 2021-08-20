import { AppPage } from '@_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Story } from '@model/story/interface';
import { userRequiredServerSideProps } from '@utils/auth';
import { pick } from '@utils/pick';
import { UserStoryPage, Props } from '@page-components/user-story';
import { readUserStory } from '@model/story';

interface Query {
  storyId?: Story['storyId'];
}

const UserStoryPageHandler: AppPage<Props> = (props) => {
  return <UserStoryPage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props, Query>(
  async ({ locale, req, query }) => {
    const { userId } = req.user;
    const storyId = query.storyId as string;

    const data = await readUserStory(userId, storyId);
    let story: Props['story'] = null;
    let pages: Props['pages'] = null;

    if (data) {
      story = pick(data.story, ['storyId', 'state', 'entryPageId', 'title']);
      pages = data.pages.map((page) =>
        pick(page, ['pageId', 'name', 'storyId'])
      );
    }

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
