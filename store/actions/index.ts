import { MicroActions } from './microcontroller';
import { RemoteLightsEntityActions } from './microsEntity';
import { SegmentGroupActions } from './segmentGroup';

export * from './microcontroller';
export * from './microsEntity';
export * from './segmentGroup';
export * from './types';

export type AllEntityActions =
MicroActions |
SegmentGroupActions |
RemoteLightsEntityActions;

export type AllActions = AllEntityActions;