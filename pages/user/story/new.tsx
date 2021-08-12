import { i18n } from 'next-i18next';
import { AppPage } from '@_app';
import { HttpStatus } from '@api';
import { userRequiredServerSideProps } from '@utils/auth';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { Story, StoryPage, StoryState } from '@model/story/interface';
import { generateUniqueId } from '@model';

const UserStoryPageHandler: AppPage = () => null;

export const getServerSideProps = userRequiredServerSideProps(
  async ({ locale, req }) => {
    const user = req.user;

    const t = i18n!.getFixedT(locale!, 'user-stories');
    const now = Date.now();
    const pageId = generateUniqueId();
    const story: Story = {
      createdAt: now,
      updatedAt: now,
      storyId: generateUniqueId(),
      title: t('storyDefaultTitle'),
      state: StoryState.DRAFT,
      authorUserId: user.userId,
      entryPageId: pageId,
    };

    const entryPage: StoryPage = {
      pageId,
      storyId: story.storyId,
      name: 'Entry page',
      content: '',
      options: [],
    };

    mockStories.push(story);
    mockStoryPages.push(entryPage);

    return {
      redirect: {
        statusCode: HttpStatus.REDIRECT_SEE_OTHER,
        destination: `/user/story/${story.storyId}`,
      },
    };
  }
);

export default UserStoryPageHandler;
