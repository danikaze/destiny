import { apiError } from '@api';
import { mockStories } from '@model/story/mock';
import { userRequiredApiHandler } from '@utils/auth';
import { EditStoryQuery, EditStoryBody, EditStoryResponse } from './interface';

export const editStoryApiHandler = userRequiredApiHandler<
  EditStoryResponse,
  EditStoryQuery,
  EditStoryBody
>((req, res) => {
  const user = req.user!;
  const { storyId } = req.query;
  const { title, state, entryPageId } = req.body;

  const story = mockStories.find(
    (story) => story.authorUserId === user.userId && story.storyId === storyId
  );

  if (!story) {
    apiError(res, { error: 'Invalid storyId' });
    return;
  }

  if (title !== undefined) {
    story.title = title;
  }
  if (state !== undefined) {
    story.state = state;
  }
  if (entryPageId !== undefined) {
    story.entryPageId = entryPageId;
  }

  return res.json({ data: {} });
});
