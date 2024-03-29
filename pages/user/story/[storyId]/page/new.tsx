import { i18n } from 'next-i18next';
import { AppPage } from '@_app';
import { HttpStatus } from '@api';
import { userRequiredServerSideProps } from '@utils/auth';
import { StoryPage } from '@model/story/interface';
import { generateUniqueId } from '@model';
import { createStoryPage } from '@model/story';

const UserStoryPagePageHandler: AppPage = () => null;

interface Query {
  storyId: string;
}

export const getServerSideProps = userRequiredServerSideProps<{}, Query>(
  async ({ locale, query }) => {
    const storyId = query.storyId as string;

    const t = i18n!.getFixedT(locale!, 'user-stories');
    const page: StoryPage = {
      storyId,
      pageId: generateUniqueId(),
      name: t('pageDefaultTitle'),
      content: '',
      options: [],
    };

    await createStoryPage(page);

    return {
      redirect: {
        statusCode: HttpStatus.REDIRECT_SEE_OTHER,
        destination: `/user/story/${storyId}/page/${page.pageId}`,
      },
    };
  }
);

export default UserStoryPagePageHandler;
