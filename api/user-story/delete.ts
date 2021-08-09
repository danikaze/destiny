import { mockStories } from '@model/story/mock';
import { userRequiredApiHandler } from '@utils/auth';
import {
  DeleteStoryQuery,
  DeleteStoryBody,
  DeleteStoryResponse,
} from './interface';

export const deleteStoryApiHandler = userRequiredApiHandler<
  DeleteStoryResponse,
  DeleteStoryQuery,
  DeleteStoryBody
>((req, res) => {
  const user = req.user!;
  const { storyId } = req.query;

  const storyIndex = mockStories.findIndex(
    (story) => story.authorUserId === user.userId && story.storyId === storyId
  );

  if (storyIndex !== -1) {
    mockStories.splice(storyIndex, 1);
  }

  return res.json({ data: {} });
});
