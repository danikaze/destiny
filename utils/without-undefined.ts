/**
 * Return a shallow copy of the given object without undefined fields
 */
export function withoutUndefined<T extends {}>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((res, key) => {
    const value = (obj as Record<string, unknown>)[key];
    if (value !== undefined) (res as Record<string, unknown>)[key] = value;
    return res;
  }, {});
}
