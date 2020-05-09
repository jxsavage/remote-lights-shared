import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import { AllActions, GroupActionType, MicroActionType, MicroEntityTypes, EmittableEntityActions } from '..';

const { SET_GROUP_EFFECT } = GroupActionType;
const {
  MERGE_SEGMENTS, SPLIT_SEGMENT, RESET_MICRO_STATE, SET_SEGMENT_EFFECT,
  SET_MICRO_BRIGHTNESS, RESIZE_SEGMENTS_FROM_BOUNDARIES
} = MicroActionType;
type EmitAction = (action: AnyAction) => void;
export function serverToLightClientEmitterMiddleware<S>(emit: EmitAction): Middleware<{}, S> {
  const serverToLightClientEmitter: Middleware<AnyAction, S> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: MiddlewareAPI<Dispatch<AnyAction>, S>,
  ) => (
    next: Dispatch<AnyAction>,
  ) => (
    action: EmittableEntityActions,
  ) => {
    switch(action.type) {
      case MERGE_SEGMENTS:
      case SPLIT_SEGMENT:
      case RESET_MICRO_STATE:
      case SET_SEGMENT_EFFECT:
      case SET_MICRO_BRIGHTNESS:
      case RESIZE_SEGMENTS_FROM_BOUNDARIES:
      
    }
    next(action);
  };
  return serverToLightClientEmitter;
}