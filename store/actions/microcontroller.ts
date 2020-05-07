import { CreateAction } from './types';
import {
  Direction, MicroEffect, MicroId, SegmentId,
} from '../types';
import { generateSegmentId } from '../utils';

export enum MicroActionType {
  SPLIT_SEGMENT = 'SPLIT_SEGMENT',
  MERGE_SEGMENTS = 'MERGE_SEGMENTS',
  RESET_MICRO_STATE = 'RESET_MICRO_STATE',
  SET_SEGMENT_EFFECT = 'SET_SEGMENT_EFFECT',
  SET_MICRO_BRIGHTNESS = 'SET_MICRO_BRIGHTNESS',
  RESIZE_SEGMENTS_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES',
}
export enum GetMicroCommands {
  GET_STATE = 'GET_STATE',
}
export type MicroCommand = number;
export type MicroCommands = {
  [values in MicroActionType | GetMicroCommands]: MicroCommand;
};
export const MICRO_COMMAND: MicroCommands = {
  GET_STATE: 1,
  RESET_MICRO_STATE: 2,
  SPLIT_SEGMENT: 3,
  SET_MICRO_BRIGHTNESS: 4,
  MERGE_SEGMENTS: 5,
  SET_SEGMENT_EFFECT: 6,
  RESIZE_SEGMENTS_FROM_BOUNDARIES: 7,
};
const {
  MERGE_SEGMENTS, RESET_MICRO_STATE, RESIZE_SEGMENTS_FROM_BOUNDARIES,
  SET_MICRO_BRIGHTNESS, SET_SEGMENT_EFFECT, SPLIT_SEGMENT,
} = MicroActionType;
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
  segmentId: SegmentId; newEffect: MicroEffect; microId: MicroId;
  segmentIndex: number;
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
type ActionFn<P> = (payload: P) => void;
export interface MicroActionsInterface {
  splitSegment: ActionFn<SplitSegmentPayload>;
  mergeSegments: ActionFn<MergeSegmentsPayload>;
  setSegmentEffect: ActionFn<SetSegmentEffectPayload>;
  setMicroBrightness: ActionFn<SetMicroBrightnessPayload>;
  resizeSegmentsFromBoundaries: ActionFn<ResizeSegmentsFromBoundariesPayload>;
}
export type MicroActions =
SplitSegmentAction |
MergeSegmentsAction |
SetSegmentEffectAction |
SetMicroBrightnessAction |
ResizeSegmentsFromBoundariesAction;
