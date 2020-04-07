// eslint-disable-next-line import/no-cycle
import {
  StateOperations, SetBrightnessStatePayload, SetSegmentEffectStatePayload,
  ResizeSegmentsFromBoundariesStatePayload, SplitSegmentStatePayload, MergeSegmentsStatePayload,
} from './reducers/remoteLights';
import { SharedMicroState as MicroState } from './MicroShared';

export default class RemoteLightsStateOperations {
  static setBrightness:
  StateOperations<SetBrightnessStatePayload> = (
    { microId, payload: { brightness } }, byMicroId,
  ) => {
    const micro = { ...byMicroId[microId], brightness };
    const micros = { ...byMicroId, [microId]: micro };
    return { byMicroId: micros };
  };

  static setSegmentEffect:
  StateOperations<SetSegmentEffectStatePayload> = (
    { microId, payload: { segmentIndex, effect } }, byMicroId,
  ) => {
    const { setSegmentEffect } = MicroState;
    const oldMicro = byMicroId[microId];
    const micro = {
      ...oldMicro,
      ...setSegmentEffect(
        segmentIndex, effect, oldMicro.segments,
      ),
    };
    const micros = {
      ...byMicroId, [microId]: micro,
    };
    return { byMicroId: micros };
  };

  static resizeSegmentsFromBoundaries:
  StateOperations<ResizeSegmentsFromBoundariesStatePayload> = (
    { microId, payload: { segmentBoundaries } }, byMicroId,
  ) => {
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

  static splitSegment:
  StateOperations<SplitSegmentStatePayload> = (
    {
      microId, payload: { segmentIndex, direction, newEffect },
    },
    byMicroId,
  ) => {
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

  static mergeSegments:
  StateOperations<MergeSegmentsStatePayload> = (
    { microId, payload: { segmentIndex, direction } }, byMicroId,
  ) => {
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
