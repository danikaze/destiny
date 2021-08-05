import { Story, StoryPage } from '@model/story/interface';

type PageMarkerStorage = Record<Story['storyId'], StoryPage['pageId']>;

type TypedStorageNamespace = 'pagemarker';
interface TypedStorage {
  lastPages: PageMarkerStorage;
}
type TypedStorageKey = keyof TypedStorage;

/**
 * Strongly typed wrapper for `Storage`
 */
export class ClientStorage {
  private readonly storage: Storage;
  private readonly namespace: TypedStorageNamespace;

  constructor(storage: Storage, namespace: TypedStorageNamespace) {
    this.storage = storage;
    this.namespace = namespace;
  }

  public set<K extends TypedStorageKey>(key: K, value: TypedStorage[K]): void {
    this.storage.setItem(this.getNsKey(key), JSON.stringify(value));
  }

  public get<K extends TypedStorageKey>(key: K): TypedStorage[K] | undefined {
    const value = this.storage.getItem(this.getNsKey(key));
    if (value === null) return;
    return JSON.parse(value);
  }

  public remove(key: TypedStorageKey): void {
    this.storage.removeItem(this.getNsKey(key));
  }

  public exists(key: TypedStorageKey): boolean {
    return this.storage.getItem(this.getNsKey(key)) !== null;
  }

  private getNsKey(key: string): string {
    return `${this.namespace}:${key}`;
  }
}
