import {
  LOCAL_SALT_SIZE,
  PASSWORD_MAX_CHARS,
  PASSWORD_MIN_CHARS,
  USERNAME_MAX_CHARS,
} from '@utils/constants/user';
import { encryptPassword, generateSalt } from '@utils/crypt';
import { db } from '@utils/db';
import { createUser, getUserAuthData, User, UserAuthData, UserType } from '..';

export interface LocalUser {
  userId: User['userId'];
  username: string;
  salt: string;
  password: string;
}

type CreateLocalUserData = Pick<User, 'role'> &
  Pick<LocalUser, 'username' | 'password'>;

export async function authLocalUser(
  username: string,
  password: string
): Promise<UserAuthData | undefined> {
  return new Promise(async (resolve) => {
    // 1. Find the user in the database
    const user = (await db.usersLocal.doc(username.toLowerCase()).get()).data();
    if (!user) return resolve(undefined);

    // 2. Encode the provided password with its salt
    const pwd = await encryptPassword(password, user.salt);
    // 3. Check if the encoded(provided password)
    // is the same as the provided password
    if (pwd !== user.password) return resolve(undefined);

    // 4. if ok, return the UserAuthData
    resolve(await getUserAuthData(user.userId));
  });
}

export async function createLocalUser({
  role,
  username,
  password,
}: CreateLocalUserData): Promise<UserAuthData> {
  const existingUser = (
    await db.usersLocal.doc(username.toLowerCase()).get()
  ).data();
  if (existingUser) {
    throw new Error('Username already exists');
  }
  if (username.length > USERNAME_MAX_CHARS) {
    throw new Error('Username is too long');
  }
  if (password.length < PASSWORD_MIN_CHARS) {
    throw new Error('Password is too short');
  }
  if (password.length > PASSWORD_MAX_CHARS) {
    throw new Error('Password is too long');
  }

  const user = await createUser({
    username,
    role,
    type: UserType.LOCAL_USER,
  });

  const salt = generateSalt(LOCAL_SALT_SIZE);
  const pwd = await encryptPassword(password, salt);

  await db.usersLocal.doc(username.toLowerCase()).set({
    salt,
    username,
    userId: user.userId,
    password: pwd,
  });

  return user;
}
