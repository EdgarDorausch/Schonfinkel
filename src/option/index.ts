import { Fun1, Lazy } from '../types';

export * from './utils';

interface OptionInterface<A> {
    /**
     * @returns `none()` if `none()`; `some(f(a))` if `some(a)`
     */
    map<B>(f: Fun1<A, B>): Option<B>;
    /**
     * "Monadic bind operation".
     * Equivalent to Haskell `>>=` operator
     */
    flatMap<B>(f: Fun1<A, Option<B>>): Option<B>;
    /**
     * @returns `null` if `none()`; `a` if `some(a)`
     */
    getOrNull(): A|null;
    /**
     * @returns `undefined` if `none()`; `a` if `some(a)`
     */
    getOrUndefined(): A|undefined;
    /**
     * @returns `a` if `none()`; `b` if `some(b)`
     */
    getOrElse(a: A): A;
    /**
     * @returns `f()` if `none()`; `b` if `some(b)`
     */
    getOrLazyElse(f: Lazy<A>): A;
    /**
     * Picks a property of the contained type.
     * If the Option is `none()` the result will also be `none()`
     * Otherwise `some(a[key])`
     * @param key Name of the property which is picket
     */
    pick<K extends keyof A>(key: K): Option<A[K]>;
    /**
     * @returns `true` if `none()` else `false`
     */
    isNone(): boolean;
    /**
     * `f(a)` is only executed if `Option` is a `some(a)`
     */
    forSome(f: Fun1<A>): void;
    /**
     * Compares two Options regarding to equivalence.
     * 
     * (Returns `true` in case that:)
     * * `none().equals( none() )`
     * * `some(a).equals( some(b) ) `where `a === b`
     * 
     * 
     */
    equals(opt: Option<A>): boolean;
}

export class Some<A> implements OptionInterface<A> {

    constructor(private value: A) {}

    map<B>(f: Fun1<A, B>): Option<B> {
        return some(f(this.value));
    }
    flatMap<B>(f: Fun1<A, Option<B>>): Option<B> {
        return f(this.value);
    }
    getOrNull() {
        return this.value;
    }
    getOrUndefined() {
        return this.value;
    }
    getOrElse(a: A) {
        return this.value;
    }
    getOrLazyElse(f: Lazy<A>) {
        return this.value;
    }
    pick<K extends keyof A>(key: K): Option<A[K]> {
        return some(this.value[key]);
    }
    isNone() {
        return false;
    }
    forSome(f: Fun1<A>) {
        f(this.value);
    }
    equals(opt: Option<A>) {
        return opt.map( x => x === this.value).getOrElse(false);
    }
    toString() {
        return `some(${this.value})`;
    }
}

export class None<A> implements OptionInterface<A> {

    map<B>(f: Fun1<A, B>): Option<B> {
        return none();
    }
    flatMap<B>(f: Fun1<A, Option<B>>): Option<B> {
        return none();
    }
    getOrNull() {
        return null;
    }
    getOrUndefined() {
        return undefined;
    }
    getOrElse(a: A) {
        return a;
    }
    getOrLazyElse(f: Lazy<A>) {
        return f();
    }
    pick<K extends keyof A>(key: K): Option<A[K]> {
        return none();
    }
    isNone() {
        return true;
    }
    forSome(f: Fun1<A>) {
        // Do Nothing!
    }
    equals(opt: Option<A>) {
        return opt.isNone();
    }
    toString() {
        return 'none()';
    }
}

/**
 * Constructs an Option. If the given parameter `a` is `null` or `undefined`
 * this function will return a `none`. Otherwise a `some(a)` is returned.
 */
export function option<A>(a: A|undefined|null): Option<A> {
    if (a === null || a === undefined) {
        return none();
    } else {
        return some(a);
    }
}

export function some<A>(a: A) {
    return new Some<A>(a);
}

// Use singleton to improve performance
const noneSingleton = new None<any>();
export function none<A>() {
    return noneSingleton as None<A>;
}

export type Option<A> = None<A> | Some<A>;
