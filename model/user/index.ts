import { generateUniqueId } from '@model';
import { db } from '@utils/db';

export type UserRole = 'admin' | 'user';

export type UserAuthData = Pick<User, 'userId' | 'username' | 'role'>;

export const enum UserType {
  SYSTEM_USER = 'sy', // system (no login)
  LOCAL_USER = 'lc', // local (user + pass)
  TWITTER_USER = 'tw', // twitter
}

export interface User {
  userId: string;
  username: string;
  role: UserRole;
  type: UserType;
}

type CreateUserData = Pick<User, 'username' | 'role' | 'type'>;

export async function getUserAuthData(
  userId: User['userId'] | User
): Promise<UserAuthData | undefined> {
  const user =
    typeof userId === 'string'
      ? (await db.users.doc(userId).get()).data()
      : userId;
  if (!user) return;

  return {
    userId: user.userId,
    username: user.username,
    role: user.role,
  };
}

export async function createUser(user: CreateUserData): Promise<UserAuthData> {
  // tslint:disable-next-line:no-unnecessary-type-annotation
  const userId: User['userId'] = generateUniqueId();

  const newUser: User = {
    ...user,
    userId,
  };

  await db.users.doc(userId).set(newUser);

  return {
    userId,
    username: newUser.username,
    role: newUser.role,
  };
}
