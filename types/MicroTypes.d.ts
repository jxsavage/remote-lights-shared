export interface BaseMicroResponse {
  prop: MicroCommand;
  client: string;
}
export interface MicroBrightnessResponse
  extends BaseMicroResponse {
  value: number;
}
export interface WebMicroInfo {
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

export enum WebEffect {
  ColorWaves = 'ColorWaves',
  BlendWave = 'BlendWave'
}
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
export enum MicroCommand {
  Brightness,
  Effect,
  Info,
  Segment
}
export enum MicroMethod {
  Get,
  Set
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