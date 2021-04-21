import { SocketDestination, SocketSource } from "Shared/socket";

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
 * Light Client Definitions
 */
type ClientId = string;
export interface LightClientState {
  clientId: ClientId;
  microIds: MicroId[];
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

interface EmittableActionSocketMeta {
  shouldEmit: boolean;
  hasEmitted: boolean;
  source: SocketSource;
  destination: string | SocketDestination;
}
export interface EmittableAction {
  meta: {
    socket: EmittableActionSocketMeta;
  };
}
