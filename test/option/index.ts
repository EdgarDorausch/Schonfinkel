import { None, some, Some, none, option } from '../../src/option';

describe('None', () => {
    describe('map', () => {
        it('return an instance of None after mapping', () => {
            const myNone = new None<number>();
            const mappedNone = myNone.map(x => x + 123);
            expect(mappedNone).toBeInstanceOf(None);
        });
    });
    
    describe('flatMap', () => {
        it('return an instance of None after flatMap with a Some instance', () => {
            const myNone = new None<number>();
            const mappedNone = myNone.flatMap(x => new Some(42));
            expect(mappedNone).toBeInstanceOf(None);
        });
        it('return an instance of None after flatMap with a None instance', () => {
            const myNone = new None<number>();
            const mappedNone = myNone.flatMap(x => new None());
            expect(mappedNone).toBeInstanceOf(None);
        });
    });

    describe('getOrNull', () => {
        it('return null', () => {
            const myNone = new None<number>();
            expect(myNone.getOrNull()).toBeNull();
        });
    });

    describe('getOrUndefined', () => {
        it('return undefined', () => {
            const myNone = new None<number>();
            expect(myNone.getOrUndefined()).toBeUndefined();
        });
    });

    describe('getOrElse', () => {
        it('return else', () => {
            const myNone = new None<number>();
            const myElse = myNone.getOrElse(78);
            expect(myElse).toBe(78);
        });
    });

    describe('getOrLazyElse', () => {
        it('return lazy else', () => {
            const myNone = new None<number>();
            const myElse = myNone.getOrLazyElse( () => 78);
            expect(myElse).toBe(78);
        });

        it('call the function (lazy)', () => {
            const mockCallback = jest.fn(x => 42 + x);

            const myNone = new None<number>();
            const myElse = myNone.getOrLazyElse( mockCallback);
            expect(mockCallback.mock.calls.length).toBe(1);
        });
    });

    describe('pick', () => {
        it('return instance of None', () => {
            const myNone = new None<{a: number, b: string}>();
            expect(myNone.pick('a')).toBeInstanceOf(None);
        });
    });

    describe('isNone', () => {
        it('return true', () => {
            const myNone = new None<number>();
            expect(myNone.isNone()).toBeTruthy();
        });
    });

    describe('forSome', () => {
        it('callback not called', () => {
            const mockCallback = jest.fn(x => 42 + x);

            const myNone = new None<number>();
            myNone.forSome(mockCallback);
            expect(mockCallback.mock.calls.length).toBe(0);
        });
    });

    describe('equals', () => {
        it('return true if compared with instance of None', () => {
            const myNone = new None<number>();
            const anotherNone = new None<number>();
            
            expect(myNone.equals(anotherNone)).toBeTruthy();
        });
        it('return false if compared with instance of Some', () => {
            const myNone = new None<number>();
            const mySome = new Some<number>(67);
            
            expect(myNone.equals(mySome)).toBeFalsy();
        });
    });

    describe('toString', () => {
        it('return "none()"', () => {
            const myNone = new None<number>();
            expect(myNone.toString()).toBe('none()');
        });
    });

});

describe('Some', () => {
    describe('map', () => {
        it('return instance of Some after mapping', () => {
            const mySome = new Some<number>(32);
            const mappedNone = mySome.map(x => x * 2);
            expect(mappedNone).toBeInstanceOf(Some);
        });
        it('return right result after mapping', () => {
            const mySome = new Some<number>(32);
            const mappedNone = mySome.map(x => x * 2);
            expect(mappedNone.equals(new Some(64))).toBeTruthy();
        });
    });
    
    describe('flatMap', () => {
        it('return an right Some instance after flatMap with a Some instance', () => {
            const mySome = new Some<number>(32);
            const mappedNone = mySome.flatMap(x => new Some(x * 2));
            expect(mappedNone.equals(new Some(64))).toBeTruthy();
        });
        it('return an instance of None after flatMap with a None instance', () => {
            const mySome = new Some<number>(32);
            const mappedNone = mySome.flatMap(x => new None());
            expect(mappedNone).toBeInstanceOf(None);
        });
    });

    describe('getOrNull', () => {
        it('return value', () => {
            const mySome = new Some<number>(32);
            expect(mySome.getOrNull()).toBe(32);
        });
    });

    describe('getOrUndefined', () => {
        it('return value', () => {
            const mySome = new Some<number>(32);
            expect(mySome.getOrUndefined()).toBe(32);
        });
    });

    describe('getOrElse', () => {
        it('return value', () => {
            const mySome = new Some<number>(32);
            const myElse = mySome.getOrElse(178);
            expect(myElse).toBe(32);
        });
    });

    describe('getOrLazyElse', () => {
        it('return value', () => {
            const mySome = new Some<number>(32);
            const myElse = mySome.getOrLazyElse( () => 178);
            expect(myElse).toBe(32);
        });

        it('dont call the function (lazy)', () => {
            const mockCallback = jest.fn(x => 42 + x);

            const mySome = new Some<number>(32);
            const myElse = mySome.getOrLazyElse( mockCallback);
            expect(mockCallback.mock.calls.length).toBe(0);
        });
    });

    describe('pick', () => {
        it('return the right instance of Some', () => {
            const mySome = new Some({
                a: 32,
                b: 'foobar'
            });
            expect(mySome.pick('a').equals(some(32))).toBeTruthy();
        });
    });

    describe('isNone', () => {
        it('return false', () => {
            const mySome = new Some<number>(32);
            expect(mySome.isNone()).toBeFalsy();
        });
    });

    describe('forSome', () => {
        it('callback has to be called', () => {
            const mockCallback = jest.fn(x => 42 + x);

            const mySome = new Some<number>(32);
            mySome.forSome(mockCallback);
            expect(mockCallback.mock.calls.length).toBe(1);
        });
    });

    describe('equals', () => {
        it('return false if compared with instance of None', () => {
            const mySome = new Some<number>(32);
            const myNone = new None<number>();
            
            expect(mySome.equals(myNone)).toBeFalsy();
        });
        it('return false if compared with instance of Some but the values are different', () => {
            const mySome = new Some<number>(32);
            const anotherSome = new Some<number>(167);
            
            expect(mySome.equals(anotherSome)).toBeFalsy();
        });
        it('return true if compared with instance of Some and the values are equal', () => {
            const mySome = new Some<number>(32);
            const anotherSome = new Some<number>(32);
            
            expect(mySome.equals(mySome)).toBeTruthy();
        });
    });

    describe('toString', () => {
        it('return "some(...)"', () => {
            const mySome = new Some<number>(32);
            expect(mySome.toString()).toBe('some(32)');
        });
    });

});

describe('none()', () => {
    it('return instance of None', () => {
        expect(none()).toBeInstanceOf(None);
    });
});

describe('some()', () => {
    it('return right instance of Some', () => {
        const mySome = some(32);
        expect(mySome.equals(new Some(32))).toBeTruthy();
    });
});

describe('option()', () => {
    it('return right instance of Some if "real" value', () => {
        const myOption = option(32);
        expect(myOption.equals(new Some(32))).toBeTruthy();
    });

    it('return instance of None if argument is undefined', () => {
        const myOption = option(undefined);
        expect(myOption).toBeInstanceOf(None);
    });

    it('return instance of None if argument is null', () => {
        const myOption = option(null);
        expect(myOption).toBeInstanceOf(None);
    });
});