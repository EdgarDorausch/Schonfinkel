import { None, some, Some, none, option } from '../../src/option';
import { lift2, lift3, lift4 } from '../../src/option/utils';

describe('lift2', () => {
  const f2 = lift2((a: string, b: string) => a+b);

  it('return expected value if all inputs are instances of Some', () => {
    expect(
      f2(some('a'), some('b'))
        .equals(some('ab'))
    ).toBeTruthy();
  });

  it('return none() if some inputs are instances of None', () => {
    expect(
      f2(some('a'), none()).isNone()
    ).toBeTruthy();

    expect(
      f2(none(), some('b')).isNone()
    ).toBeTruthy();

    expect(
      f2(none(), none()).isNone()
    ).toBeTruthy();
  });
})

describe('lift3', () => {
  const f3 = lift3((a: string, b: string, c: string) => a+b+c);

  it('return expected value if all inputs are instances of Some', () => {
    expect(
      f3(some('a'), some('b'), some('c'))
        .equals(some('abc'))
    ).toBeTruthy();
  });

  it('return none() if some inputs are instances of None', () => {
    expect(
      f3(some('a'), none(), none()).isNone()
    ).toBeTruthy();

    expect(
      f3(none(), some('b'), none()).isNone()
    ).toBeTruthy();

    expect(
      f3(none(), none(), none()).isNone()
    ).toBeTruthy();
  });
})

describe('lift4', () => {
  const f4 = lift4((a: string, b: string, c: string, d: string) => a+b+c+d);

  it('return expected value if all inputs are instances of Some', () => {
    expect(
      f4(some('a'), some('b'), some('c'), some('d'))
        .equals(some('abcd'))
    ).toBeTruthy();
  });

  it('return none() if some inputs are instances of None', () => {
    expect(
      f4(some('a'), none(), none(), none()).isNone()
    ).toBeTruthy();

    expect(
      f4(none(), some('b'), none(), none()).isNone()
    ).toBeTruthy();

    expect(
      f4(none(), none(), none(), none()).isNone()
    ).toBeTruthy();
  });
})