import { MicroEffect, Direction } from './MicroCommands';

type MicroId = string;
export interface MicroState {
  microId: MicroId;
  totalLEDs: number;
  brightness: number;
  segments: LEDSegment[];
  segmentBoundaries: number[];
}

export interface LEDSegment {
  offset: number;
  numLEDs: number;
  effect: MicroEffect;
}
