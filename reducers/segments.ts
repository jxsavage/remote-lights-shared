import { WebMicroInfo } from 'src/Shared/MicroTypes';
import { Direction, WebEffect } from 'src/Shared/MicroCommands';
import { SegmentOperations } from 'src/Shared/LightClientShared';
enum SegmentAction {
  SPLIT = 'SPLIT_SEGMENT',
  MERGE = 'MERGE_SEGMENTS',
  SET_EFFECT = 'SET_SEGMENT_EFFECT',
  SET_BRIGHTNESS = 'SET_BRIGHTNESS',
  RESIZE_FROM_BOUNDARIES = 'RESIZE_SEGMENTS_FROM_BOUNDARIES',
}

export type ByMicroId = {
  [key: string]: WebMicroInfo;
}
export interface IRemoteLightsState {
  allMicroIds: string[];
  byMicroId: ByMicroId;
}

/*
* Split Segment Action Specs
*/
export interface ISplitSegmentPayload {
  microId: string, segmentIndex: number,
  direction: Direction, newEffect: WebEffect
}
interface ISplitSegmentAction {
  type: SegmentAction.SPLIT;
  payload: ISplitSegmentPayload;
}
/*
* Merge Segments Action Specs
*/
export interface IMergeSegmentsPayload {
  microId: string, segmentIndex: number,
  direction: Direction
}
interface IMergeSegmentsAction {
  type: SegmentAction.MERGE;
  payload: IMergeSegmentsPayload;
}
/*
* Set Segment Effect Action Specs
*/
export interface ISetSegmentEffectPayload {
  microId: string, segmentIndex: number,
  direction: Direction, effect: WebEffect
}
interface ISetSegmentEffectAction {
  type: SegmentAction.SET_EFFECT;
  payload: ISetSegmentEffectPayload;
}
/*
* Set Brightness Effect Action Specs
*/
export interface ISetBrightnessPayload {
  microId: string, brightness: number
}
interface ISetBrightnessAction {
  type: SegmentAction.SET_BRIGHTNESS;
  payload: ISetBrightnessPayload;
}
/*
* Resize Segments From Boundaries Action Specs
*/
export interface IResizeSegmentsFromBoundariesPayload {
  microId: string,
  segmentBoundaries: number[]
}
interface IResizeSegmentsFromBoundariesAction {
  type: SegmentAction.RESIZE_FROM_BOUNDARIES,
  payload: IResizeSegmentsFromBoundariesPayload;
}
type TSegmentActions = 
  ISplitSegmentAction |
  IMergeSegmentsAction |
  ISetBrightnessAction |
  ISetSegmentEffectAction |
  IResizeSegmentsFromBoundariesAction;
type TSegmentPayloads =
  ISplitSegmentPayload |
  IMergeSegmentsPayload |
  ISetBrightnessPayload |
  ISetSegmentEffectPayload |
  IResizeSegmentsFromBoundariesPayload;
interface FSegmentReducers<T extends TSegmentActions> {
  (state: IRemoteLightsState, action: T): IRemoteLightsState;
}
export interface FSegmentOperations<T extends TSegmentPayloads> {
  (payload: T, byMicroId: ByMicroId): {byMicroId: ByMicroId};
}
interface FSegmentActionCreator
<Payload extends TSegmentPayloads,
  Action extends TSegmentActions> {
  (payload: Payload): Action
}
const initialState: IRemoteLightsState = {
  allMicroIds: [],
  byMicroId: {}
}
const {MERGE, SPLIT, SET_EFFECT, SET_BRIGHTNESS, RESIZE_FROM_BOUNDARIES} = SegmentAction;
/*
* Segment Actions
*/
export const splitSegment:
FSegmentActionCreator<
  ISplitSegmentPayload, ISplitSegmentAction
> = (payload) => {
  return { type: SPLIT, payload}
}
export const mergeSegments:
FSegmentActionCreator<
  IMergeSegmentsPayload, IMergeSegmentsAction
> = (payload) => {
  return { type: MERGE, payload}
}
export const setSegmentEffect:
FSegmentActionCreator<
  ISetSegmentEffectPayload, ISetSegmentEffectAction
> = (payload) => {
  return { type: SET_EFFECT, payload}
}
export const setBrightness:
FSegmentActionCreator<
  ISetBrightnessPayload, ISetBrightnessAction
> = (payload) => {
  return { type: SET_BRIGHTNESS, payload}
}
export const resizeSegmentsFromBoundaries:
FSegmentActionCreator<
  IResizeSegmentsFromBoundariesPayload, IResizeSegmentsFromBoundariesAction
> = (payload) => {
  return { type: RESIZE_FROM_BOUNDARIES, payload}
}

/*
* Segment Reducer
* 
*/
const segments: FSegmentReducers<TSegmentActions> = 
(state = initialState, action) => {
  switch(action.type) {
    case SPLIT:
      return splitSegmentReducer(state, action);
    case MERGE:
      return mergeSegmentsReducer(state, action);
    case SET_EFFECT:
      return setSegmentEffectReducer(state, action);
    case SET_BRIGHTNESS:
      return setBrightnessReducer(state, action);
    case RESIZE_FROM_BOUNDARIES:
      return resizeSegmentsFromBoundariesReducer(state, action);
    default:
      return state;
  }
}

const splitSegmentReducer: FSegmentReducers<ISplitSegmentAction> =
(state, {payload}) => {
  return {
    ...state,
    ...SegmentOperations.splitSegment(payload, state.byMicroId)
  }
}
const mergeSegmentsReducer: FSegmentReducers<IMergeSegmentsAction> =
(state, {payload}) => {
  return {
    ...state,
    ...SegmentOperations.mergeSegments(payload, state.byMicroId)
  }
}
const setSegmentEffectReducer: FSegmentReducers<ISetSegmentEffectAction> =
(state, {payload}) => {
  return {
    ...state,
    ...SegmentOperations.setSegmentEffect(payload, state.byMicroId)
  }
}
const setBrightnessReducer: FSegmentReducers<ISetBrightnessAction> =
(state, {payload}) => {
  return {
    ...state,
    ...SegmentOperations.setBrightness(payload, state.byMicroId)
  }
}
const resizeSegmentsFromBoundariesReducer: FSegmentReducers<IResizeSegmentsFromBoundariesAction> =
(state, {payload}) => {
  return {
    ...state,
    ...SegmentOperations.resizeSegmentsFromBoundaries(payload, state.byMicroId)
  }
}

export default segments;
