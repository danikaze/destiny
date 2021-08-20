import { apiError } from '@api';
import { updateStory } from '@model/story';
import { userRequiredApiHandler } from '@utils/auth';
import { EditStoryQuery, EditStoryBody, EditStoryResponse } from './interface';

export const editStoryApiHandler = userRequiredApiHandler<
  EditStoryResponse,
  EditStoryQuery,
  EditStoryBody
>(async (req, res) => {
  const { userId } = req.user!;
  const { storyId } = req.query;
  const { title, state, entryPageId } = req.body;

  try {
    await updateStory(userId, storyId, { title, state, entryPageId });
  } catch (error) {
    apiError(res, { error });
    return;
  }

  return res.json({ data: {} });
});
