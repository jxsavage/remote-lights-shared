import { LightClientSharedState as ClientState, WebMicroInfo } from "./MicroTypes";
import { WebEffect, Direction } from "./MicroCommands";
import { SharedMicroState as MicroState } from "./MicroShared";
import { ByMicroId, ISplitSegmentPayload, FSegmentOperations, IMergeSegmentsPayload, IResizeSegmentsFromBoundariesPayload, ISetSegmentEffectPayload, ISetBrightnessPayload } from "src/Shared/reducers/segments";


export class LightClientShared {
  clientState: ClientState[];
  constructor(state: ClientState[]) {
    this.clientState = state;
  }
  static setSegmentEffect = (
    microId: string, segmentIndex: number, 
    effect: WebEffect, byMicroId: ByMicroId
  ) => {
    const {setSegmentEffect} = MicroState;
    const oldMicro = byMicroId[microId];
    const micro = Object.assign(
      {}, oldMicro,
      setSegmentEffect(
        segmentIndex, effect, oldMicro.segments));
    
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
  static resizeSegmentsFromBoundaries = (
    microId: string, segmentBoundaries: number[],
    byMicroId: ByMicroId
  ) => {
    const {resizeSegmentsFromBoundaries} = MicroState;
    const oldMicro = byMicroId[microId];
    const {totalLEDs, segments} = oldMicro;
    const segmentsAndBoundaries =
          resizeSegmentsFromBoundaries(
            segmentBoundaries, segments, totalLEDs);
    const micro = Object.assign(
      {}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {micros};

  }
  static splitSegment = (
    {microId, segmentIndex,
    direction, newEffect}: ISplitSegmentPayload,
    byMicroId: ByMicroId
  ) => {
    const {splitSegment} = MicroState;
    const oldMicro = byMicroId[microId];
    const {segments} = oldMicro;
    const segmentsAndBoundaries =
      splitSegment(
        segmentIndex, direction, newEffect, segments);
    const micro = Object.assign(
      {}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
  static mergeSegments = (
    microId: string, segmentIndex: number,
    direction: Direction, byMicroId: ByMicroId
  ) => {
    const {mergeSegments} = MicroState;
    const oldMicro = byMicroId[microId];
    const {segments, totalLEDs} = oldMicro;
    const segmentsAndBoundaries =
      mergeSegments(
        segmentIndex, direction, segments, totalLEDs);
    const micro = Object.assign({}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
}

export class SegmentOperations {
  static setBrightness:
  FSegmentOperations<ISetBrightnessPayload> = (
    {microId, brightness}, byMicroId
  ) => {
    const micro = Object.assign({}, byMicroId[microId], {brightness});
    const micros = Object.assign({}, 
      byMicroId, {[microId]: micro});
    return {byMicroId: micros};
  }
  static setSegmentEffect:
  FSegmentOperations<ISetSegmentEffectPayload> = (
    {microId, segmentIndex, effect}, byMicroId
  ) => {
    const {setSegmentEffect} = MicroState;
    const oldMicro = byMicroId[microId];
    const micro = Object.assign(
      {}, oldMicro,
      setSegmentEffect(
        segmentIndex, effect, oldMicro.segments));
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
  static resizeSegmentsFromBoundaries:
  FSegmentOperations<IResizeSegmentsFromBoundariesPayload> = (
    {microId, segmentBoundaries}, byMicroId
  ) => {
    const {resizeSegmentsFromBoundaries} = MicroState;
    const oldMicro = byMicroId[microId];
    const {totalLEDs, segments} = oldMicro;
    const segmentsAndBoundaries =
          resizeSegmentsFromBoundaries(
            segmentBoundaries, segments, totalLEDs);
    const micro = Object.assign(
      {}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};

  }
  static splitSegment:
  FSegmentOperations<ISplitSegmentPayload> = (
    {microId, segmentIndex, direction, newEffect},
    byMicroId
  ) => {
    const {splitSegment} = MicroState;
    const oldMicro = byMicroId[microId];
    const {segments} = oldMicro;
    const segmentsAndBoundaries =
      splitSegment(
        segmentIndex, direction, newEffect, segments);
    const micro = Object.assign(
      {}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
  static mergeSegments:
  FSegmentOperations<IMergeSegmentsPayload> = (
    {microId, segmentIndex, direction}, byMicroId
  ) => {
    const {mergeSegments} = MicroState;
    const oldMicro = byMicroId[microId];
    const {segments, totalLEDs} = oldMicro;
    const segmentsAndBoundaries =
      mergeSegments(
        segmentIndex, direction, segments, totalLEDs);
    const micro = Object.assign({}, oldMicro, segmentsAndBoundaries);
    const micros = Object.assign(
      {}, byMicroId, {[microId]: micro}
    );
    return {byMicroId: micros};
  }
}