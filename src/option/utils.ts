import { Option } from './index'
import { Fun2, Fun3, Fun4 } from '../types';

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