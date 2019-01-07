# Schönfinkel [![Coverage Status](https://coveralls.io/repos/github/EdgarDorausch/Schonfinkel/badge.svg)](https://coveralls.io/github/EdgarDorausch/Schonfinkel) [![Build Status](https://travis-ci.org/EdgarDorausch/Schonfinkel.svg?branch=develop)](https://travis-ci.org/EdgarDorausch/Schonfinkel)

Lightweight typescript utilities for functional programming

## Installation

Simply install this package via [npm](https://www.npmjs.com/package/schonfinkel)
```shell
npm i schonfinkel
```
*(This module automatically provide typescript type definitions)*

## Usage

At the moment the package just contains `Option` monads.
An Option monad consists of two distinct values it embraces: `none()` and `some(a)` (where a can be any arbitrary other value).
You can think of `none()` as a similar thing to `null`.
 Option monads provide an elegant way to handle nullable types/data and reduce infrastructure code enormously.

Here is a simple example of a function that returns an Option:

```typescript
import { some, none } from 'schonfinkel';

function safeGetChar(str: string, index: number): Option<string> {
  if (index <= str.length)
    return none();
  else
    return some(str[index]);
}

safeGetChar('abc', 0); // some('a')
safeGetChar('abc', 5); // none()
```

Now you can simply use the `map` method to modify data (if present) or pass it (if not present); You can use this pretty much similar to the `map` method of the Javascript `Array`:
```typescript
function safeGetCharUpperCase(str: string, index: number): Option<string> {
  return safeGetChar(str,index)
    .map(x => x.toUpperCase())
}

safeGetCharUpperCase('abc', 0); // some('A')
safeGetCharUpperCase('abc', 5); // none()
```

To provide default values for the Option monad in case of a `none()` value you can simply use the `getOrElse` method:

```typescript
safeGetCharUpperCase('abc', 0)
  .getOrElse(''); // 'A'
safeGetCharUpperCase('abc', 5)
  .getOrElse(''); // ''
```

| Method             | none()         | some(a)      | Description |
|--------------------|----------------|--------------|-------------|
| `map(f)`           | `none()`       | `some(f(a))` | `f` is of type `(a: A) => B`
| `flatMap(f)`       | `none()`       | `f(a)`       | `f` is of type `(a: A) => Option<B>` (flatmap is the monadic bind operator)|
| `getOrNull`        | `null`         | `a`          |
| `getOrUndefined`   | `undefined`    | `a`          | |
| `getOrElse(b)`     | `b`            | `a`          | |
| `getOrLazyElse(f)` | `f()`          | `a`          | computes the "else" value in a lazy fashon|
| `pick(k)`          | `none()`       | `some(a[k])` | safely get a property-value (of prop. `k`)|
| `isNone()`         | `true`         | `false`      | |
| `forSome(f)`       |  -             |  -           | `f` is of type `(a: A) => void`. `f` is only executed for an instance of `Some`
| `equals(opt)`      |`true` iff `opt` is of type `none()` | `true` iff `opt` is of type `some(b)` and `a===b`  |