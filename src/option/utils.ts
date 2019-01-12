import { Option, Some, None, none, some } from './index'
import { Fun1, Fun2, Fun3, Fun4 } from '../types';

type OptionObject<T> = {[k in keyof T]: Option<T[k]>}

export function zip<T extends {}>(obj: OptionObject<T>): Option<T> {
  let newObj = {} as any;
  
  for (let prop in obj) {
    if (prop in obj) {
      if (obj[prop] instanceof Some)
      newObj[prop] = (obj[prop] as any).getOrNull();
      else if (obj[prop] instanceof None)
        return none() as any;
      else 
        newObj[prop] = obj[prop];
    }
  }

  return some(newObj);
}

export function lift1<A,B>(f: Fun1<A,B>): Fun1<Option<A>,Option<B>> {
  return (optA) => optA.map(a => f(a))
}

export function lift2<A,B,C>(f: Fun2<A,B,C>): Fun2<Option<A>,Option<B>,Option<C>> {
  return (optA, optB) => optA.flatMap(
    a => optB.map(
    b => f(a,b)))
}

export function lift3<A,B,C,D>(f: Fun3<A,B,C,D>): Fun3<Option<A>,Option<B>,Option<C>,Option<D>> {
  return (optA, optB, optC) => optA.flatMap(
    a => optB.flatMap(
    b => optC.map(
    c => f(a,b,c))))
}

export function lift4<A,B,C,D,E>(f: Fun4<A,B,C,D,E>): Fun4<Option<A>,Option<B>,Option<C>,Option<D>,Option<E>> {
  return (optA, optB, optC, optD) => optA.flatMap(
    a => optB.flatMap(
    b => optC.flatMap(
    c => optD.map(
    d => f(a,b,c,d)))))
}

export function apply<A,B>(optF: Option<Fun1<A,B>>): (optA: Option<A>|A) => Option<B> {
  return (optA) => {
    if (optA instanceof Some || optA instanceof None) {
      return optF.flatMap(
        f => optA.map(
        a => f(a)));
    } else {
      return optF.map(f => f(optA));
    }
  }
}