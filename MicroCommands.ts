
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
export const POSSIBLE_EFFECTS_STRINGS = Object.values(MicroEffect).filter((k) => typeof MicroEffect[k as any] === 'number');
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
