import { Action } from 'redux';
import { generateSegmentId } from '../utils';
import {
  RemoteLightsMicros, MicroId, RemoteLightsEntity,
  Direction, MicroEffect, SegmentId, MicroStateResponse,
} from '../types';

export const ADD_MICROS = 'ADD_MICROS';
export const REMOVE_MICROS = 'REMOVE_MICROS';
export const RESET_ALL_MICROS_STATE = 'RESET_ALL_MICROS_STATE';
export const ADD_MICRO_FROM_CONTROLLER_RESPONSE = 'ADD_MICRO_FROM_CONTROLLER_RESPONSE';

export const SPLIT_SEGMENT = 'SPLIT_SEGMENT';
export const MERGE_SEGMENTS = 'MERGE_SEGMENTS';
export const RESET_MICRO_STATE = 'RESET_MICRO_STATE';
export const SET_SEGMENT_EFFECT = 'SET_SEGMENT_EFFECT';
export const SET_MICRO_BRIGHTNESS = 'SET_MICRO_BRIGHTNESS';
export const RESIZE_SEGMENTS_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES';
interface CreateAction<P, A extends Action> {
  (payload: P): A;
}
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
  remoteLightsMicros: RemoteLightsMicros;
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
/**
 * Split Segment
 */
interface SplitSegmentActionArgs {
  segmentIndex: number; direction: Direction;
  newEffect: MicroEffect; microId: MicroId;
}
export interface SplitSegmentPayload extends SplitSegmentActionArgs {
  newSegmentId: MicroId;
}
interface SplitSegmentAction {
  type: typeof SPLIT_SEGMENT;
  payload: SplitSegmentPayload;
}
export const splitSegment:
CreateAction<SplitSegmentActionArgs, SplitSegmentAction> = (
  payload,
) => {
  const newSegmentId = generateSegmentId();
  return {
    type: SPLIT_SEGMENT,
    payload: {
      ...payload,
      newSegmentId,
    },
  };
};
/**
 * Merge Segments
 */
export interface MergeSegmentsPayload {
  microId: MicroId; segmentId: SegmentId;
  segmentIndex: number; direction: Direction;
}
interface MergeSegmentsAction {
  type: typeof MERGE_SEGMENTS;
  payload: MergeSegmentsPayload;
}
export const mergeSegments:
CreateAction<MergeSegmentsPayload, MergeSegmentsAction> = (
  payload,
) => ({ type: MERGE_SEGMENTS, payload });
/**
 * Set Brightness
 */
export interface SetMicroBrightnessPayload {
  microId: MicroId; brightness: number;
}
interface SetMicroBrightnessAction {
  type: typeof SET_MICRO_BRIGHTNESS;
  payload: SetMicroBrightnessPayload;
}
export const setMicroBrightness:
CreateAction<SetMicroBrightnessPayload, SetMicroBrightnessAction> = (
  payload,
) => ({ type: SET_MICRO_BRIGHTNESS, payload });
/**
 * Set Segment Effect
 */
export interface SetSegmentEffectPayload {
  segmentId: SegmentId; effect: MicroEffect; microId: MicroId;
}
interface SetSegmentEffectAction {
  type: typeof SET_SEGMENT_EFFECT;
  payload: SetSegmentEffectPayload;
}
export const setSegmentEffect:
CreateAction<SetSegmentEffectPayload, SetSegmentEffectAction> = (
  payload,
) => ({ type: SET_SEGMENT_EFFECT, payload });
/**
 * Resize Segments from Boudaries
 */
export interface ResizeSegmentsFromBoundariesPayload {
  microId: MicroId; segmentBoundaries: number[];
}
interface ResizeSegmentsFromBoundariesAction {
  type: typeof RESIZE_SEGMENTS_FROM_BOUNDARIES;
  payload: ResizeSegmentsFromBoundariesPayload;
}
export const resizeSegmentsFromBoundaries:
CreateAction<ResizeSegmentsFromBoundariesPayload, ResizeSegmentsFromBoundariesAction> = (
  payload,
) => ({ type: RESIZE_SEGMENTS_FROM_BOUNDARIES, payload });
export type RemoteLightsEntityActions =
  AddMicrosAction |
  RemoveMicrosAction |
  ResetAllMicrosStateAction |
  AddMicroFromControllerResponseAction |
  SplitSegmentAction |
  MergeSegmentsAction |
  SetSegmentEffectAction |
  SetMicroBrightnessAction |
  ResizeSegmentsFromBoundariesAction;
