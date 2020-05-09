import { Action } from 'redux';
import {
  MicrosAndSegmentsEntity, MicroId, RemoteLightsEntity, MicroStateResponse,
} from '../types';
import { CreateAction, CreateSimpleAction } from './types';

export enum MicroEntityTypes {
  ADD_MICROS = 'ADD_MICROS',
  REMOVE_MICROS = 'REMOVE_MICROS',
  INIT_ENTITY_STATE = 'INIT_ENTITY_STATE',
  RESET_ALL_MICROS_STATE = 'RESET_ALL_MICROS_STATE',
  ADD_MICRO_FROM_CONTROLLER_RESPONSE = 'ADD_MICRO_FROM_CONTROLLER_RESPONSE',
}

const {
  ADD_MICROS, ADD_MICRO_FROM_CONTROLLER_RESPONSE,
  REMOVE_MICROS, RESET_ALL_MICROS_STATE, INIT_ENTITY_STATE,
} = MicroEntityTypes;
/**
 * Add Micro from Controller Response
 */
export interface AddMicroFromControllerResponsePayload {
  microResponse: MicroStateResponse;
}
interface AddMicroFromControllerResponseAction
  extends Action<typeof ADD_MICRO_FROM_CONTROLLER_RESPONSE> {
  payload: AddMicroFromControllerResponsePayload;
}
export const addMicroFromControllerResponse:
CreateAction<AddMicroFromControllerResponsePayload, AddMicroFromControllerResponseAction> = (
  payload,
) => ({ type: ADD_MICRO_FROM_CONTROLLER_RESPONSE, payload });
/**
 * Add Micros
 */
export type AddMicrosPayload = MicrosAndSegmentsEntity;
interface AddMicrosAction
  extends Action<typeof ADD_MICROS> {
  payload: AddMicrosPayload;
}
export const addMicros:
CreateAction<AddMicrosPayload, AddMicrosAction> = (
  payload,
) => ({ type: ADD_MICROS, payload });
/**
 * Remove Micros
 */
export interface RemoveMicrosPayload {
  microIds: MicroId[];
}
export interface RemoveMicrosAction {
  type: typeof REMOVE_MICROS;
  payload: RemoveMicrosPayload;
}
export const removeMicros:
CreateAction<RemoveMicrosPayload, RemoveMicrosAction> = (
  payload,
) => ({ type: REMOVE_MICROS, payload });
/**
 * Reset All Micros State
 */
// export interface ResetAllMicrosPayload {
//   state: RemoteLightsEntity;
// }
interface ResetAllMicrosStateAction {
  type: typeof RESET_ALL_MICROS_STATE;
}
export const resetAllMicrosState:
CreateSimpleAction<ResetAllMicrosStateAction> = (
) => ({ type: RESET_ALL_MICROS_STATE });


type InitEntityStatePayload = RemoteLightsEntity;
interface InitEntityStateAction extends Action<typeof INIT_ENTITY_STATE> {
  payload: InitEntityStatePayload;
}
export const initEntityState:
CreateAction<InitEntityStatePayload, InitEntityStateAction> = (
  payload,
) => ({ type: INIT_ENTITY_STATE, payload });

export type RemoteLightsEntityActions =
  AddMicrosAction |
  RemoveMicrosAction |
  ResetAllMicrosStateAction |
  InitEntityStateAction |
  AddMicroFromControllerResponseAction;
