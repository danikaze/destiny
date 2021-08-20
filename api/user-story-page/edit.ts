import { apiError } from '@api';
import { updateStoryPage } from '@model/story';
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
>(async (req, res) => {
  const { userId } = req.user!;
  const { storyId, pageId } = req.query;
  const { name, content, options } = req.body;

  try {
    await updateStoryPage(userId, storyId, pageId, { name, content, options });
  } catch (error) {
    return apiError(res, { error });
  }

  return res.json({ data: {} });
});
