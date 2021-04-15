import {
  AddSegmentToGroupPayload, RemoveSegmentFromGroupPayload,
  CreateGroupPayload, DeleteGroupPayload, ChangeGroupControlsEffectPayload, SetGroupEffectPayload,
} from '../actions/segmentGroup';
import {
  SegmentGroupEntity, SegmentsAndGroupsEntity, SegmentEntity, MicroEffect,
} from '../types';

export function setGroupEffectReducer(
  { segments, segmentGroups }: SegmentsAndGroupsEntity,
  { groupId, newEffect }: SetGroupEffectPayload,
): SegmentsAndGroupsEntity {
  const group = segmentGroups.byId[groupId];
  const groupSegmentsById = group.segmentIds.reduce((newById, segId) => {
    // eslint-disable-next-line no-param-reassign
    newById[segId] = {
      ...segments.byId[segId],
      effect: (newEffect as MicroEffect),
    };
    return newById;
  }, {} as SegmentEntity['byId']);
  return {
    segments: {
      byId: {
        ...segments.byId,
        ...groupSegmentsById,
      },
      allIds: segments.allIds,
    },
    segmentGroups: {
      byId: {
        ...segmentGroups.byId,
        [groupId]: {
          ...group,
          groupEffect: newEffect,
        },
      },
      allIds: segmentGroups.allIds,
    },
  };
}

export function changeGroupControlsEffectReducer(
  { segments, segmentGroups }: SegmentsAndGroupsEntity,
  { groupId, controlsEffect }: ChangeGroupControlsEffectPayload,
): SegmentsAndGroupsEntity {
  const group = segmentGroups.byId[groupId];
  const changedSegmentsById = group.segmentIds.reduce((segsById, segmentId) => {
    // eslint-disable-next-line no-param-reassign
    segsById[segmentId] = {
      ...segments.byId[segmentId],
      effectControlledBy: controlsEffect ? groupId : 0,
    };
    return segsById;
  }, {} as SegmentsAndGroupsEntity['segments']['byId']);
  return {
    segments: {
      byId: {
        ...segments.byId,
        ...changedSegmentsById,
      },
      allIds: segments.allIds,
    },
    segmentGroups: {
      byId: {
        ...segmentGroups.byId,
        [groupId]: {
          ...group,
          controlsEffect,
        },
      },
      allIds: segmentGroups.allIds,
    },
  };
}

export function addSegmentToGroupReducer(
  { byId, allIds }: SegmentGroupEntity,
  { groupId, segmentId }: AddSegmentToGroupPayload,
): SegmentGroupEntity {
  const group = byId[groupId];
  return {
    byId: {
      ...byId,
      [groupId]: {
        ...group,
        segmentIds: group.segmentIds.concat(segmentId),
      },
    },
    allIds,
  };
}

export function removeSegmentFromGroupReducer(
  { byId, allIds }: SegmentGroupEntity,
  { groupId, segmentId }: RemoveSegmentFromGroupPayload,
): SegmentGroupEntity {
  const group = byId[groupId];
  return {
    byId: {
      ...byId,
      [groupId]: {
        ...group,
        segmentIds: group.segmentIds.filter((segId) => segId !== segmentId),
      },
    },
    allIds,
  };
}

export function createGroupReducer(
  { byId, allIds }: SegmentGroupEntity,
  { newGroupId }: CreateGroupPayload,
): SegmentGroupEntity {
  return {
    byId: {
      ...byId,
      [newGroupId]: {
        segmentIds: [],
        groupEffect: null,
        controlsEffect: false,
        segmentGroupId: newGroupId,
      },
    },
    allIds: allIds.concat(newGroupId),
  };
}

export function deleteGroupReducer(
  groups: SegmentGroupEntity,
  { groupId }: DeleteGroupPayload,
): SegmentGroupEntity {
  const allIds = groups.allIds.filter((grpId) => grpId !== groupId);
  const byId = allIds.reduce((newById, grpId) => {
    // eslint-disable-next-line no-param-reassign
    newById[grpId] = groups.byId[grpId];
    return newById;
  }, {} as SegmentGroupEntity['byId']);
  return { byId, allIds };
}
