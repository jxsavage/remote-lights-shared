export interface WebMicroInfo {
  totalLEDs: number;
  segments: WebMicroSegment[];
}
export interface ControllerMicroInfo {
  totalLEDs: number;
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
export enum MicroCommands {
  
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