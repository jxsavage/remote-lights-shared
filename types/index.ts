/* eslint-disable @typescript-eslint/no-shadow */
export enum MicroActionType {
  RESET_MICRO = 'RESET_MICRO',
  SET_MICRO_ID = 'SET_MICRO_ID',
  SPLIT_SEGMENT = 'SPLIT_SEGMENT',
  MERGE_SEGMENTS = 'MERGE_SEGMENTS',
  SET_SEGMENT_ID = 'SET_SEGMENT_ID',
  SET_SEGMENT_EFFECT = 'SET_SEGMENT_EFFECT',
  SET_MICRO_BRIGHTNESS = 'SET_MICRO_BRIGHTNESS',
  RESIZE_SEGMENTS_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES',
  WRITE_EEPROM = 'WRITE_EEPROM',
}


export enum MicroEffect {
  ColorWaves,
  BlendWave,
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POSSIBLE_EFFECTS_STRINGS = Object.values(MicroEffect).filter((k) => typeof MicroEffect[k as any] === 'number');
export enum Direction {
  Left,
  Right,
}
/**
 * Segment Definitions
 */
export type Offset = number;
export type NumLEDs = number;
export type SegmentId = number;
export interface LEDSegment {
  offset: Offset;
  numLEDs: NumLEDs;
  effect: MicroEffect;
  effectControlledBy: SegmentGroupId;
  segmentId: SegmentId;
  microId: MicroId;
}
/**
 * Microcontroller Definitions
 */
export type MicroId = number;
export type TotalLEDs = number;
export type Brightness = number;
export interface MicroState {
  microId: MicroId;
  totalLEDs: TotalLEDs;
  brightness: Brightness;
  segmentIds: SegmentId[];
  segmentBoundaries: number[];
}
/**
 * Microcontroller Response Definitions
 */
export type SegmentResponse = [
  Offset, NumLEDs, MicroEffect, SegmentId,
];
type CommandId = number;
export type MicroStateResponse = [
  MicroId, TotalLEDs, Brightness, SegmentResponse[],
];
/**
 * Micro Enitity Definitions
 */
export type MicroById = {
  [key: string]: MicroState;
};
export type AllMicroIds = MicroId[];
export type MicroEntity = {
  byId: MicroById;
  allIds: AllMicroIds;
};
/**
 * Segment Entity Definitions
 */
export type SegmentById = {
  [key: string]: LEDSegment;
};
export type AllSegmentIds = SegmentId[];
export type SegmentEntity = {
  byId: SegmentById;
  allIds: AllSegmentIds;
};
/**
 * Segment Group Enitity Definitions
 */
export type SegmentGroupId = number;
export interface SegmentGroup {
  segmentIds: SegmentId[];
  segmentGroupId: SegmentGroupId;
  groupEffect: MicroEffect | null;
  controlsEffect: boolean;
}
export type SegmentGroupIds = SegmentGroupId[];
export type SegmentGroupById = {
  [key: number]: SegmentGroup;
};
export type SegmentGroupEntity = {
  byId: SegmentGroupById;
  allIds: SegmentGroupIds;
};
/**
 * Combined Entity Definitions
 */
export interface MicrosAndSegmentsEntity {
  micros: MicroEntity;
  segments: SegmentEntity;
}
export interface SegmentsAndGroupsEntity {
  segments: SegmentEntity;
  segmentGroups: SegmentGroupEntity;
}
export interface RemoteLightsEntity extends MicrosAndSegmentsEntity {
  segmentGroups: SegmentGroupEntity;
}

export const initialState: RemoteLightsEntity = {
  micros: {
    byId: {},
    allIds: [],
  },
  segments: {
    byId: {},
    allIds: [],
  },
  segmentGroups: {
    byId: {},
    allIds: [],
  },
};
/*
 *
 * REDIS TYPES
 *
 */

export type RedisSetOrList = string[];
/*
* Microcontroller Types
*/
export type RedisAllMicroIdsSet = RedisSetOrList;
export type RedisMicroLEDSegmentsList = RedisSetOrList;
export type RedisMicroLEDSegmentsBoundaries = RedisSetOrList;
export enum RedisMicroHashField {
  microId = 'microId',
  totalLEDs = 'totalLEDs',
  brightness = 'brightness',
}
export type RedisMicroHash = {
  [key in keyof typeof RedisMicroHashField]: string | number;
};
const {
  microId, totalLEDs, brightness,
} = RedisMicroHashField;
export const AllRedisMicroHashFields = [
  microId, totalLEDs, brightness,
];
/*
* Segment Types
*/
export type RedisAllLEDSegmentIdsSet = RedisSetOrList;
export enum RedisLEDSegmentHashField {
  effect = 'effect',
  offset = 'offset',
  microId = 'microId',
  numLEDs = 'numLEDs',
  segmentId = 'segmentId',
  effectControlledBy = 'effectControlledBy',
}
export type RedisLEDSegmentHash = {
  [key in keyof typeof RedisLEDSegmentHashField]: string | number;
};
const {
  effect, offset, numLEDs, segmentId, effectControlledBy,
} = RedisLEDSegmentHashField;
export const AllRedisLEDHashFields = [
  effect, offset, microId, numLEDs, segmentId, effectControlledBy,
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RedisExecResults = Promise<[Error | null, any][]>;
