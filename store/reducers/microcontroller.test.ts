/* eslint-disable @typescript-eslint/no-use-before-define */
import testData from 'Shared/test';
import {
  mergeSegmentsReducer, resizeSegmentsFromBoundariesReducer, setMicroBrightnessReducer,
  setSegmentEffectReducer, splitSegmentReducer, setMicroAliasReducer, setSegmentAliasReducer,
} from './microcontroller';

describe('the functionality of a microcontroller reducer', () => {
  test('setting a microcontrollers brightness.', () => {
    const { before, after, action } = testData.setBrightness;
    expect(
      setMicroBrightnessReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('setting a segments effect.', () => {
    const { before, after, action } = testData.setSegmentEffect;
    expect(
      setSegmentEffectReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('splitting a segment to the left edge.', () => {
    const { before, after, action } = testData.splitSegment.left.edge;
    expect(
      splitSegmentReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('splitting a segment to the right edge.', () => {
    const { before, after, action } = testData.splitSegment.right.edge;
    expect(
      splitSegmentReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('merging a segment with the one on the right.', () => {
    const { before, after, action } = testData.mergeSegments.right;
    expect(
      mergeSegmentsReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('merging a segment with the one on the left.', () => {
    const { before, after, action } = testData.mergeSegments.left;
    expect(
      mergeSegmentsReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('resizing a micros segments based on boundaries provided', () => {
    const { before, after, action } = testData.resizeSegmentsFromBoundaries;
    expect(
      resizeSegmentsFromBoundariesReducer(before(), action.payload),
    ).toEqual(after());
  });
  test('setting a micros alias', () => {

  });
});
