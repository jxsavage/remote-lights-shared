import { combineReducers, createStore } from 'redux';
import remoteLightsEntityReducer from './reducers';
import { EmittableAction } from './middleware';
import {
  MicroState as typeMicroState,
  LEDSegment as typeLEDSegment,
} from './types';
import { RemoteLightsEntityActions } from './actions';

export {
  addMicros, mergeSegments, splitSegment, setMicroBrightness,
  setSegmentEffect, resetAllMicrosState, removeMicros,
  resizeSegmentsFromBoundaries,
} from './actions';
export { emitActionMiddleware, convertToEmittableAction } from './middleware';
export type MicroState = typeMicroState;
export type LEDSegment = typeLEDSegment;
export { Direction, MicroEffect, POSSIBLE_EFFECTS_STRINGS } from './types';

type EmittableEntityActions = RemoteLightsEntityActions & EmittableAction;
type AllEntityActions = RemoteLightsEntityActions | EmittableEntityActions;
type AllActions = AllEntityActions;
// eslint-disable-next-line no-underscore-dangle
const _rootReducerType = combineReducers({
  remoteLightsEntity: remoteLightsEntityReducer,
});
export type RootState = ReturnType<typeof _rootReducerType>;
export const rootReducer = combineReducers<RootState, AllActions>({
  remoteLightsEntity: remoteLightsEntityReducer,
});
const store = createStore(rootReducer);
export type RootStateDispatch = typeof store.dispatch;
