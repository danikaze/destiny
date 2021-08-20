import { apiError, ApiHandler } from '@api';
import { readStoryPage } from '@model/story';
import { ChooseStoryQuery, ChooseStoryResponse } from './interface';

export const chooseStoryOption: ApiHandler<
  ChooseStoryResponse,
  ChooseStoryQuery
> = async (req, res) => {
  const { pageId, storyId } = req.query;

  const page = await readStoryPage(storyId, pageId);

  if (!page) {
    return apiError(res, { error: 'Invalid data' });
  }

  return res.json({ data: page });
};
