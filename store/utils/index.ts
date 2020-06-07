import {
  LEDSegment, SegmentId, MicroId, SegmentById, MicroEffect,
} from '../types';

export function generateId(): number {
  return Math.floor(Math.random() * (2147483647 - 1) + 1);
}
export function createSegment(
  microId: MicroId, offset: number, numLEDs: number, effect: MicroEffect, segmentId: SegmentId,
  effectControlledBy = null,
): LEDSegment {
  return {
    offset,
    effect,
    numLEDs,
    microId,
    segmentId,
    effectControlledBy,
  };
}
export function calculateSegmentBoundaries(segments: LEDSegment[]): number[] {
  const boundaries: number[] = segments
    // eslint-disable-next-line no-shadow
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
