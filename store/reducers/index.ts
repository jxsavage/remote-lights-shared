import {
  AllEntityActions, MicroActionType, MicroEntityTypes, GroupActionType,
} from '../actions';
import { RemoteLightsEntity, initialState } from '../types';
import {
  createGroupReducer, deleteGroupReducer,
  addSegmentToGroupReducer, removeSegmentFromGroupReducer,
  changeGroupControlsEffectReducer,
  setGroupEffectReducer,
} from './segmentGroup';
import {
  splitSegmentReducer, mergeSegmentsReducer, setSegmentEffectReducer,
  setMicroBrightnessReducer, resizeSegmentsFromBoundariesReducer,
  addMicroFromControllerResponseReducer,
} from './microcontroller';


const {
  MERGE_SEGMENTS, RESET_MICRO_STATE, RESIZE_SEGMENTS_FROM_BOUNDARIES,
  SET_MICRO_BRIGHTNESS, SET_SEGMENT_EFFECT, SPLIT_SEGMENT,
} = MicroActionType;
const {
  ADD_MICROS, ADD_MICRO_FROM_CONTROLLER_RESPONSE, REMOVE_MICROS,
  RESET_ALL_MICROS_STATE,
} = MicroEntityTypes;
const {
  CREATE_GROUP, DELETE_GROUP,
  ADD_SEGMENT_TO_GROUP, REMOVE_SEGMENT_FROM_GROUP,
  CHANGE_GROUP_CONTROLS_EFFECT, SET_GROUP_EFFECT,
} = GroupActionType;
export default function remoteLightsEntityReducer(
  state = initialState,
  action: AllEntityActions,
): RemoteLightsEntity {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        segmentGroups: {
          ...createGroupReducer(
            state.segmentGroups,
            action.payload,
          ),
        },
      };
    case DELETE_GROUP:
      return {
        ...state,
        segmentGroups: {
          ...deleteGroupReducer(
            state.segmentGroups,
            action.payload,
          ),
        },
      };
    case ADD_SEGMENT_TO_GROUP:
      return {
        ...state,
        segmentGroups: {
          ...addSegmentToGroupReducer(
            state.segmentGroups,
            action.payload,
          ),
        },
      };
    case REMOVE_SEGMENT_FROM_GROUP:
      return {
        ...state,
        segmentGroups: {
          ...removeSegmentFromGroupReducer(
            state.segmentGroups,
            action.payload,
          ),
        },
      };
    case SET_GROUP_EFFECT: {
      const { segments, segmentGroups } = state;
      return {
        ...state,
        ...setGroupEffectReducer(
          { segments, segmentGroups },
          action.payload,
        ),
      };
    }
    case CHANGE_GROUP_CONTROLS_EFFECT: {
      const { segments, segmentGroups } = state;
      return {
        ...state,
        ...changeGroupControlsEffectReducer(
          { segments, segmentGroups },
          action.payload,
        ),
      };
    }
    case SPLIT_SEGMENT: {
      const { micros, segments } = state;
      return {
        ...state,
        ...splitSegmentReducer(
          { micros, segments }, action.payload,
        ),
      };
    }
    case MERGE_SEGMENTS:
      return mergeSegmentsReducer(state, action.payload);
    case SET_SEGMENT_EFFECT: {
      const segments = setSegmentEffectReducer(
        state.segments, action.payload,
      );
      return {
        ...state,
        segments,
      };
    }
    case SET_MICRO_BRIGHTNESS: {
      const micros = setMicroBrightnessReducer(
        state.micros, action.payload,
      );
      return {
        ...state,
        micros,
      };
    }
    case RESIZE_SEGMENTS_FROM_BOUNDARIES: {
      const { micros, segments } = state;
      return {
        ...state,
        ...resizeSegmentsFromBoundariesReducer(
          { micros, segments }, action.payload,
        ),
      };
    }
    case ADD_MICROS: {
      const {
        micros, segments,
      } = action.payload;
      return {
        ...state,
        micros: {
          byId: {
            ...state.micros.byId,
            ...micros.byId,
          },
          allIds: state.micros.allIds.concat(micros.allIds),
        },
        segments: {
          byId: {
            ...state.segments.byId,
            ...segments.byId,
          },
          allIds: state.segments.allIds.concat(segments.allIds),
        },
      };
    }
    case REMOVE_MICROS:
      return state;
    case RESET_ALL_MICROS_STATE:
      return action.payload.state;
    case ADD_MICRO_FROM_CONTROLLER_RESPONSE: {
      const { micros, segments } = state;
      return {
        ...state,
        ...addMicroFromControllerResponseReducer(
          { micros, segments }, action.payload,
        ),
      };
    }
    default:
      return state;
  }
}
