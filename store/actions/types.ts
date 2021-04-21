export interface Action<T = any> {
  type: T
}

export interface CreateAction<P, A extends Action> {
  (payload: P): A;
}

export interface CreateSimpleAction<A extends Action> {
  (): A;
}
