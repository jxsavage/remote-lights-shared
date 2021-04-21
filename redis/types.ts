import {
  LEDSegment, MicroEffect, MicroId, MicrosAndSegmentsEntity, SegmentId,
} from '../store/types';

interface RedisSplitSegmentsPayload {
  microId: MicroId,
  newSegmentId: SegmentId,
  segmentIds: SegmentId[],
  segmentBoundaries: number[],
  LEDSegments: LEDSegment[],
}