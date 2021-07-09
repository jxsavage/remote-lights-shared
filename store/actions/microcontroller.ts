import {
  Direction, MicroActionType, MicroEffect, MicroId, SegmentId,
} from 'Shared/types';
import { CreateAction } from './types';
import { generateId } from '../utils';

const {
  MERGE_SEGMENTS, RESIZE_SEGMENTS_FROM_BOUNDARIES,
  SET_MICRO_BRIGHTNESS, SET_SEGMENT_EFFECT, SPLIT_SEGMENT,
  SET_MICRO_ALIAS, SET_SEGMENT_ALIAS,
} = MicroActionType;
/**
 * Set Micro Alias
 */
export interface SetMicroAliasPayload {
  microId: MicroId;
  newMicroAlias: string;
}
export interface SetMicroAliasAction {
  type: typeof SET_MICRO_ALIAS;
  payload: SetMicroAliasPayload
}
export const setMicroAlias:
CreateAction<SetMicroAliasPayload, SetMicroAliasAction> = (
  payload,
) => ({ type: SET_MICRO_ALIAS, payload });
/**
 * Set Segment Alias
 */
export interface SetSegmentAliasPayload {
  segmentId: SegmentId;
  newSegmentAlias: string;
}
export interface SetSegmentAliasAction {
  type: typeof SET_SEGMENT_ALIAS;
  payload: SetSegmentAliasPayload
}
export const setSegmentAlias:
CreateAction<SetSegmentAliasPayload, SetSegmentAliasAction> = (
  payload,
) => ({ type: SET_SEGMENT_ALIAS, payload });
/**
 * Split Segment
 */
interface SplitSegmentActionArgs {
  segmentId: SegmentId; direction: Direction;
  newEffect: MicroEffect; microId: MicroId;
  forceNewId?: SegmentId;
}
export interface SplitSegmentPayload extends SplitSegmentActionArgs {
  newSegmentId: MicroId;
}
export interface SplitSegmentAction {
  type: typeof SPLIT_SEGMENT;
  payload: SplitSegmentPayload;
}
export const splitSegment:
CreateAction<SplitSegmentActionArgs, SplitSegmentAction> = (
  payload,
) => {
  const newSegmentId = payload.forceNewId ? payload.forceNewId : generateId();
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
  direction: Direction;
}
export interface MergeSegmentsAction {
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
export interface SetMicroBrightnessAction {
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
}
export interface SetSegmentEffectAction {
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
export interface ResizeSegmentsFromBoundariesAction {
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
SetMicroAliasAction |
SetSegmentAliasAction |
SetSegmentEffectAction |
SetMicroBrightnessAction |
ResizeSegmentsFromBoundariesAction;
