
import { StateMicroAction } from './reducers/remoteLights';
export enum MicroEffect {
  ColorWaves,
  BlendWave
}
export const POSSIBLE_EFFECTS_STRINGS = Object.values(MicroEffect).filter((k) => typeof MicroEffect[k as any] === 'number');
export enum GetMicroCommands {
  GET_STATE = 'GET_STATE',
}
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
export enum Direction {
  Left,
  Right
}
