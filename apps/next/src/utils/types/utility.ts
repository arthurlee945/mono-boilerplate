export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; //eslint-disable-line

type UnionToParam<U> = U extends unknown ? (_k: U) => void : never;
type UnionToSect<U> = UnionToParam<U> extends (_k: infer I) => void ? I : never;
type ExtractParam<F> = F extends (_a: infer A) => void ? A : never;

type ExtractOne<Union> = ExtractParam<UnionToSect<UnionToParam<Union>>>;
type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;

type ToTupleRecursion<Union, Rslt extends unknown[]> = SpliceOne<Union> extends never
  ? [ExtractOne<Union>, ...Rslt]
  : ToTupleRecursion<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

export type ToTuple<Union> = ToTupleRecursion<Union, []>;

export type NumericRange<
  END extends number,
  START extends number = 0,
  ARR extends unknown[] = [],
  ACC extends number = never,
> = ARR["length"] extends END
  ? ACC | START | END
  : NumericRange<END, START, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR["length"]>;

//eslint-disable-next-line
export type ArrayWithLength<Len extends number, T extends unknown, Occ extends T[] = []> = Occ["length"] extends Len
  ? Occ
  : ArrayWithLength<Len, T, [T, ...Occ]>;
