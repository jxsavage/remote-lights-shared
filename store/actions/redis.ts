import {
  LEDSegment, MicroEffect, MicroId,
  MicrosAndSegmentsEntity, SegmentId,
} from 'Shared/store';

interface RedisSplitSegmentPayload {
  microId: MicroId,
  newSegmentId: SegmentId,
  segmentIds: SegmentId[],
  segmentBoundaries: number[],
  LEDSegments: LEDSegment[],
}

function generateSplitSegmentPayload(
  microId: MicroId, entity: MicrosAndSegmentsEntity,
  newSegmentId: SegmentId,
): RedisSplitSegmentPayload {
  const { segmentBoundaries, segmentIds } = entity.micros.byId[microId];
  const LEDSegments = segmentIds.map((segId) => entity.segments.byId[segId]);
  return {
    microId,
    newSegmentId,
    segmentIds,
    segmentBoundaries,
    LEDSegments,
  };
}

interface RedisMergeSegmentsPayload {
  microId: MicroId,
  deletedSegmentId: SegmentId,
  segmentIds: SegmentId[],
  segmentBoundaries: number[],
  LEDSegments: LEDSegment[],
}

function generateMergeSegmentsPayload(
  microId: MicroId, entity: MicrosAndSegmentsEntity,
  deletedSegmentId: SegmentId,
): RedisMergeSegmentsPayload {
  const { segmentBoundaries, segmentIds } = entity.micros.byId[microId];
  const LEDSegments = segmentIds.map((segId) => entity.segments.byId[segId]);
  return {
    microId,
    deletedSegmentId,
    segmentIds,
    segmentBoundaries,
    LEDSegments,
  };
}
interface RedisSetSegmentEffectPayload {
  segmentId: SegmentId,
  effect: MicroEffect,
}
function generateSetSegmentEffectPayload(
  segmentId: SegmentId, effect: MicroEffect,
): RedisSetSegmentEffectPayload {
  return {
    segmentId,
    effect,
  };
}
interface RedisSetMicroBrightnessPayload {
  microId: MicroId,
  brightness: number,
}
function generateSetMicroBrightnessPayload(
  microId: MicroId, brightness: number,
): RedisSetMicroBrightnessPayload {
  return {
    microId,
    brightness,
  };
}
