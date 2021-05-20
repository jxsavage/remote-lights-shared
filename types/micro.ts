import { MicroActionType } from ".";

export enum MicroCommand {
  RESET = 'RESET_MICRO',
  GET_STATE = 'GET_STATE',
  LOAD_EEPROM = 'LOAD_EEPROM',
  WRITE_EEPROM = 'WRITE_EEPROM',
  RESTORE_DEFAULT = 'RESTORE_DEFAULT',
}
export type MicroCommandNumber = number;
export type MicroCommands = {
  [values in MicroActionType | MicroCommand]: MicroCommandNumber;
};
/**
 * Directly maps to enum in microcontroller.
 * Changes here require changes in microcontroller code.
 */
export const MICRO_COMMAND: MicroCommands = {
  GET_STATE: 1,
  RESET_MICRO: 2,
  SPLIT_SEGMENT: 3,
  SET_MICRO_BRIGHTNESS: 4,
  MERGE_SEGMENTS: 5,
  SET_SEGMENT_EFFECT: 6,
  RESIZE_SEGMENTS_FROM_BOUNDARIES: 7,
  SET_MICRO_ID: 8,
  SET_SEGMENT_ID: 9,
  WRITE_EEPROM: 10,
  LOAD_EEPROM: 11,
  RESTORE_DEFAULT: 12,
};
export const REVERSE_MICRO_COMMAND = Object.keys(MICRO_COMMAND);

export type CommandId = number;
export type CommandHeader = [CommandId, MicroResponseHeader];
export type CommandArray = number[] | [number, number[]];
export type SerialCommand = [CommandHeader, CommandArray];
export type CommandFn<T> = (args: T) => CommandArray;
export type StaticCommandFn = () => CommandArray;

export enum MicroResponseCode {
  ERROR = 130, WARNING, INFO, DEBUG, PING, PONG, COMMAND_SUCCESS, COMMAND_FAILURE,
  TEST, CONFIRM_COMMAND
}

export enum MicroResponseHeader {
  CONFIRM_COMMAND = 1, TEST, SILENT
}