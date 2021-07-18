import { Story, StoryPage } from '@model/story/interface';

export interface ChooseStoryQuery {
  storyId: Story['storyId'];
  pageId: StoryPage['pageId'];
}

export type ChooseStoryResponse = StoryPage;
