
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POSSIBLE_EFFECTS_STRINGS = Object.values(MicroEffect).filter((k) => typeof MicroEffect[k as any] === 'number');
export enum Direction {
  Left,
  Right
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
  segments: SegmentId[];
  segmentBoundaries: number[];
}
/**
 * Microcontroller Response Definitions
 */
type MicroCommand = number;
export type SegmentResponse = [
  Offset, NumLEDs, MicroEffect, SegmentId,
];
export type MicroStateResponse = [
  MicroCommand, MicroId, TotalLEDs, Brightness, SegmentResponse[],
];
/**
 * Micro Enitity Definitions
 */
export type MicroById = {
  [key: number]: MicroState;
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
  [key: number]: LEDSegment;
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
export type SegmentGroup = {
  segments: SegmentId[];
  segmentGroupId: SegmentGroupId;
};
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
export interface RemoteLightsMicros {
  micros: MicroEntity;
  segments: SegmentEntity;
}
export interface RemoteLightsEntity extends RemoteLightsMicros {
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
