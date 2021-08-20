import { apiError } from '@api';
import { deleteUserStoryPage } from '@model/story';
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
>(async (req, res) => {
  const { userId } = req.user!;
  const { storyId, pageId } = req.query;

  try {
    await deleteUserStoryPage(userId, storyId, pageId);
  } catch (error) {
    return apiError(res, { error });
  }

  return res.json({ data: {} });
});
