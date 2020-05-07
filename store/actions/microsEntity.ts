import { Action } from 'redux';
import {
  MicrosAndSegmentsEntity, MicroId, RemoteLightsEntity, MicroStateResponse,
} from '../types';
import { CreateAction } from './types';

export enum MicroEntityTypes {
  ADD_MICROS = 'ADD_MICROS',
  REMOVE_MICROS = 'REMOVE_MICROS',
  RESET_ALL_MICROS_STATE = 'RESET_ALL_MICROS_STATE',
  ADD_MICRO_FROM_CONTROLLER_RESPONSE = 'ADD_MICRO_FROM_CONTROLLER_RESPONSE',
}

const {
  ADD_MICROS, ADD_MICRO_FROM_CONTROLLER_RESPONSE,
  REMOVE_MICROS, RESET_ALL_MICROS_STATE,
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
export interface AddMicrosPayload {
  MicrosAndSegmentsEntity: MicrosAndSegmentsEntity;
}
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
export interface ResetAllMicrosPayload {
  state: RemoteLightsEntity;
}
interface ResetAllMicrosStateAction {
  type: typeof RESET_ALL_MICROS_STATE;
  payload: ResetAllMicrosPayload;
}
export const resetAllMicrosState:
CreateAction<ResetAllMicrosPayload, ResetAllMicrosStateAction> = (
  payload,
) => ({ type: RESET_ALL_MICROS_STATE, payload });

export type RemoteLightsEntityActions =
  AddMicrosAction |
  RemoveMicrosAction |
  ResetAllMicrosStateAction |
  AddMicroFromControllerResponseAction;
