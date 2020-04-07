import { WebMicroInfo } from 'Shared/MicroTypes';
// eslint-disable-next-line import/no-cycle
import RemoteLightsStateOperations from 'Shared/StateOperations';
// eslint-disable-next-line import/no-cycle
import {
  SplitSegmentPayload, MergeSegmentsPayload, SetBrightnessPayload,
  ResizeSegmentsFromBoundariesPayload, MicroPayloads, SetSegmentEffectPayload,
  splitMicroSegment, mergeMicroSegments, setMicroBrightness, resizeMicroSegmentsFromBoundaries,
  setMicroSegmentEffect, microController, resetMicroState, ResetMicroPayload,
} from './microController';
// eslint-disable-next-line import/no-cycle
import { ActionCreator } from './actions';


enum StateOnlyAction {
  RESET = 'RESET_STATE',
}
enum StateMicroAction {
  SPLIT = 'SPLIT_SEGMENT',
  MERGE = 'MERGE_SEGMENTS',
  RESET_MICRO = 'RESET_MICRO',
  SET_EFFECT = 'SET_SEGMENT_EFFECT',
  SET_BRIGHTNESS = 'SET_BRIGHTNESS',
  RESIZE_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES',
}
type StateAction = StateMicroAction | StateOnlyAction;

export type ByMicroId = {
  [key: string]: WebMicroInfo;
};
export interface RemoteLightsState {
  allMicroIds: string[];
  byMicroId: ByMicroId;
}
type BaseStatePayload<P extends MicroPayloads | ResetPayload> = {
  microId: string;
  payload: P;
};
/*
* Reset State Action Specs
*/
export interface ResetPayload {
  state: RemoteLightsState;
}
export type ResetStateAction = {
  type: StateOnlyAction.RESET;
  payload: ResetStatePayload;
};
/*
* State Payload Types
*/
export type ResetStatePayload =
ResetPayload;
export type ResetMicroStatePayload =
BaseStatePayload<ResetMicroPayload>;
export type SplitSegmentStatePayload =
BaseStatePayload<SplitSegmentPayload>;
export type MergeSegmentsStatePayload =
BaseStatePayload<MergeSegmentsPayload>;
export type SetBrightnessStatePayload =
BaseStatePayload<SetBrightnessPayload>;
export type SetSegmentEffectStatePayload =
BaseStatePayload<SetSegmentEffectPayload>;
export type ResizeSegmentsFromBoundariesStatePayload =
BaseStatePayload<ResizeSegmentsFromBoundariesPayload>;

export type StateMicroPayloads =
  ResetMicroStatePayload |
  SplitSegmentStatePayload |
  MergeSegmentsStatePayload |
  SetBrightnessStatePayload |
  SetSegmentEffectStatePayload |
  ResizeSegmentsFromBoundariesStatePayload;
export type StatePayloads =
ResetStatePayload |
StateMicroPayloads;


interface BaseStateMicroAction<A extends StateMicroAction, P extends StatePayloads> {
  type: A;
  payload: P;
}
type SplitSegmentStateAction =
BaseStateMicroAction<StateMicroAction.SPLIT, SplitSegmentStatePayload>;
type MergeSegmentsStateAction =
BaseStateMicroAction<StateMicroAction.MERGE, MergeSegmentsStatePayload>;
type SetSegmentEffectStateAction =
BaseStateMicroAction<StateMicroAction.SET_EFFECT, SetSegmentEffectStatePayload>;
type SetBrightnessStateAction =
BaseStateMicroAction<StateMicroAction.SET_BRIGHTNESS, SetBrightnessStatePayload>;
type ResizeSegmentsFromBoundariesStateAction =
BaseStateMicroAction<
StateMicroAction.RESIZE_FROM_BOUNDARIES, ResizeSegmentsFromBoundariesStatePayload>;
type ResetMicroStateAction =
BaseStateMicroAction<StateMicroAction.RESET_MICRO, ResetMicroStatePayload>;


export type StateMicroActions =
  ResetMicroStateAction |
  SplitSegmentStateAction |
  MergeSegmentsStateAction |
  SetBrightnessStateAction |
  SetSegmentEffectStateAction |
  ResizeSegmentsFromBoundariesStateAction;
export type StateActions =
ResetStateAction |
StateMicroActions;

interface StateReducers<T extends StateActions> {
  (state: RemoteLightsState, action: T): RemoteLightsState;
}
export interface StateOperations<T extends StatePayloads> {
  (payload: T, byMicroId: ByMicroId): {byMicroId: ByMicroId};
}


const initialState: RemoteLightsState = {
  allMicroIds: [],
  byMicroId: {},
};
const {
  MERGE, SPLIT, RESET_MICRO, SET_EFFECT, SET_BRIGHTNESS, RESIZE_FROM_BOUNDARIES,
} = StateMicroAction;
const {
  RESET,
} = StateOnlyAction;
/*
* Segment Actions
*/
export const resetState:
ActionCreator<
ResetStatePayload, ResetStateAction
> = (payload) => ({ type: RESET, payload });
export const splitSegment:
ActionCreator<
SplitSegmentStatePayload, SplitSegmentStateAction
> = (payload) => ({ type: SPLIT, payload });
export const mergeSegments:
ActionCreator<
MergeSegmentsStatePayload, MergeSegmentsStateAction
> = (payload) => ({ type: MERGE, payload });
export const setSegmentEffect:
ActionCreator<
SetSegmentEffectStatePayload, SetSegmentEffectStateAction
> = (payload) => ({ type: SET_EFFECT, payload });
export const setBrightness:
ActionCreator<
SetBrightnessStatePayload, SetBrightnessStateAction
> = (payload) => ({ type: SET_BRIGHTNESS, payload });
export const resizeSegmentsFromBoundaries:
ActionCreator<
ResizeSegmentsFromBoundariesStatePayload, ResizeSegmentsFromBoundariesStateAction
> = (payload) => ({ type: RESIZE_FROM_BOUNDARIES, payload });
/*
* Reducers
*/
// const splitSegmentReducer: StateReducers<SplitSegmentAction> = (state, { payload }) => ({
//   ...state,
//   ...RemoteLightsStateOperations.splitSegment(payload, state.byMicroId),
// });
// const mergeSegmentsReducer: StateReducers<MergeSegmentsAction> = (state, { payload }) => ({
//   ...state,
//   ...RemoteLightsStateOperations.mergeSegments(payload, state.byMicroId),
// });
// const setSegmentEffectReducer: StateReducers<SetSegmentEffectAction> = (state, { payload }) => ({
//   ...state,
//   ...RemoteLightsStateOperations.setSegmentEffect(payload, state.byMicroId),
// });
// const setBrightnessReducer: StateReducers<SetBrightnessAction> = (state, { payload }) => ({
//   ...state,
//   ...RemoteLightsStateOperations.setBrightness(payload, state.byMicroId),
// });
// const resizeSegmentsFromBoundariesReducer:
// StateReducers<ResizeSegmentsFromBoundariesAction> = (state, { payload }) => ({
//   ...state,
//   ...RemoteLightsStateOperations.resizeSegmentsFromBoundaries(payload, state.byMicroId),
// });
/*
* Segment Reducer
*/
const StateActionToMicroAction = {
  [SPLIT]: splitMicroSegment,
  [MERGE]: mergeMicroSegments,
  [RESET_MICRO]: resetMicroState,
  [SET_EFFECT]: setMicroSegmentEffect,
  [SET_BRIGHTNESS]: setMicroBrightness,
  [RESIZE_FROM_BOUNDARIES]: resizeMicroSegmentsFromBoundaries,
};
const convertToMicroAction = (
  stateActionType: StateMicroAction,
) => {
  switch (stateActionType) {
    case SPLIT: return splitMicroSegment;
    case MERGE: return mergeMicroSegments;
    case RESET_MICRO: return resetMicroState;
    case SET_EFFECT: return setMicroSegmentEffect;
    case SET_BRIGHTNESS: return setMicroBrightness;
    case RESIZE_FROM_BOUNDARIES: return resizeMicroSegmentsFromBoundaries;
    default: throw new Error('Incorrect action type provided');
  }
};

const stateActionToMicro = (
  { microId, payload }: StateMicroPayloads, byMicroId: ByMicroId,
  action: StateMicroAction,
): {byMicroId: ByMicroId} => ({
  byMicroId: {
    [microId]: microController(
      byMicroId[microId],
      convertToMicroAction(action)(payload as any),
    ),
  },
});

const remoteLights: StateReducers<StateActions> = (state = initialState, action) => {
  const { byMicroId } = state;
  switch (action.type) {
    case SPLIT:
      return {
        ...state,
        ...byMicroId,
        ...stateActionToMicro(action.payload, byMicroId, action.type),
      };
    case MERGE:
      return {
        ...state,
        ...byMicroId,
        ...stateActionToMicro(action.payload, byMicroId, action.type),
      };
    case SET_EFFECT:
      return {
        ...state,
        ...byMicroId,
        ...stateActionToMicro(action.payload, byMicroId, action.type),
      };
    case SET_BRIGHTNESS:
      return {
        ...state,
        ...byMicroId,
        ...stateActionToMicro(action.payload, byMicroId, action.type),
      };
    case RESIZE_FROM_BOUNDARIES:
      return {
        ...state,
        ...byMicroId,
        ...stateActionToMicro(action.payload, byMicroId, action.type),
      };
    case RESET:
      return action.payload.state;
    default:
      return state;
  }
};

export default remoteLights;
