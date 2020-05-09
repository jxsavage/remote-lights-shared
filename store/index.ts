import { combineReducers } from 'redux';
import remoteLightsEntityReducer from './reducers';
import { EmittableAction } from './middleware/emittableAction';

import { AllActions as AllNonMiddlewareActions } from './actions';
import {
  MicroState as typeMicroState,
  LEDSegment as typeLEDSegment,
} from './types';
import { MicroActionsInterface as IMicroActionsInterface } from './actions/microcontroller';

export type MicroState = typeMicroState;
export type LEDSegment = typeLEDSegment;
export type MicroActionsInterface = IMicroActionsInterface;
export {
  mergeSegments, splitSegment, setMicroBrightness,
  setSegmentEffect, resizeSegmentsFromBoundaries, MICRO_COMMAND,
  MicroActionType,
} from './actions/microcontroller';
export {
  addMicros, resetAllMicrosState, removeMicros, addMicroFromControllerResponse,
  MicroEntityTypes,
} from './actions/microsEntity';
export {
  createGroup, deleteGroup, addSegmentToGroup, removeSegmentFromGroup,
  changeGroupControlsEffect, setGroupEffect, GroupActionType,
} from './actions/segmentGroup';
export {
  emitActionMiddleware,
  actionToMicroCommandMiddleware, logActionMiddleware,
} from './middleware';

export { Direction, MicroEffect, POSSIBLE_EFFECTS_STRINGS } from './types';

export type EmittableEntityActions = AllNonMiddlewareActions & EmittableAction;
export type AllActions = AllNonMiddlewareActions | EmittableEntityActions;
// eslint-disable-next-line no-underscore-dangle
const _rootReducerType = combineReducers({
  remoteLightsEntity: remoteLightsEntityReducer,
});
export type RootState = ReturnType<typeof _rootReducerType>;
export const rootReducer = combineReducers<RootState, AllActions>({
  remoteLightsEntity: remoteLightsEntityReducer,
});
