import {
  createSegment, calculateSegmentBoundaries, segmentsArrayToBySegmentId,
} from '../utils';
import {
  SplitSegmentPayload, MergeSegmentsPayload,
  SetSegmentEffectPayload, SetMicroBrightnessPayload,
  ResizeSegmentsFromBoundariesPayload,
} from '../actions/microcontroller';
import { AddMicroFromControllerResponsePayload } from '../actions/microsEntity';
import {
  MicrosAndSegmentsEntity, RemoteLightsEntity, Direction,
  LEDSegment, SegmentById, SegmentEntity, MicroEntity, MicroState,
} from '../types';

export function addMicroFromControllerResponseReducer(
  { micros, segments }: MicrosAndSegmentsEntity,
  {
    microResponse: [,
      microId, totalLEDs, brightness, segmentsResponse,
    ],
  }: AddMicroFromControllerResponsePayload,
): MicrosAndSegmentsEntity {
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
    segmentIds,
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
export function mergeSegmentsReducer(
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
  const segmentIds = micro.segmentIds.slice();
  const spliceIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex;
  const [removedSegmentId] = segmentIds.splice(spliceIndex, 1);
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
  const segmentBoundaries = calculateSegmentBoundaries(segmentIds.map(
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
          segmentIds,
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
export function splitSegmentReducer(
  { segments, micros }: MicrosAndSegmentsEntity,
  {
    microId, direction, segmentIndex, newSegmentId, newEffect,
  }: SplitSegmentPayload,
): MicrosAndSegmentsEntity {
  const micro = micros.byId[microId];
  const oldMicroSegmentIds = micro.segmentIds;
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
          segmentIds: newSegmentIds,
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
export function setSegmentEffectReducer(
  { byId, allIds }: SegmentEntity,
  { newEffect, segmentId }: SetSegmentEffectPayload,
): SegmentEntity {
  const segment = byId[segmentId];
  return {
    byId: {
      ...byId,
      [segmentId]: {
        ...segment,
        effect: newEffect,
      },
    },
    allIds,
  };
}
export function resizeSegmentsFromBoundariesReducer(
  { micros, segments }: MicrosAndSegmentsEntity,
  { microId, segmentBoundaries }: ResizeSegmentsFromBoundariesPayload,
): MicrosAndSegmentsEntity {
  const micro = micros.byId[microId];
  const oldSegments = micro.segmentIds.map(
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
export function setMicroBrightnessReducer(
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