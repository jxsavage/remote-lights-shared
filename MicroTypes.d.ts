import { WebEffect } from "./MicroCommands";

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
export interface BaseToServerEmit {
  socketId: string,
  microId: string
}
export interface BrightnessToServerEmit
extends BaseToServerEmit {
  brightness: number;
}
export interface SetSegmentEffectQuery {
  effect: WebEffect,
  segment: number,
}