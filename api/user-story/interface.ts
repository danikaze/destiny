import { Story } from '@model/story/interface';

export type EditStoryResponse = {};
export type EditStoryQuery = Pick<Story, 'storyId'>;
export type EditStoryBody = Partial<
  Pick<Story, 'title' | 'state' | 'entryPageId'>
>;

export type DeleteStoryResponse = {};
export type DeleteStoryQuery = Pick<Story, 'storyId'>;
export type DeleteStoryBody = {};
