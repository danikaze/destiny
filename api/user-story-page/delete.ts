import { apiError } from '@api';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { userRequiredApiHandler } from '@utils/auth';
import {
  DeleteStoryPageQuery,
  DeleteStoryPageBody,
  DeleteStoryPageResponse,
} from './interface';

export const deleteStoryPageApiHandler = userRequiredApiHandler<
  DeleteStoryPageResponse,
  DeleteStoryPageQuery,
  DeleteStoryPageBody
>((req, res) => {
  const user = req.user!;
  const { storyId, pageId } = req.query;

  const story = mockStories.find(
    (story) => story.authorUserId === user.userId && story.storyId === storyId
  );

  if (!story) {
    return apiError(res, { error: 'Invalid story' });
  }

  if (story.entryPageId === pageId) {
    return apiError(res, { error: `Can't delete current entry page` });
  }

  const pageIndex = mockStoryPages.findIndex(
    (page) => page.storyId === storyId && page.pageId === pageId
  );

  if (pageIndex !== -1) {
    mockStoryPages.splice(pageIndex, 1);
  }

  return res.json({ data: {} });
});
