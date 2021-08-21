import firebase from 'firebase/app';
import 'firebase/firestore';

import { User } from '@model/user';
import { TwitterUser } from '@model/user/strategies/twitter';
import { LocalUser } from '@model/user/strategies/local';
import { Story, StoryPage } from '@model/story/interface';

const app =
  firebase.apps.find((app) => app.name === FIREBASE_APP_NAME) ||
  firebase.initializeApp(FIREBASE_APP_CONFIG, FIREBASE_APP_NAME);

const converter = <T>(): firebase.firestore.FirestoreDataConverter<T> => ({
  toFirestore: (data) => data,
  fromFirestore: (snap) => snap.data() as T,
});

const getCollection = <T>(collectionPath: string) =>
  app.firestore().collection(collectionPath).withConverter(converter<T>());

export const db = {
  users: getCollection<User>('users'),
  usersTwitter: getCollection<TwitterUser>('usersTwitter'),
  usersLocal: getCollection<LocalUser>('usersLocal'),
  stories: getCollection<Story>('stories'),
  storyPages: (storyId: Story['storyId']) =>
    getCollection<StoryPage>(`stories/${storyId}/pages`),
};
