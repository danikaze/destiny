import { Story } from '@model/story/interface';
import { callApi } from '@utils/call-api';
import {
  DeleteStoryBody,
  DeleteStoryQuery,
  DeleteStoryResponse,
  EditStoryBody,
  EditStoryQuery,
  EditStoryResponse,
} from './interface';

export async function callEditStoryApi(
  storyId: Story['storyId'],
  data: EditStoryBody
): Promise<EditStoryResponse> {
  return await callApi<EditStoryBody, EditStoryQuery, EditStoryResponse>(
    `user-story/${storyId}`,
    'PUT',
    { data }
  );
}

export async function callDeleteStoryApi(
  storyId: Story['storyId']
): Promise<DeleteStoryResponse> {
  return await callApi<DeleteStoryBody, DeleteStoryQuery, DeleteStoryResponse>(
    `user-story/${storyId}`,
    'DELETE'
  );
}
