import {
  LEDSegment, SegmentId, MicroId, SegmentById,
  MicroEffect, MicroStateResponse, MicrosAndSegmentsEntity, MicroState,
} from 'Shared/types';

export function generateId(): number {
  return Math.floor(Math.random() * (2147483647 - 1) + 1);
}
export function createSegment(
  microId: MicroId, offset: number, numLEDs: number, effect: MicroEffect,
  segmentId: SegmentId, effectControlledBy = 0, alias?: string
): LEDSegment {
  return {
    offset,
    effect,
    numLEDs,
    microId,
    segmentId,
    effectControlledBy,
    alias: alias === undefined ? String(segmentId) : alias,
  };
}
export function calculateSegmentBoundaries(segments: LEDSegment[]): number[] {
  const boundaries: number[] = segments
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .reduce((boundaries, segment, index) => {
      const notEnd = !(index === (segments.length - 1));
      if (index === 0) {
        boundaries.push(segment.numLEDs);
      } else if (notEnd) {
        boundaries
          .push(segment.offset + segment.numLEDs);
      }
      return boundaries;
    }, [] as number[]);
  return boundaries;
}

export function segmentsArrayToBySegmentId(segments: LEDSegment[]): SegmentById {
  return segments.reduce((byId, segment) => {
    // eslint-disable-next-line no-param-reassign
    byId[segment.segmentId] = segment;
    return byId;
  }, {} as SegmentById);
}
/**
 * Converts response from microcontroller to a
 * MicrosAndSegmentsEntity to be merged with
 * Redis or Redux.
 * @param MicroStateResponse
 * @returns MicrosAndSegmentsEntity representing the microcontrollers state.
 */
export function convertMicroResponseToMicroEntity([
  microId, totalLEDs, brightness, segmentResponseArr,
]: MicroStateResponse): MicrosAndSegmentsEntity {
  const segmentIds: SegmentId[] = [];

  const LEDSegments = segmentResponseArr.map((segmentResponse) => {
    const [,,,segmentId] = segmentResponse;
    segmentIds.push(segmentId);
    return createSegment(microId, ...segmentResponse);
  });
  const segmentBoundaries = calculateSegmentBoundaries(LEDSegments);
  const alias = String(microId);
  const micro: MicroState = {
    alias,
    microId,
    totalLEDs,
    brightness,
    segmentIds,
    segmentBoundaries,
  };
  const results = {
    micros: {
      allIds: [microId],
      byId: {
        [microId]: micro,
      },
    },
    segments: {
      allIds: segmentIds,
      byId: segmentsArrayToBySegmentId(LEDSegments),
    },
  };
  return results;
}
