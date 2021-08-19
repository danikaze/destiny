import 'jest';
import { pick } from '../pick';

describe('pick', () => {
  let object: {
    num: number;
    str: string;
    arr: string[];
    obj: Record<string, number>;
    und: undefined;
    nu: null;
  };

  beforeEach(() => {
    object = {
      num: 123,
      str: 'foobar',
      arr: ['a', 'b', 'c'],
      obj: { a: 1, b: 2 },
      und: undefined,
      nu: null,
    };
  });

  it('should pick only the given parameters', () => {
    expect(pick(object, ['num', 'str', 'nu'])).toEqual({
      num: object.num,
      str: object.str,
      nu: object.nu,
    });
    expect(pick(object, ['arr', 'obj'])).toEqual({
      arr: object.arr,
      obj: object.obj,
    });
  });

  it('should not pick undefined values', () => {
    expect(pick(object, ['num', 'str', 'und'])).toEqual({
      num: object.num,
      str: object.str,
    });
  });
});
