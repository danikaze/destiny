import { customAlphabet } from 'nanoid';

export type Id = string;

export type TimestampUtc = number;

export interface TimestampData {
  /** Timestamp of the creation time (ms) */
  createdAt: TimestampUtc;
  /** Timestamp of the last modification time (ms) */
  updatedAt: TimestampUtc;
}

const nanoid = (() => {
  const ID_LENGTH = 10;
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    ID_LENGTH
  );
})();

/**
 * Generate a unique ID for the database
 */
export function generateUniqueId(): string {
  return nanoid();
}
