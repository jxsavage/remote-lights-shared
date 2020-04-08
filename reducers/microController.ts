/* eslint-disable no-shadow */
import { Direction, WebEffect } from '../../Shared/MicroCommands';
import { WebMicroInfo, WebMicroSegment } from '../../Shared/MicroTypes';
// eslint-disable-next-line import/no-cycle
import { SharedMicroState } from '../../Shared/MicroShared';
// eslint-disable-next-line import/no-cycle
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
  micro: WebMicroInfo;
}
export interface SplitSegmentPayload {
  segmentIndex: number; direction: Direction;
  newEffect: WebEffect;
}
export interface MergeSegmentsPayload {
  segmentIndex: number;
  direction: Direction;
}
export interface SetBrightnessPayload {
  brightness: number;
}
export interface SetSegmentEffectPayload {
  segmentIndex: number; effect: WebEffect;
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
  (state: WebMicroInfo, payload: P): WebMicroInfo;
}
const createSegment = (offset: number, numLEDs: number, effect: WebEffect): WebMicroSegment => ({
  offset,
  effect,
  numLEDs,
});
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
        const { effect } = oldSegments[i];
        segments
          .push(createSegment(0, boundary, effect));
      }
      if (!start && !end) {
        // todo implement
      }
      if (end && (oldSegments.length > 1)) {
        const { effect } = oldSegments[i + 1];
        const numLEDs = state.totalLEDs - boundary;
        segments
          .push(createSegment(boundary, numLEDs, effect));
      }
      return segments;
    }, [] as WebMicroSegment[]);
  return {
    ...state,
    segments,
    segmentBoundaries,
  };
};
const splitSegmentReducer: MicroReducers<SplitSegmentPayload> = (
  state, { newEffect, direction, segmentIndex },
) => {
  const { calculateSegmentBoundaries } = SharedMicroState;
  const segments = state.segments.reduce((newArr, segment, i) => {
    const shouldSplit = segmentIndex === i;
    if (shouldSplit) {
      const { effect, numLEDs, offset } = segment;
      const leftLen = Math.trunc(numLEDs / 2);
      const rightLen = numLEDs - leftLen;
      const rightOffset = offset + leftLen;
      const splitLeft = direction === Direction.Left;
      const leftEffect = splitLeft ? newEffect : effect;
      const rightEffect = splitLeft ? effect : newEffect;
      const newLeft = createSegment(offset, leftLen, leftEffect);
      const newRight = createSegment(rightOffset, rightLen, rightEffect);
      newArr.push(newLeft);
      newArr.push(newRight);
    } else {
      newArr.push(segment);
    }
    return newArr;
  }, [] as WebMicroSegment[]);
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
  const { calculateSegmentBoundaries } = SharedMicroState;
  const segment = state.segments[segmentIndex];
  const isLeftMerge = direction === Direction.Left;
  const mergeIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex + 1;
  const segToMerge = state.segments[mergeIndex];
  let newSegment: WebMicroSegment;
  if (segToMerge) {
    const offset = isLeftMerge ? segToMerge.offset : segment.offset;
    const numLEDs = segment.numLEDs + segToMerge.numLEDs;
    newSegment = createSegment(offset, numLEDs, segment.effect);
  } else {
    const atStart = segmentIndex === 0;
    const numLEDs = atStart
      ? segment.offset + segment.numLEDs
      : state.totalLEDs - segment.offset;
    const offset = atStart ? 0 : segment.offset;
    newSegment = createSegment(offset, numLEDs, segment.effect);
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
    const { offset, numLEDs } = segment;
    return createSegment(offset, numLEDs, effect);
  });
  return { ...state, segments };
};
const setBrightnessReducer: MicroReducers<SetBrightnessPayload> = (
  state, { brightness },
) => ({
  ...state,
  brightness,
});
type MicroReducer = (state: WebMicroInfo, action: MicroActions) => WebMicroInfo;
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
