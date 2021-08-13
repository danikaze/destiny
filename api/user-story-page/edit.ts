import { apiError } from '@api';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { userRequiredApiHandler } from '@utils/auth';
import {
  EditStoryPageQuery,
  EditStoryPageBody,
  EditStoryPageResponse,
} from './interface';

export const editStoryPageApiHandler = userRequiredApiHandler<
  EditStoryPageResponse,
  EditStoryPageQuery,
  EditStoryPageBody
>((req, res) => {
  const user = req.user!;
  const { storyId, pageId } = req.query;
  const { name, content, options } = req.body;

  const story = mockStories.find(
    (story) => story.authorUserId === user.userId && story.storyId === storyId
  );

  if (!story) {
    return apiError(res, { error: 'Invalid storyId' });
  }

  const page = mockStoryPages.find(
    (page) => page.storyId === storyId && page.pageId === pageId
  );

  if (!page) {
    return apiError(res, { error: 'Invalid pageId' });
  }

  if (name !== undefined) {
    page.name = name;
  }
  if (content !== undefined) {
    page.content = content;
  }
  if (options !== undefined) {
    page.options = options;
  }

  return res.json({ data: {} });
});
