/**
 * Returns the provided subset of fields of the given
 * Basically what TypeScript's `Pick` does with interfaces but in actual objects
 */
export function pick<T extends {}, F extends keyof T>(
  obj: T,
  fields: readonly F[]
): Pick<T, F> {
  return fields.reduce((res, field) => {
    const value = obj[field];
    if (value === undefined) return res;
    res[field] = value;
    return res;
  }, {} as Pick<T, F>);
}
