import { MicroState, MicroId } from 'Shared/MicroTypes';
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
  ADD_MICROS = 'ADD_MICROS',
  REMOVE_MICROS = 'REMOVE_MICROS'
}
export enum StateMicroAction {
  SPLIT = 'SPLIT_SEGMENT',
  MERGE = 'MERGE_SEGMENTS',
  RESET_MICRO = 'RESET_MICRO',
  SET_EFFECT = 'SET_SEGMENT_EFFECT',
  SET_BRIGHTNESS = 'SET_BRIGHTNESS',
  RESIZE_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES',
}
type StateAction = StateMicroAction | StateOnlyAction;

export type ByMicroId = {
  [key: number]: MicroState;
};
export interface RemoteLightsState {
  allMicroIds: MicroId[];
  byMicroId: ByMicroId;
}
type BaseStatePayload<P extends MicroPayloads | ResetPayload> = {
  microId: MicroId;
  payload: P;
};
/*
* Remove Micros Spec
*/
export interface RemoveMicrosPayload {
  microIds: MicroId[];
}
export type RemoveMicrosStateAction = {
  type: StateOnlyAction.REMOVE_MICROS;
  payload: RemoveMicrosPayload;
};
/*
* Add Micros Spec
*/
export interface AddMicrosPayload {
  micros: MicroState[];
}
export type AddMicrosStateAction = {
  type: StateOnlyAction.ADD_MICROS;
  payload: AddMicrosPayload;
};
/*
* Reset State Specs
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
AddMicrosPayload |
ResetStatePayload |
RemoveMicrosPayload |
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
AddMicrosStateAction |
RemoveMicrosStateAction |
StateMicroActions;

interface StateReducers<T extends StateActions> {
  (state: RemoteLightsState, action: T): RemoteLightsState;
}
export interface StateOperations<T extends StatePayloads> {
  (payload: T, byMicroId: ByMicroId): {byMicroId: ByMicroId};
}
const {
  MERGE, SPLIT, RESET_MICRO, SET_EFFECT, SET_BRIGHTNESS, RESIZE_FROM_BOUNDARIES,
} = StateMicroAction;
const {
  RESET, ADD_MICROS, REMOVE_MICROS,
} = StateOnlyAction;
/*
* Segment Actions
*/
export const resetState:
ActionCreator<
ResetStatePayload, ResetStateAction
> = (payload) => ({ type: RESET, payload });
export const addMicros:
ActionCreator<
AddMicrosPayload, AddMicrosStateAction
> = (payload) => ({ type: ADD_MICROS, payload });
export const removeMicros:
ActionCreator<
RemoveMicrosPayload, RemoveMicrosStateAction
> = (payload) => ({ type: REMOVE_MICROS, payload });
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
* Segment Reducer
*/
const convertToMicroAction = (
  stateActionType: StateMicroAction,
): ActionCreator<any, any> => {
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

type StateReducer<T extends StatePayloads> =
(state: RemoteLightsState, payload: T) => RemoteLightsState;

const addMicrosReducer: StateReducer<AddMicrosPayload> = (state, { micros }) => {
  const allMicroIds = state.allMicroIds.slice();
  const newByMicroId = micros.reduce((addedState, micro) => {
    const { microId } = micro;
    if (!allMicroIds.includes(microId)) allMicroIds.push(microId);
    return {
      ...addedState,
      [microId]: micro,
    };
  }, {} as ByMicroId);
  return {
    ...state,
    allMicroIds,
    byMicroId: {
      ...state.byMicroId,
      ...newByMicroId,
    },
  };
};
const removeMicrosReducer: StateReducer<RemoveMicrosPayload> = (state, { microIds }) => {
  const allMicroIds = state.allMicroIds.filter((id) => !microIds.includes(id));
  const byMicroId = allMicroIds.reduce((newByMicroId, microId) => {
    // eslint-disable-next-line no-param-reassign
    newByMicroId[microId] = state.byMicroId[microId];
    return newByMicroId;
  }, {} as ByMicroId);
  return {
    ...state,
    allMicroIds,
    byMicroId,
  };
};
export const initialState: RemoteLightsState = {
  allMicroIds: [],
  byMicroId: {},
};
const remoteLights: StateReducers<StateActions> = (state = initialState, action) => {
  const { byMicroId } = state;
  switch (action.type) {
    case SPLIT:
      return {
        ...state,
        byMicroId: {
          ...byMicroId,
          ...stateActionToMicro(action.payload, byMicroId, action.type),
        },
      };
    case MERGE:
      return {
        ...state,
        byMicroId: {
          ...byMicroId,
          ...stateActionToMicro(action.payload, byMicroId, action.type),
        },
      };
    case SET_EFFECT:
      return {
        ...state,
        byMicroId: {
          ...byMicroId,
          ...stateActionToMicro(action.payload, byMicroId, action.type),
        },
      };
    case SET_BRIGHTNESS:
      return {
        ...state,
        byMicroId: {
          ...byMicroId,
          ...stateActionToMicro(action.payload, byMicroId, action.type),
        },
      };
    case RESIZE_FROM_BOUNDARIES:
      return {
        ...state,
        byMicroId: {
          ...byMicroId,
          ...stateActionToMicro(action.payload, byMicroId, action.type),
        },
      };
    case RESET:
      return action.payload.state;
    case ADD_MICROS:
      return addMicrosReducer(state, action.payload);
    case REMOVE_MICROS:
      return removeMicrosReducer(state, action.payload);
    default:
      return state;
  }
};

export default remoteLights;
