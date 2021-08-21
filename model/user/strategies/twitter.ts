import { Profile } from 'passport-twitter';
import { generateUniqueId } from '@model';
import { db } from '@utils/db';
import { createUser, getUserAuthData, User, UserAuthData, UserType } from '..';

export interface TwitterUser {
  userId: User['userId'];
  profileId: Profile['id'];
}

export async function authTwitterUser(profile: Profile): Promise<UserAuthData> {
  return getOrCreateUserFromTwitter(profile);
}

export async function getOrCreateUserFromTwitter(
  profile: Profile
): Promise<UserAuthData> {
  const userId = await getUserIdFromTwitter(profile);

  if (!userId) {
    return createUserFromTwitter(profile);
  }

  return (await getUserAuthData(userId))!;
}

/**
 * Get the `userId` from its twitter profile or `undefined` if it doesn't
 * exist
 */
export async function getUserIdFromTwitter(
  profile: Profile
): Promise<User['userId'] | undefined> {
  const user = (await db.usersTwitter.doc(profile.id).get()).data();

  return user ? user.userId : undefined;
}

export async function createUserFromTwitter(
  profile: Profile
): Promise<UserAuthData> {
  // if there's already a user for this twitter profile, just return it
  const existingUser = await getUserIdFromTwitter(profile);
  if (existingUser) return (await getUserAuthData(existingUser))!;

  // if not, create a new one
  // tslint:disable-next-line:no-unnecessary-type-annotation
  const userId: User['userId'] = generateUniqueId();

  const newUser = await createUser({
    username: profile.username!,
    role: 'user',
    type: UserType.TWITTER_USER,
  });

  await db.usersTwitter.doc(profile.id).set({
    userId,
    profileId: profile.id,
  });

  return newUser;
}
