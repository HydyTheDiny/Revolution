export type ArrayOneOrMore<T> = Array<T> & {
  0: T;
}
export type AnyObject<T = unknown> = Record<string, T>;