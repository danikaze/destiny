import 'jest';
import { withoutUndefined } from '../without-undefined';

describe('withoutUndefined', () => {
  it('should pick only non-undefined data', () => {
    const fn = () => {};
    const obj = {
      a: 1,
      b: '2',
      c: undefined,
      d: fn,
      e: {},
      f: [],
      g: null,
      h: false,
      i: 0,
    };

    // correct result
    expect(withoutUndefined(obj)).toEqual({
      a: 1,
      b: '2',
      d: fn,
      e: {},
      f: [],
      g: null,
      h: false,
      i: 0,
    });

    // original object should not be modified
    expect(obj).toEqual({
      a: 1,
      b: '2',
      c: undefined,
      d: fn,
      e: {},
      f: [],
      g: null,
      h: false,
      i: 0,
    });
  });
});
