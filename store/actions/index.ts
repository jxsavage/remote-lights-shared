import { MicroActions } from './microcontroller';
import { RemoteLightsEntityActions } from './microsEntity';
import { SegmentGroupActions } from './segmentGroup';

export { MicroActionType, MICRO_COMMAND } from './microcontroller';
export { MicroEntityActionType } from './microsEntity';
export { GroupActionType } from './segmentGroup';

export type AllEntityActions =
MicroActions |
SegmentGroupActions |
RemoteLightsEntityActions;

export type AllActions = AllEntityActions;