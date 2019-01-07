// Functions
export type Fun1<A, B = void> = (a: A) => B;
export type Fun2<A, B, C = void> = (a: A, b: B) => C;

// Predicates
export type Pred1<A> = Fun1<A, boolean>;
export type Pred2<A, B> = Fun2<A, B, boolean>;

export type Lazy<A> = () => A;