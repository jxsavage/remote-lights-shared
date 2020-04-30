import { MicroActions } from './microcontroller';
import { RemoteLightsEntityActions } from './microsEntity';

export { MicroActionType, MICRO_COMMAND } from './microcontroller';
export { MicroEntityTypes } from './microsEntity';
export type AllEntityActions =
MicroActions |
RemoteLightsEntityActions;

export type AllActions = AllEntityActions;
