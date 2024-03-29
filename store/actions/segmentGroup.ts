import {
  SegmentGroup, LEDSegment,
} from 'Shared/types';
import { CreateAction, CreateSimpleAction, Action } from './types';
import { generateId } from '../utils';
import { SetSegmentAliasAction } from './microcontroller';

export enum GroupActionType {
  CREATE_GROUP = 'CREATE_GROUP',
  DELETE_GROUP = 'DELETE_GROUP',
  SET_GROUP_ALIAS = 'SET_GROUP_ALIAS',
  SET_GROUP_EFFECT = 'SET_GROUP_EFFECT',
  ADD_SEGMENT_TO_GROUP = 'ADD_SEGMENT_TO_GROUP',
  REMOVE_SEGMENT_FROM_GROUP = 'REMOVE_SEGMENT_FROM_GROUP',
  CHANGE_GROUP_CONTROLS_EFFECT = 'CHANGE_GROUP_CONTROLS_EFFECT',
}

const {
  CREATE_GROUP, DELETE_GROUP, ADD_SEGMENT_TO_GROUP, REMOVE_SEGMENT_FROM_GROUP,
  CHANGE_GROUP_CONTROLS_EFFECT, SET_GROUP_EFFECT, SET_GROUP_ALIAS,
} = GroupActionType;

/**
 * Set Group Alias
 */
export interface SetGroupAliasPayload {
  groupId: number;
  newGroupAlias: string;
}
export interface SetGroupAliasAction {
  type: typeof SET_GROUP_ALIAS;
  payload: SetGroupAliasPayload
}
export const setGroupAlias:
CreateAction<SetGroupAliasPayload, SetGroupAliasAction> = (
  payload,
) => ({ type: SET_GROUP_ALIAS, payload });
/**
 * Set Group Effect
 */
export interface SetGroupEffectPayload {
  groupId: SegmentGroup['segmentGroupId'];
  newEffect: SegmentGroup['groupEffect'];
}

interface SetGroupEffectAction extends Action<typeof SET_GROUP_EFFECT> {
  payload: SetGroupEffectPayload;
}

export const setGroupEffect:
CreateAction<SetGroupEffectPayload, SetGroupEffectAction> = (payload) => ({
  type: SET_GROUP_EFFECT,
  payload,
});

/**
 * Change Group Controls Effect
 */
export interface ChangeGroupControlsEffectPayload {
  groupId: SegmentGroup['segmentGroupId'];
  controlsEffect: SegmentGroup['controlsEffect'];
}

interface ChangeGroupControlsEffectAction extends Action<typeof CHANGE_GROUP_CONTROLS_EFFECT> {
  payload: ChangeGroupControlsEffectPayload;
}

export const changeGroupControlsEffect:
CreateAction<ChangeGroupControlsEffectPayload, ChangeGroupControlsEffectAction> = (payload) => ({
  type: CHANGE_GROUP_CONTROLS_EFFECT,
  payload,
});
/**
 * Create Segment Group
 */
export interface CreateGroupPayload {
  newGroupId: SegmentGroup['segmentGroupId'];
}

interface CreateGroupAction extends Action<typeof CREATE_GROUP> {
  payload: CreateGroupPayload;
}

export const createGroup:
CreateSimpleAction<CreateGroupAction> = () => {
  const newGroupId = generateId();
  return {
    type: CREATE_GROUP,
    payload: { newGroupId },
  };
};

/**
 * Delete Group
 */
export interface DeleteGroupPayload {
  groupId: SegmentGroup['segmentGroupId'];
}

interface DeleteGroupAction extends Action<typeof DELETE_GROUP> {
  payload: DeleteGroupPayload;
}

export const deleteGroup:
CreateAction<DeleteGroupPayload, DeleteGroupAction> = (payload) => ({
  type: DELETE_GROUP,
  payload,
});

/**
 * Add Segment to Group
 */
export interface AddSegmentToGroupPayload {
  groupId: SegmentGroup['segmentGroupId'];
  segmentId: LEDSegment['segmentId'];
}

interface AddSegmentToGroupAction extends Action<typeof ADD_SEGMENT_TO_GROUP> {
  payload: AddSegmentToGroupPayload;
}

export const addSegmentToGroup:
CreateAction<AddSegmentToGroupPayload, AddSegmentToGroupAction> = (payload) => ({
  type: ADD_SEGMENT_TO_GROUP,
  payload,
});

/**
 * Add Segment to Group
 */
export interface RemoveSegmentFromGroupPayload {
  groupId: SegmentGroup['segmentGroupId'];
  segmentId: LEDSegment['segmentId'];
}

interface RemovesegmentfromGroupAction extends Action<typeof REMOVE_SEGMENT_FROM_GROUP> {
  payload: RemoveSegmentFromGroupPayload;
}

export const removeSegmentFromGroup:
CreateAction<RemoveSegmentFromGroupPayload, RemovesegmentfromGroupAction> = (payload) => ({
  type: REMOVE_SEGMENT_FROM_GROUP,
  payload,
});

export type SegmentGroupActions =
CreateGroupAction |
DeleteGroupAction |
SetGroupAliasAction |
SetGroupEffectAction |
AddSegmentToGroupAction |
RemovesegmentfromGroupAction |
ChangeGroupControlsEffectAction;
