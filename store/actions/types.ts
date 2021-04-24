// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Action<T = any> {
  type: T
}

export interface CreateAction<P, A extends Action> {
  (payload: P): A;
}

export interface CreateSimpleAction<A extends Action> {
  (): A;
}
