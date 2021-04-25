/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Direction, MicroEffect,
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
  const { before, after, action } = testData.setBrightness;
  expect(
    setMicroBrightnessReducer(before(), action.payload),
  ).toEqual(after());
});
test('setting a segments effect.', () => {
  const { before, after, action } = testData.setSegmentEffectData;
  expect(
    setSegmentEffectReducer(before(), action.payload),
  ).toEqual(after());
});
test('splitting a segment to the left.', () => {
  const { before, after, action } = testData.splitSegmentLeft;

  expect(
    splitSegmentReducer(before(), action.payload),
  ).toEqual(after());
});
test('splitting a segment to the right.', () => {
  const { before, after, action } = testData.splitSegmentRight;

  expect(
    splitSegmentReducer(before(), action.payload),
  ).toEqual(after());
});
test('merging a segment with the one on the right.', () => {
  const { before, after, action } = testData.mergeSegmentsRight;

  expect(
    mergeSegmentsReducer(before(), action.payload),
  ).toEqual(after());
});
test('merging a segment with the one on the left.', () => {
  const { before, after, action } = testData.mergeSegmentsLeft;

  expect(
    mergeSegmentsReducer(before(), action.payload),
  ).toEqual(after());
});
