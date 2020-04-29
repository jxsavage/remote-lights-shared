import { MicroActions } from './microcontroller';
import { RemoteLightsEntityActions } from './microsEntity';

export { MicroActionType } from './microcontroller';
export { MicroEntityTypes } from './microsEntity';
export type AllEntityActions =
MicroActions |
RemoteLightsEntityActions;

export type AllActions = AllEntityActions;
