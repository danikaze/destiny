import { StoryPageProps } from '@components/user-story';
import { User } from '@model/user';
import { db } from '@utils/db';
import { withoutUndefined } from '@utils/without-undefined';
import { Story, StoryPage, StoryState } from './interface';

export async function createStory(story: Story): Promise<void> {
  await db.stories.doc(story.storyId).set(story);
}

export async function createStoryPage(storyPage: StoryPage): Promise<void> {
  await db.stories
    .doc(storyPage.storyId)
    .collection('pages')
    .doc(storyPage.pageId)
    .set(storyPage);
}

export async function readPublishedStories(): Promise<Story[]> {
  const results = await db.stories
    .where('state', '==', StoryState.PUBLISHED)
    .get();
  return results.docs.map((doc) => doc.data());
}

export async function readStoryToRead(
  storyId: Story['storyId'],
  firstPageId?: StoryPage['pageId']
): Promise<{ story: Story; page: StoryPage } | undefined> {
  const story = (await db.stories.doc(storyId).get()).data();
  const page =
    story &&
    (
      await db
        .storyPages(storyId)
        .doc(firstPageId || story.entryPageId)
        .get()
    ).data();

  if (!story || !page) return;
  return { story, page };
}

export async function readUserStories(
  userId: User['userId']
): Promise<Story[]> {
  const results = await db.stories.where('authorUserId', '==', userId).get();
  return results.docs.map((doc) => doc.data());
}

export async function readUserStory(
  userId: User['userId'],
  storyId: Story['storyId']
): Promise<{ story: Story; pages: StoryPage[] } | undefined> {
  const story = (await db.stories.doc(storyId).get()).data();

  if (!story || story.authorUserId !== userId) return;

  const pages = (await db.storyPages(storyId).get()).docs.map((doc) =>
    doc.data()
  );

  return { story, pages };
}

export async function readStoryPage(
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId']
): Promise<StoryPage | undefined> {
  return (await db.storyPages(storyId).doc(pageId).get()).data();
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
  const storyDoc = db.stories.doc(storyId);
  const story = (await storyDoc.get()).data();

  if (!story || story.authorUserId !== userId) {
    throw new Error('Invalid storyId');
  }

  const changes = withoutUndefined<Partial<Story>>(data);
  changes.updatedAt = Date.now();
  await storyDoc.update(changes);
}

export async function updateStoryPage(
  userId: User['userId'],
  storyId: StoryPage['storyId'],
  pageId: StoryPage['pageId'],
  data: Partial<Omit<StoryPage, 'storyId' | 'pageId'>>
): Promise<void> {
  const story = (await db.stories.doc(storyId).get()).data();
  if (!story || story.authorUserId !== userId) {
    throw new Error('Invalid storyId');
  }

  const pageDoc = db.storyPages(storyId).doc(pageId);
  await pageDoc.update(withoutUndefined(data));
}

export async function deleteUserStory(
  userId: User['userId'],
  storyId: Story['storyId']
): Promise<void> {
  const storyDoc = db.stories.doc(storyId);
  const story = (await storyDoc.get()).data();
  if (!story || story.authorUserId !== userId) return;

  await storyDoc.delete();
}

export async function deleteUserStoryPage(
  userId: User['userId'],
  storyId: StoryPage['storyId'],
  pageId: StoryPageProps['pageId']
): Promise<void> {
  const story = (await db.stories.doc(storyId).get()).data();
  if (!story || story.authorUserId !== userId) {
    throw new Error('Invalid storyId');
  }
  if (story.entryPageId === pageId) {
    throw new Error(`Can't delete current entry page`);
  }

  const pageDoc = db.storyPages(storyId).doc(pageId);
  await pageDoc.delete();
}
