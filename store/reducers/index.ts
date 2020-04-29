
import {
  createSegment, calculateSegmentBoundaries, segmentsArrayToBySegmentId,
} from '../utils';
import {
  AllEntityActions, 
  MicroActionType, MicroEntityTypes,
} from '../actions';
import { SplitSegmentPayload, MergeSegmentsPayload,
  SetSegmentEffectPayload, SetMicroBrightnessPayload, ResizeSegmentsFromBoundariesPayload,
} from '../actions/microcontroller';
  import { AddMicroFromControllerResponsePayload, } from '../actions/microsEntity';
import {
  RemoteLightsMicros, RemoteLightsEntity, initialState, Direction,
  LEDSegment, SegmentById, SegmentEntity, MicroEntity, MicroState,
} from '../types';

function addMicroFromControllerResponseReducer(
  { micros, segments }: RemoteLightsMicros,
  {
    microResponse: [,
      microId, totalLEDs, brightness, segmentsResponse,
    ],
  }: AddMicroFromControllerResponsePayload,
): RemoteLightsMicros {
  // Construct MicroState:
  const segmentIds: number[] = [];
  const LEDSegments = segmentsResponse.map(
    (segmentResponse) => {
      const [,,,segmentId] = segmentResponse;
      segmentIds.push(segmentId);
      return createSegment(microId, ...segmentResponse);
    },
  );
  const segmentBoundaries = calculateSegmentBoundaries(LEDSegments);
  const micro: MicroState = {
    microId,
    totalLEDs,
    brightness,
    segmentBoundaries,
    segments: segmentIds,
  };
  // Constructing Micro Entity:
  const allMicroIds = [
    ...Array.from(new Set([...micros.allIds, microId]))];
  const byMicroId = {
    ...micros.byId,
    [microId]: micro,
  };
  const newMicros = {
    byId: byMicroId,
    allIds: allMicroIds,
  };
  // Construct Segment Entity:
  const allSegmentIds = [
    ...Array.from(new Set([...segments.allIds, ...segmentIds]))];
  const segmentsById = {
    ...segments.byId,
    ...segmentsArrayToBySegmentId(LEDSegments),
  };
  const newSegments = {
    byId: segmentsById,
    allIds: allSegmentIds,
  };

  return {
    micros: newMicros,
    segments: newSegments,
  };
}
function mergeSegmentsReducer(
  { segments, micros, segmentGroups }: RemoteLightsEntity,
  {
    microId, segmentId, segmentIndex, direction,
  }: MergeSegmentsPayload,
): RemoteLightsEntity {
  /* Create merged segment: */
  const segmentToKeep = segments.byId[segmentId];
  const isLeftMerge = direction === Direction.Left;
  const mergeIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex + 1;
  const segmentToMerge = segments.byId[mergeIndex];
  const offset = isLeftMerge ? segmentToMerge.offset : segmentToKeep.offset;
  const numLEDs = segmentToKeep.numLEDs + segmentToMerge.numLEDs;
  const mergedSegment = createSegment(
    microId, offset, numLEDs, segmentToKeep.effect, segmentToKeep.segmentId,
  );
  /* Edit microcontrollers segments: */
  const micro = micros.byId[microId];
  const microSegments = micro.segments.slice();
  const spliceIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex;
  const [removedSegmentId] = microSegments.splice(spliceIndex, 1);
  /* Rebuild SegmentsById and AllSegmentIds:  */
  const segmentsById: SegmentById = {};
  const allSegmentIds = segments.allIds.filter((segId) => {
    if (segId !== removedSegmentId) {
      if (segId === segmentToKeep.segmentId) {
        segmentsById[segId] = mergedSegment;
      } else {
        segmentsById[segId] = segments.byId[segId];
      }
      return true;
    }
    return false;
  });
  /* Recalculate segment boundaries for microcontroller:  */
  const segmentBoundaries = calculateSegmentBoundaries(microSegments.map(
    (segId) => segmentsById[segId],
  ));
  return {
    micros: {
      ...micros,
      byId: {
        ...micros.byId,
        [microId]: {
          ...micro,
          segmentBoundaries,
          segments: microSegments,
        },
      },
    },
    segments: {
      allIds: allSegmentIds,
      byId: segmentsById,
    },
    segmentGroups,
  };
}
function splitSegmentReducer(
  { segments, micros }: RemoteLightsMicros,
  {
    microId, direction, segmentIndex, newSegmentId, newEffect,
  }: SplitSegmentPayload,
): RemoteLightsMicros {
  const micro = micros.byId[microId];
  const oldMicroSegmentIds = micro.segments;
  const oldMicroSegments = oldMicroSegmentIds.map(
    (segmentId) => segments.byId[segmentId],
  );
  const splitLeft = direction === Direction.Left;
  const LEDSegments = oldMicroSegments.reduce((newArr, segment, i) => {
    const segmentToSplit = segmentIndex === i;
    if (segmentToSplit) {
      const {
        effect, numLEDs, offset, segmentId,
      } = segment;
      // Left LEDSegment
      const leftLen = Math.trunc(numLEDs / 2);
      const leftEffect = splitLeft ? newEffect : effect;
      const leftId = splitLeft ? newSegmentId : segmentId;
      const newLeft = createSegment(microId, offset, leftLen, leftEffect, leftId);
      newArr.push(newLeft);
      // Right LEDSegment
      const rightLen = numLEDs - leftLen;
      const rightOffset = offset + leftLen;
      const rightEffect = splitLeft ? effect : newEffect;
      const rightId = splitLeft ? segmentId : newSegmentId;
      const newRight = createSegment(microId, rightOffset, rightLen, rightEffect, rightId);
      newArr.push(newRight);
    } else {
      newArr.push(segment);
    }
    return newArr;
  }, [] as LEDSegment[]);
  /*
  * Micro Entity properties
  */
  const insertAtIndex = splitLeft ? segmentIndex : segmentIndex + 1;
  const newSegmentIds = oldMicroSegmentIds.splice(insertAtIndex, 0, newSegmentId);
  const segmentBoundaries = calculateSegmentBoundaries(LEDSegments);
  /*
  * Segment Entity Properties
  */
  const allSegmentIds = segments.allIds.concat(newSegmentId);
  const segmentsById = segmentsArrayToBySegmentId(LEDSegments);
  return {
    micros: {
      byId: {
        ...micros.byId,
        [microId]: {
          ...micro,
          segmentBoundaries,
          segments: newSegmentIds,
        },
      },
      allIds: micros.allIds,
    },
    segments: {
      byId: {
        ...segments.byId,
        ...segmentsById,
      },
      allIds: allSegmentIds,
    },
  };
}
function setSegmentEffectReducer(
  { byId, allIds }: SegmentEntity,
  { effect, segmentId }: SetSegmentEffectPayload,
): SegmentEntity {
  const segment = byId[segmentId];
  return {
    byId: {
      ...byId,
      [segmentId]: {
        ...segment,
        effect,
      },
    },
    allIds,
  };
}
function resizeSegmentsFromBoundariesReducer(
  { micros, segments }: RemoteLightsMicros,
  { microId, segmentBoundaries }: ResizeSegmentsFromBoundariesPayload,
): RemoteLightsMicros {
  const micro = micros.byId[microId];
  const oldSegments = micro.segments.map(
    (segId) => segments.byId[segId],
  );
  const resizedLEDSegments = segmentBoundaries
    .reduce((resizedSegs, boundary, i, boundaries) => {
      const start = i === 0;
      const end = (i + 1) === boundaries.length;
      if (start) {
        const { effect, segmentId } = oldSegments[i];
        resizedSegs.push(
          createSegment(microId, 0, boundary, effect, segmentId),
        );
      }
      if (!end && (oldSegments.length > 2)) {
        const { effect, segmentId } = oldSegments[i + 1];
        const numLEDs = boundaries[i + 1] - boundary;
        resizedSegs.push(
          createSegment(microId, boundary, numLEDs, effect, segmentId),
        );
      }
      if (end && (oldSegments.length > 1)) {
        const { effect, segmentId } = oldSegments[i + 1];
        const numLEDs = micro.totalLEDs - boundary;
        resizedSegs.push(
          createSegment(microId, boundary, numLEDs, effect, segmentId),
        );
      }
      return resizedSegs;
    }, [] as LEDSegment[]);
  const segmentsById = segmentsArrayToBySegmentId(resizedLEDSegments);
  return {
    micros: {
      byId: {
        ...micros.byId,
        [microId]: {
          ...micro,
          segmentBoundaries,
        },
      },
      allIds: micros.allIds,
    },
    segments: {
      byId: {
        ...segments.byId,
        ...segmentsById,
      },
      allIds: segments.allIds,
    },
  };
}
function setMicroBrightnessReducer(
  { byId, allIds }: MicroEntity,
  { microId, brightness }: SetMicroBrightnessPayload,
): MicroEntity {
  const micro = byId[microId];
  return {
    byId: {
      ...byId,
      [microId]: {
        ...micro,
        brightness,
      },
    },
    allIds,
  };
}
const {MERGE_SEGMENTS, RESET_MICRO_STATE, RESIZE_SEGMENTS_FROM_BOUNDARIES, SET_MICRO_BRIGHTNESS, SET_SEGMENT_EFFECT, SPLIT_SEGMENT} = MicroActionType;
const {
  ADD_MICROS, ADD_MICRO_FROM_CONTROLLER_RESPONSE, REMOVE_MICROS, RESET_ALL_MICROS_STATE
} = MicroEntityTypes;
export default function remoteLightsEntityReducer(
  state = initialState,
  action: AllEntityActions,
): RemoteLightsEntity {
  switch (action.type) {
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
      } = action.payload.remoteLightsMicros;
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
