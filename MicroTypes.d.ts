import { MicroEffect, MicroCommands } from './MicroCommands';

export type MicroId = number;
export type TotalLEDs = number;
export type Brightness = number;

export interface MicroState {
  microId: MicroId;
  totalLEDs: TotalLEDs;
  brightness: Brightness;
  segments: LEDSegment[];
  segmentBoundaries: number[];
}

export type Offset = number;
export type NumLEDs = number;
export type SegmentId = number;
export interface LEDSegment {
  offset: Offset;
  numLEDs: NumLEDs;
  effect: MicroEffect;
  segmentId: SegmentId;
}
