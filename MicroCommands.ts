
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
export const POSSIBLE_EFFECTS_STRINGS = Object.keys(MicroEffect);
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
