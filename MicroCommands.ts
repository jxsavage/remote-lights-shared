
import { StateMicroAction } from './reducers/remoteLights';
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
export enum GetMicroCommands {
  GET_STATE = 'GET_STATE',
}
export const POSSIBLE_EFFECTS_STRINGS = Object.keys(MicroEffect);
export type MicroCommand = number;
export type MicroCommands = {
  [values in StateMicroAction | GetMicroCommands]: MicroCommand;
};
export const MICRO_COMMAND: MicroCommands = {
  GET_STATE: 1,
  RESET_MICRO: 2,
  SPLIT_SEGMENT: 3,
  SET_BRIGHTNESS: 4,
  MERGE_SEGMENTS: 5,
  SET_SEGMENT_EFFECT: 6,
  RESIZE_SEGMENTS_FROM_BOUNDARIES: 7,
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
