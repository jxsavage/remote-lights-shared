/* eslint-disable import/no-cycle */
import {
  createSegment, calculateSegmentBoundaries, segmentsArrayToBySegmentId,
  SplitSegmentPayload, MergeSegmentsPayload,
  SetSegmentEffectPayload, SetMicroBrightnessPayload,
  ResizeSegmentsFromBoundariesPayload,
  MicrosAndSegmentsEntity, RemoteLightsEntity, Direction,
  LEDSegment, SegmentById, SegmentEntity, MicroEntity,
} from 'Shared/store';

export function mergeSegmentsReducer(
  { segments, micros, segmentGroups }: RemoteLightsEntity,
  {
    microId, segmentId, direction,
  }: MergeSegmentsPayload,
): RemoteLightsEntity {
  /* Create merged segment: */
  const segmentIds = micros.byId[microId].segmentIds.slice();
  const segmentIndex = segmentIds.indexOf(segmentId);
  const segmentToKeep = segments.byId[segmentId];
  const isLeftMerge = direction === Direction.Left;
  const mergeIndex = isLeftMerge ? segmentIndex - 1 : segmentIndex + 1;
  const segmentToMerge = segments.byId[segmentIds[mergeIndex]];
  const offset = isLeftMerge ? segmentToMerge.offset : segmentToKeep.offset;
  const numLEDs = segmentToKeep.numLEDs + segmentToMerge.numLEDs;
  const mergedSegment = createSegment(
    microId, offset, numLEDs, segmentToKeep.effect, segmentToKeep.segmentId,
  );
  /* Edit microcontrollers segments: */
  const micro = micros.byId[microId];
  const [removedSegmentId] = segmentIds.splice(mergeIndex, 1);
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
    microId, direction, newSegmentId, newEffect, segmentId,
  }: SplitSegmentPayload,
): MicrosAndSegmentsEntity {
  const micro = micros.byId[microId];
  const segmentIds = micro.segmentIds.slice();
  const oldMicroSegments = segmentIds.map(
    (segId) => segments.byId[segId],
  );
  const splitLeft = direction === Direction.Left;
  const segmentIndex = micros.byId[microId].segmentIds.indexOf(segmentId);
  const LEDSegments = oldMicroSegments.reduce((newArr, segment, i) => {
    const segmentToSplit = segmentIndex === i;
    if (segmentToSplit) {
      const {
        effect, numLEDs, offset,
      } = segment;
      // Left LEDSegment
      const leftLen = (numLEDs > 0) ? Math.trunc(numLEDs / 2) : 0;
      const leftEffect = splitLeft ? newEffect : effect;
      const leftId = splitLeft ? newSegmentId : segment.segmentId;
      const newLeft = createSegment(microId, offset, leftLen, leftEffect, leftId);
      newArr.push(newLeft);
      // Right LEDSegment
      const rightLen = numLEDs - leftLen;
      const rightOffset = offset + leftLen;
      const rightEffect = splitLeft ? effect : newEffect;
      const rightId = splitLeft ? segment.segmentId : newSegmentId;
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
  segmentIds.splice(insertAtIndex, 0, newSegmentId);
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
          segmentIds,
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
  const numSegments = micro.segmentIds.length;
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
      const middle = !end && (numSegments > 2);
      if (middle) {
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
