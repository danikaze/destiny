import { StoryPage } from '@model/story/interface';
import { callApi } from '@utils/call-api';
import {
  DeleteStoryPageBody,
  DeleteStoryPageQuery,
  DeleteStoryPageResponse,
  EditStoryPageBody,
  EditStoryPageQuery,
  EditStoryPageResponse,
} from './interface';

export async function callEditStoryPageApi(
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId'],
  data: EditStoryPageBody
): Promise<EditStoryPageResponse> {
  return await callApi<
    EditStoryPageBody,
    EditStoryPageQuery,
    EditStoryPageResponse
  >(`user-story/${storyId}/page/${pageId}`, 'PUT', { data });
}

export async function callDeleteStoryPageApi(
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId']
): Promise<DeleteStoryPageResponse> {
  return await callApi<
    DeleteStoryPageBody,
    DeleteStoryPageQuery,
    DeleteStoryPageResponse
  >(`user-story/${storyId}/page/${pageId}`, 'DELETE');
}
