import { deleteUserStory } from '@model/story';
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
>(async (req, res) => {
  const { userId } = req.user!;
  const { storyId } = req.query;

  await deleteUserStory(userId, storyId);

  return res.json({ data: {} });
});
