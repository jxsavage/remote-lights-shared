/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Direction,
  MicroEffect, MicroEntity, RemoteLightsEntity, SegmentEntity,
} from 'Shared/types';
import testData from 'Shared/test';
import {
  mergeSegments, setMicroBrightness, setSegmentEffect, splitSegment,
} from '../actions';
import {
  mergeSegmentsReducer, setMicroBrightnessReducer,
  setSegmentEffectReducer, splitSegmentReducer,
} from './microcontroller';

test('setting a microcontrollers brightness.', () => {
  const { before, after } = testData.setBrightness;
  const action = setMicroBrightness({ microId: 1111329336, brightness: 21 });
  expect(
    setMicroBrightnessReducer(before(), action.payload),
  ).toEqual(after());
});
test('setting a segments effect.', () => {
  const { before, after } = testData.setSegmentEffect;
  const action = setSegmentEffect({
    microId: 1111329336, newEffect: MicroEffect.ColorWaves, segmentId: 358174915,
  });
  expect(
    setSegmentEffectReducer(before(), action.payload),
  ).toEqual(after());
});
test('splitting a segment to the left.', () => {
  const { before, after } = testData.splitSegmentLeft;
  const action = splitSegment({
    microId: 1111329336,
    segmentId: 358174915,
    direction: Direction.Left,
    newEffect: MicroEffect.ColorWaves,
    forceNewId: 402030797,
  });
  expect(
    splitSegmentReducer(before(), action.payload),
  ).toEqual(after());
});
test('splitting a segment to the right.', () => {
  const { before, after } = testData.splitSegmentRight;
  const action = splitSegment({
    direction: Direction.Right,
    newEffect: MicroEffect.BlendWave,
    microId: 1111329336,
    segmentId: 1863146864,
    forceNewId: 1347786750,
  });
  expect(
    splitSegmentReducer(before(), action.payload),
  ).toEqual(after());
});
test('merging a segment with the one on the right.', () => {
  const { before, after } = testData.mergeSegmentsRight;
  const action = mergeSegments({
    direction: Direction.Right,
    microId: 1111329336,
    segmentId: 358174915,
  });
  expect(
    mergeSegmentsReducer(before(), action.payload),
  ).toEqual(after());
});
test('merging a segment with the one on the left.', () => {
  const { before, after } = testData.mergeSegmentsLeft;
  const action = mergeSegments({
    direction: Direction.Left,
    microId: 1111329336,
    segmentId: 1863146864,
  });
  expect(
    mergeSegmentsReducer(before(), action.payload),
  ).toEqual(after());
});
