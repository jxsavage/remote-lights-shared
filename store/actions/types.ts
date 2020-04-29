import { Action } from 'redux';

export interface CreateAction<P, A extends Action> {
  (payload: P): A;
}