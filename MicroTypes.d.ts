import { WebEffect, Direction } from './MicroCommands';

export interface LightClientSharedState {
  clientId: string;
  micros: WebMicroInfo[];
}
export interface MergeSegments {
  (index: number, direction: Direction): void;
}
export interface SplitSegment {
  (index: number, direction: Direction, effect: WebEffect): void;
}
export interface BaseMicroResponse {
  prop: MicroCommand;
  client: string;
}
export interface MicroBrightnessResponse
  extends BaseMicroResponse {
  value: number;
}
export interface WebMicroInfo {
  id: string;
  totalLEDs: number;
  brightness: number;
  segments: WebMicroSegment[];
  segmentBoundaries: number[];
}
export interface ReactMicroInfoState
  extends WebMicroInfo {
  segmentBoundaries: number[];
}
export interface MicroInfoResponse
  extends BaseMicroResponse {
  totalLEDs: number;
  brightness: number;
  segments: ControllerMicroSegment[];
}

export interface WebMicroSegment {
  offset: number;
  numLEDs: number;
  effect: WebEffect;
}
export interface ControllerMicroSegment {
  offset: number;
  numLEDs: number;
  effect: MicroEffect;
}
export interface BaseBody {
  microId: string;
}
export interface BaseToServerEmit {
  socketId: string;
  body: BaseBody;
}
export interface BrightnessBody
  extends BaseBody {
  brightness: number;
}
export interface BrightnessToServerEmit
  extends BaseToServerEmit {
  body: BrightnessBody;
}
export interface InfoToServerEmitBody
  extends BaseToServerEmitBody {
  body: WebMicroInfo;
}
export interface SetSegmentEffectQuery
  extends BaseToServerEmitBody {
  effect: WebEffect;
  segment: number;
}
