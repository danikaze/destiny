import { apiError, ApiHandler } from '@api';
import { mockStoryPages } from '@model/story/mock';
import { ChooseStoryQuery, ChooseStoryResponse } from './interface';

export const chooseStoryOption: ApiHandler<
  ChooseStoryResponse,
  ChooseStoryQuery
> = (req, res) => {
  const { pageId, storyId } = req.query;

  const page = mockStoryPages.find(
    (page) => page.pageId === pageId && page.storyId === storyId
  )!;

  if (!page) {
    return apiError(res, { error: 'Invalid data' });
  }

  return res.json({ data: page });
};
