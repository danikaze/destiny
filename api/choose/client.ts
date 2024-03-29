import { Story, StoryPage } from '@model/story/interface';
import { callApi } from '@utils/call-api';
import { ChooseStoryQuery, ChooseStoryResponse } from './interface';

export async function callChooseStoryOption(
  storyId: Story['storyId'],
  pageId: StoryPage['pageId']
): Promise<ChooseStoryResponse> {
  return await callApi<ChooseStoryResponse, ChooseStoryQuery>('choose', 'GET', {
    params: {
      storyId,
      pageId,
    },
  });
}
