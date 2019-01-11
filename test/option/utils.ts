import { None, some, Some, none, option } from '../../src/option';
import { lift2, lift3, lift4, zip } from '../../src/option/utils';

describe('zip', () => {
  it('return {} onput input === {}', () => {
    const z = zip({});
    expect(z).toBeInstanceOf(Some);
    expect(z).toEqual(some({}));
  });

  it('return some(_) on when all properties of the input object are instances of Some', () => {
    const z = zip({
      name: some('peter'),
      age: some(32)
    });
    expect(z).toBeInstanceOf(Some);
    expect(z).toEqual(
      some({
        name: 'peter',
        age: 32
      })
    );
  });

  it('return none() on when some properties of the input object are instances of None', () => {
    const z = zip({
      name: some('peter'),
      age: none()
    });
    expect(z).toBeInstanceOf(None);
  });

  it('preserve "deep" structures', () => {
    const z = zip({
      a: some('a'),
      b: some({
        c: some('c')
      })    
    });

    expect(z).toBeInstanceOf(Some);
    z.forSome(x => {
      expect(x.a).toBe('a');
      expect(x.b.c).toBeInstanceOf(Some);
      expect(x.b).toEqual({
        c: some('c')
      });
    });
  });
});

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
});

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
});

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
});