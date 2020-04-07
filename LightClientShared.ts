import {
  ByMicroId, SplitSegmentStatePayload,
} from 'Shared/reducers/remoteLights';
import { LightClientSharedState as ClientState } from './MicroTypes';
import { WebEffect, Direction } from './MicroCommands';
import { SharedMicroState as MicroState } from './MicroShared';


export default class LightClientShared {
  clientState: ClientState[];

  constructor(state: ClientState[]) {
    this.clientState = state;
  }

  static setSegmentEffect = (
    microId: string, segmentIndex: number,
    effect: WebEffect, byMicroId: ByMicroId,
  ): {byMicroId: ByMicroId} => {
    const { setSegmentEffect } = MicroState;
    const oldMicro = byMicroId[microId];
    const micro = {
      ...oldMicro,
      ...setSegmentEffect(segmentIndex, effect, oldMicro.segments),
    };

    const micros = {
      ...byMicroId,
      ...{ [microId]: micro },
    };

    return { byMicroId: micros };
  };

  static resizeSegmentsFromBoundaries = (
    microId: string, segmentBoundaries: number[],
    byMicroId: ByMicroId,
  ): {byMicroId: ByMicroId} => {
    const { resizeSegmentsFromBoundaries } = MicroState;
    const oldMicro = byMicroId[microId];
    const { totalLEDs, segments } = oldMicro;
    const segmentsAndBoundaries = resizeSegmentsFromBoundaries(
      segmentBoundaries, segments, totalLEDs,
    );
    const micro = { ...oldMicro, ...segmentsAndBoundaries };
    const micros = {
      ...byMicroId, [microId]: micro,
    };
    return { byMicroId: micros };
  };

  static splitSegment = (
    { microId, payload: {
      segmentIndex,
      direction, newEffect,
    } }: SplitSegmentStatePayload,
    byMicroId: ByMicroId,
  ): {byMicroId: ByMicroId} => {
    const { splitSegment } = MicroState;
    const oldMicro = byMicroId[microId];
    const { segments } = oldMicro;
    const segmentsAndBoundaries = splitSegment(
      segmentIndex, direction, newEffect, segments,
    );
    const micro = { ...oldMicro, ...segmentsAndBoundaries };
    const micros = {
      ...byMicroId, [microId]: micro,
    };
    return { byMicroId: micros };
  };

  static mergeSegments = (
    microId: string, segmentIndex: number,
    direction: Direction, byMicroId: ByMicroId,
  ): {byMicroId: ByMicroId} => {
    const { mergeSegments } = MicroState;
    const oldMicro = byMicroId[microId];
    const { segments, totalLEDs } = oldMicro;
    const segmentsAndBoundaries = mergeSegments(
      segmentIndex, direction, segments, totalLEDs,
    );
    const micro = { ...oldMicro, ...segmentsAndBoundaries };
    const micros = {
      ...byMicroId, [microId]: micro,
    };
    return { byMicroId: micros };
  };
}
