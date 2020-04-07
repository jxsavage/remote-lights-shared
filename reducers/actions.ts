/* eslint-disable import/no-cycle */
import { MicroActions, MicroPayloads } from './microController';
import { StateActions, StatePayloads } from './remoteLights';

type AllPayloads =
  MicroPayloads |
  StatePayloads;
type AllActions =
  MicroActions |
  StateActions;

export interface ActionCreator
<Payload extends AllPayloads,
  Action extends AllActions> {
  (payload: Payload): Action;
}
