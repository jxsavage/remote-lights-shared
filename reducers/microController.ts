/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
import { Direction, MicroEffect } from '../MicroCommands';
import { MicroState, LEDSegment, SegmentId } from '../MicroTypes';
import { ActionCreator } from './actions';

enum MicroAction {
  RESET = 'MICRO_RESET_STATE',
  SPLIT = 'MICRO_SPLIT_SEGMENT',
  MERGE = 'MICRO_MERGE_SEGMENTS',
  SET_EFFECT = 'MICRO_SET_SEGMENT_EFFECT',
  SET_BRIGHTNESS = 'MICRO_SET_BRIGHTNESS',
  RESIZE_FROM_BOUNDARIES = 'MICRO_RESIZE_SEGMENTS_FROM_BOUNDARIES',
}
export interface ResetMicroPayload {
  micro: MicroState;
}
export interface SplitSegmentPayload {
  segmentIndex: number; direction: Direction;
  newEffect: MicroEffect;
}
export interface MergeSegmentsPayload {
  segmentIndex: number;
  direction: Direction;
}
export interface SetBrightnessPayload {
  brightness: number;
}
export interface SetSegmentEffectPayload {
  segmentIndex: number; effect: MicroEffect;
}
export interface ResizeSegmentsFromBoundariesPayload {
  segmentBoundaries: number[];
}
export type MicroPayloads =
  ResetMicroPayload |
  SplitSegmentPayload |
  MergeSegmentsPayload |
  SetBrightnessPayload |
  SetSegmentEffectPayload |
  ResizeSegmentsFromBoundariesPayload;

interface BaseMicroAction<A extends MicroAction, P extends MicroPayloads> {
  type: A;
  payload: P;
}
export type ResetMicroAction =
BaseMicroAction<MicroAction.RESET, ResetMicroPayload>;
export type SplitSegmentAction =
BaseMicroAction<MicroAction.SPLIT, SplitSegmentPayload>;
export type MergeSegmentsAction =
BaseMicroAction<MicroAction.MERGE, MergeSegmentsPayload>;
export type SetBrightnessAction =
BaseMicroAction<MicroAction.SET_BRIGHTNESS, SetBrightnessPayload>;
export type SetSegmentEffectAction =
BaseMicroAction<MicroAction.SET_EFFECT, SetSegmentEffectPayload>;
export type ResizeSegmentsFromBoundariesAction =
BaseMicroAction<MicroAction.RESIZE_FROM_BOUNDARIES, ResizeSegmentsFromBoundariesPayload>;

export type MicroActions =
ResetMicroAction |
SplitSegmentAction |
MergeSegmentsAction |
SetBrightnessAction |
SetSegmentEffectAction |
ResizeSegmentsFromBoundariesAction;

const {
  RESET, MERGE, SPLIT, SET_EFFECT, SET_BRIGHTNESS, RESIZE_FROM_BOUNDARIES,
} = MicroAction;
export const resetMicroState:
ActionCreator<
ResetMicroPayload, ResetMicroAction
> = (payload) => ({ type: RESET, payload });
export const splitMicroSegment:
ActionCreator<
SplitSegmentPayload, SplitSegmentAction
> = (payload) => ({ type: SPLIT, payload });
export const mergeMicroSegments:
ActionCreator<
MergeSegmentsPayload, MergeSegmentsAction
> = (payload) => ({ type: MERGE, payload });
export const setMicroSegmentEffect:
ActionCreator<
SetSegmentEffectPayload, SetSegmentEffectAction
> = (payload) => ({ type: SET_EFFECT, payload });
export const setMicroBrightness:
ActionCreator<
SetBrightnessPayload, SetBrightnessAction
> = (payload) => ({ type: SET_BRIGHTNESS, payload });
export const resizeMicroSegmentsFromBoundaries:
ActionCreator<
ResizeSegmentsFromBoundariesPayload, ResizeSegmentsFromBoundariesAction
> = (payload) => ({ type: RESIZE_FROM_BOUNDARIES, payload });

interface MicroReducers<P extends MicroPayloads> {
  (state: MicroState, payload: P): MicroState;
}
function generateSegmentId(): number {
  return Math.floor(Math.random() * (2147483647 - 1) + 1);
}
export const createSegment = (
  offset: number, numLEDs: number, effect: MicroEffect, segmentId: SegmentId,
): LEDSegment => ({
  offset,
  effect,
  numLEDs,
  segmentId,
});
export const calculateSegmentBoundaries = (segments: LEDSegment[]): number[] => {
  const boundaries: number[] = segments
    .reduce((boundaries, segment, index) => {
      const notEnd = !(index === (segments.length - 1));
      if (index === 0) {
        boundaries.push(segment.numLEDs);
      } else if (notEnd) {
        boundaries
          .push(segment.offset + segment.numLEDs);
      }
      return boundaries;
    }, [] as number[]);
  return boundaries;
};
const resizeSegmentsFromBoundariesReducer:
MicroReducers<ResizeSegmentsFromBoundariesPayload> = (
  state, { segmentBoundaries },
) => {
  const oldSegments = state.segments;
  const segments = segmentBoundaries
    .reduce((segments, boundary, i, boundaries) => {
      const start = i === 0;
      const end = (i + 1) === boundaries.length;
      if (start) {
        const { effect, segmentId } = oldSegments[i];
        segments
          .push(createSegment(0, boundary, effect, segmentId));
      }
      if (!end && (oldSegments.length > 2)) {
        const {effect, segmentId} = oldSegments[i+1];
        const numLEDs = boundaries[i + 1] - boundary;
        segments.push(createSegment(boundary, numLEDs, effect, segmentId));
      }
      if (end && (oldSegments.length > 1)) {
        const { effect, segmentId } = oldSegments[i + 1];
        const numLEDs = state.totalLEDs - boundary;
        segments
          .push(createSegment(boundary, numLEDs, effect, segmentId));
      }
      return segments;
    }, [] as LEDSegment[]);
  return {
    ...state,
    segments,
    segmentBoundaries,
  };
};
const splitSegmentReducer: MicroReducers<SplitSegmentPayload> = (
  state, { newEffect, direction, segmentIndex },
) => {
  const segments = state.segments.reduce((newArr, segment, i) => {
    const shouldSplit = segmentIndex === i;
    if (shouldSplit) {
      const {
        effect, numLEDs, offset, segmentId,
      } = segment;
      const leftLen = Math.trunc(numLEDs / 2);
      const rightLen = numLEDs - leftLen;
      const rightOffset = offset + leftLen;
      const splitLeft = direction === Direction.Left;
      const newId = generateSegmentId();
      const leftEffect = splitLeft ? newEffect : effect;
      const leftId = splitLeft ? newId : segmentId;
      const rightEffect = splitLeft ? effect : newEffect;
      const rightId = splitLeft ? segmentId : newId;
      const newLeft = createSegment(offset, leftLen, leftEffect, leftId);
      const newRight = createSegment(rightOffset, rightLen, rightEffect, rightId);
      newArr.push(newLeft);
      newArr.push(newRight);
    } else {
      newArr.push(segment);
    }
    return newArr;
  }, [] as LEDSegment[]);
  const segmentBoundaries = calculateSegmentBoundaries(segments);
  return {
    ...state,
    segments,
    segmentBoundaries,
  };
};
const mergeSegmentsReducer: MicroReducers<MergeSegmentsPayload> = (
  state, { direction, segmentIndex },
) => {
  const segment = state.segments[segmentIndex];
  const isLeftMerge = direction === Direction.Left;
  const mergeIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex + 1;
  const segToMerge = state.segments[mergeIndex];
  let newSegment: LEDSegment;
  if (segToMerge) {
    const offset = isLeftMerge ? segToMerge.offset : segment.offset;
    const numLEDs = segment.numLEDs + segToMerge.numLEDs;
    newSegment = createSegment(offset, numLEDs, segment.effect, segment.segmentId);
  } else {
    const atStart = segmentIndex === 0;
    const numLEDs = atStart
      ? segment.offset + segment.numLEDs
      : state.totalLEDs - segment.offset;
    const offset = atStart ? 0 : segment.offset;
    newSegment = createSegment(offset, numLEDs, segment.effect, segment.segmentId);
  }
  const spliceIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex;
  const segments = state.segments.slice();
  segments.splice(spliceIndex, 2, newSegment);
  const segmentBoundaries = calculateSegmentBoundaries(segments);
  return {
    ...state,
    segments,
    segmentBoundaries,
  };
};
const setSegmentEffectReducer: MicroReducers<SetSegmentEffectPayload> = (
  state, { effect, segmentIndex },
) => {
  const segments = state.segments.map((segment, i) => {
    if (segmentIndex !== i) {
      return segment;
    }
    const { offset, numLEDs, segmentId } = segment;
    return createSegment(offset, numLEDs, effect, segmentId);
  });
  return { ...state, segments };
};
const setBrightnessReducer: MicroReducers<SetBrightnessPayload> = (
  state, { brightness },
) => ({
  ...state,
  brightness,
});
type MicroReducer = (state: MicroState, action: MicroActions) => MicroState;
export const microController: MicroReducer = (state, action) => {
  switch (action.type) {
    case SPLIT:
      return splitSegmentReducer(state, action.payload);
    case MERGE:
      return mergeSegmentsReducer(state, action.payload);
    case SET_EFFECT:
      return setSegmentEffectReducer(state, action.payload);
    case SET_BRIGHTNESS:
      return setBrightnessReducer(state, action.payload);
    case RESIZE_FROM_BOUNDARIES:
      return resizeSegmentsFromBoundariesReducer(state, action.payload);
    case RESET:
      return action.payload.micro;
    default:
      return state;
  }
};
