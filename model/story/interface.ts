import { Id, TimestampData } from '@model';
import { User } from '@model/user';

export enum StoryState {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export interface Story extends TimestampData {
  storyId: Id;
  state: StoryState;
  title: string;
  entryPageId: StoryPage['pageId'];
  authorUserId: User['userId'];
  lastPageId?: StoryPage['pageId'];
}

export interface StoryPage {
  pageId: Id;
  storyId: Story['storyId'];
  name: string;
  content: string;
  options?: StoryOption[];
}

export interface StoryOption {
  type: 'text';
  pageId: StoryPage['pageId'];
  text: string;
}
