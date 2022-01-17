export type ArrayOneOrMore<T> = Array<T> & {
  0: T;
}
