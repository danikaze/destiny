import { StoryPageProps } from '@components/user-story';
import { User } from '@model/user';
import { Story, StoryPage, StoryState } from './interface';
import { mockStories, mockStoryPages } from './mock';

export async function createStory(story: Story): Promise<void> {
  mockStories.push(story);
}

export async function createStoryPage(storyPage: StoryPage): Promise<void> {
  mockStoryPages.push(storyPage);
}

export async function readPublishedStories(): Promise<Story[]> {
  return mockStories.filter((story) => story.state === StoryState.PUBLISHED);
}

export async function readStoryToRead(
  storyId: Story['storyId'],
  firstPageId?: StoryPage['pageId']
): Promise<{ story: Story; page: StoryPage } | undefined> {
  const story = mockStories.find((story) => story.storyId === storyId)!;
  const page =
    story &&
    mockStoryPages.find(
      (page) => page.pageId === (firstPageId || story.entryPageId)
    )!;

  if (!story || !page) return;
  return { story, page };
}

export async function readUserStories(
  userId: User['userId']
): Promise<Story[]> {
  return mockStories.filter((story) => story.authorUserId === userId);
}

export async function readUserStory(
  userId: User['userId'],
  storyId: Story['storyId']
): Promise<{ story: Story; pages: StoryPage[] } | undefined> {
  const story = mockStories.filter(
    (story) => story.authorUserId === userId && story.storyId === storyId
  )[0];

  if (!story) return;

  const pages = mockStoryPages.filter(
    (page) => page.storyId === story!.storyId
  );

  return { story, pages };
}

export async function readStoryPage(
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId']
): Promise<StoryPage | undefined> {
  return mockStoryPages.find(
    (page) => page.pageId === pageId && page.storyId === storyId
  );
}

export async function updateStory(
  userId: User['userId'],
  storyId: Story['storyId'],
  data: Partial<
    Omit<
      Story,
      'storyId' | 'createdAt' | 'updatedAt' | 'authorUserId' | 'lastPageId'
    >
  >
): Promise<void> {
  const story = mockStories.find(
    (story) => story.authorUserId === userId && story.storyId === storyId
  );

  if (!story) {
    throw new Error('Invalid storyId');
  }

  let changed = false;
  if (data.title !== undefined) {
    story.title = data.title;
    changed = true;
  }
  if (data.state !== undefined) {
    story.state = data.state;
    changed = true;
  }
  if (data.entryPageId !== undefined) {
    story.entryPageId = data.entryPageId;
    changed = true;
  }

  if (changed) {
    story.updatedAt = Date.now();
  }
}

export async function updateStoryPage(
  userId: User['userId'],
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId'],
  data: Partial<Omit<StoryPage, 'storyId' | 'pageId'>>
): Promise<void> {
  const story = mockStories.find(
    (story) => story.authorUserId === userId && story.storyId === storyId
  );

  if (!story) {
    throw new Error('Invalid storyId');
  }

  const page = mockStoryPages.find(
    (page) => page.storyId === storyId && page.pageId === pageId
  );

  if (!page) {
    throw new Error('Invalid pageId');
  }

  if (data.name !== undefined) {
    page.name = data.name;
  }
  if (data.content !== undefined) {
    page.content = data.content;
  }
  if (data.options !== undefined) {
    page.options = data.options;
  }
}

export async function deleteUserStory(
  userId: User['userId'],
  storyId: Story['storyId']
): Promise<void> {
  const storyIndex = mockStories.findIndex(
    (story) => story.authorUserId === userId && story.storyId === storyId
  );

  if (storyIndex !== -1) {
    mockStories.splice(storyIndex, 1);
  }
}

export async function deleteUserStoryPage(
  userId: User['userId'],
  storyId: StoryPage['storyId'],
  pageId: StoryPageProps['pageId']
): Promise<void> {
  const story = mockStories.find(
    (story) => story.authorUserId === userId && story.storyId === storyId
  );

  if (!story) {
    throw new Error('Invalid storyId');
  }

  if (story.entryPageId === pageId) {
    throw new Error(`Can't delete current entry page`);
  }

  const pageIndex = mockStoryPages.findIndex(
    (page) => page.storyId === storyId && page.pageId === pageId
  );

  if (pageIndex !== -1) {
    mockStoryPages.splice(pageIndex, 1);
  }
}
