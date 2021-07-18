import { Id, TimestampData } from '@model';
import { User } from '@model/user';

export interface Story extends TimestampData {
  storyId: Id;
  title: string;
  entryPageId: StoryPage['pageId'];
  authorUserId: User['userId'];
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
