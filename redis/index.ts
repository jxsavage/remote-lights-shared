import {
  LEDSegment, MicroEffect, MicroId,
  SegmentId, RemoteLightsEntity, SplitSegmentAction,
  MergeSegmentsAction, SetSegmentEffectAction,
  SetMicroBrightnessAction, ResizeSegmentsFromBoundariesAction,
} from 'Shared/store';

interface RedisMeta<S> {
  meta: {
    redis: S
  }
}
function generateMeta<T>(payload: T): RedisMeta<T> {
  return {
    meta: {
      redis: {
        ...payload,
      },
    },
  };
}
function findUniqueId(arr1: number[], arr2: number[]): number {
  const unique = arr1.reduce((uni, current) => {
    if (arr2.includes(current)) return current;
    return uni;
  }, 0);
  return unique;
}

interface SplitSegmentRedisPayload {
  microId: MicroId,
  newSegmentId: SegmentId,
  segmentIds: SegmentId[],
  segmentBoundaries: number[],
  LEDSegments: LEDSegment[],
}
type SplitSegmentRedisMeta = RedisMeta<SplitSegmentRedisPayload>;
export type SplitSegmentRedisAction = SplitSegmentAction & SplitSegmentRedisMeta;
export function splitSegmentRedis(
  newEntity: RemoteLightsEntity,
  action: SplitSegmentAction,
): SplitSegmentRedisAction {
  const { microId, newSegmentId } = action.payload;
  const { segmentBoundaries, segmentIds } = newEntity.micros.byId[microId];
  const LEDSegments = segmentIds.map((segId) => newEntity.segments.byId[segId]);
  return {
    ...action,
    ...generateMeta<SplitSegmentRedisPayload>({
      microId,
      newSegmentId,
      segmentIds,
      segmentBoundaries,
      LEDSegments,
    }),
  };
}

interface MergeSegmentsRedisPayload {
  microId: MicroId,
  deletedSegmentId: SegmentId,
  segmentIds: SegmentId[],
  segmentBoundaries: number[],
  LEDSegments: LEDSegment[],
}
type MergeSegmentsRedisMeta = RedisMeta<MergeSegmentsRedisPayload>;
export type MergeSegmentsRedisAction = MergeSegmentsAction & MergeSegmentsRedisMeta;
export function mergeSegmentsRedis(
  prevEntity: RemoteLightsEntity,
  newEntity: RemoteLightsEntity,
  action: MergeSegmentsAction,
): MergeSegmentsRedisAction {
  const { microId } = action.payload;
  const deletedSegmentId = findUniqueId(
    prevEntity.segments.allIds,
    newEntity.segments.allIds,
  );
  const { segmentBoundaries, segmentIds } = newEntity.micros.byId[microId];
  const LEDSegments = segmentIds.map((segId) => newEntity.segments.byId[segId]);
  return {
    ...action,
    ...generateMeta<MergeSegmentsRedisPayload>({
      microId,
      deletedSegmentId,
      segmentIds,
      segmentBoundaries,
      LEDSegments,
    }),
  };
}
interface SetSegmentEffectRedisPayload {
  segmentId: SegmentId,
  newEffect: MicroEffect,
}
type SetSegmentEffectRedisMeta = RedisMeta<SetSegmentEffectRedisPayload>;
export type SetSegmentEffectRedisAction = SetSegmentEffectAction & SetSegmentEffectRedisMeta;
export function setSegmentEffectRedis(
  action: SetSegmentEffectAction,
): SetSegmentEffectRedisAction {
  const { newEffect, segmentId } = action.payload;
  return {
    ...action,
    ...generateMeta<SetSegmentEffectRedisPayload>({
      segmentId,
      newEffect,
    }),
  };
}
type SetMicroBrightnessRedisMeta = RedisMeta<SetMicroBrightnessRedisPayload>;
export type SetMicroBrightnessRedisAction = SetMicroBrightnessAction & SetMicroBrightnessRedisMeta;
interface SetMicroBrightnessRedisPayload {
  microId: MicroId,
  brightness: number,
}
export function setMicroBrightnessRedis(
  action: SetMicroBrightnessAction,
): SetMicroBrightnessRedisAction {
  const { brightness, microId } = action.payload;
  return {
    ...action,
    ...generateMeta<SetMicroBrightnessRedisPayload>({
      microId,
      brightness,
    }),
  };
}
interface ResizeSegmentsFromBoundariesRedisPayload {
  microId: MicroId;
  segmentBoundaries: number[];
  offsetAndNumLEDs: { offset: number, numLEDs: number }[];

}
type ResizeSegmentsFromBoundariesRedisMeta =
  RedisMeta<ResizeSegmentsFromBoundariesRedisPayload>;
export type ResizeSegmentsFromBoundariesRedisAction =
  ResizeSegmentsFromBoundariesAction & ResizeSegmentsFromBoundariesRedisMeta;
export function resizeSegmentsFromBoundariesRedis(
  action: ResizeSegmentsFromBoundariesAction,
  nextState: RemoteLightsEntity,
): ResizeSegmentsFromBoundariesRedisAction {
  const { microId, segmentBoundaries } = action.payload;
  const { segmentIds } = nextState.micros.byId[microId];
  const offsetAndNumLEDs = segmentIds.map((segmentId) => {
    const { numLEDs, offset } = nextState.segments.byId[segmentId];
    return { numLEDs, offset };
  });
  return {
    ...action,
    ...generateMeta<ResizeSegmentsFromBoundariesRedisPayload>({
      microId,
      offsetAndNumLEDs,
      segmentBoundaries,
    }),
  };
}
