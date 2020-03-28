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
  Segment,
  Info,
  
}
export enum SegmentCommand {
  Effect,
  Merge,
  Split
}
export enum MicroMethod {
  Get,
  Set
}
export enum Direction {
  Left,
  Right
}