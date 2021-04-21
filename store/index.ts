import { combineReducers } from 'redux';
import remoteLightsEntityReducer from './reducers';
// eslint-disable-next-line import/no-cycle
import { EmittableAction } from './middleware/emittableAction';

import { AllActions as AllNonMiddlewareActions } from './actions';

export * from './types';
export * from './utils';
export * from './actions';
export * from './reducers';
// export {
//   mergeSegments, splitSegment, setMicroBrightness,
//   setSegmentEffect, resizeSegmentsFromBoundaries, MICRO_COMMAND,
//   MicroActionType,
// } from './actions/microcontroller';
// export {
//   addMicros, resetAllMicrosState, removeMicros,
//   initEntityState, MicroEntityActionType,
// } from './actions/microsEntity';
// export {
//   createGroup, deleteGroup, addSegmentToGroup, removeSegmentFromGroup,
//   changeGroupControlsEffect, setGroupEffect, GroupActionType,
// } from './actions/segmentGroup';
// export {
//   emitActionMiddleware,
//   actionToMicroCommandMiddleware, logActionMiddleware,
// } from './middleware';

// export { Direction, MicroEffect, POSSIBLE_EFFECTS_STRINGS } from './types';

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
