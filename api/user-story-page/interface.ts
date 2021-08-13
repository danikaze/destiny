import { StoryPage } from '@model/story/interface';

export type EditStoryPageResponse = {};
export type EditStoryPageQuery = Pick<StoryPage, 'storyId' | 'pageId'>;
export type EditStoryPageBody = Partial<
  Pick<StoryPage, 'name' | 'content' | 'options'>
>;

export type DeleteStoryPageResponse = {};
export type DeleteStoryPageQuery = Pick<StoryPage, 'storyId' | 'pageId'>;
export type DeleteStoryPageBody = {};
