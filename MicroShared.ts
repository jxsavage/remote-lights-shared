/* eslint-disable max-classes-per-file */
import {
  WebMicroInfo, ControllerMicroSegment,
  WebMicroSegment, BrightnessToServerEmit, MicroInfoResponse,
} from './MicroTypes';
import { MicroEffect, WebEffect, Direction } from './MicroCommands';

export class SharedMicroState {
  microState: WebMicroInfo;

  segmentBoundaries!: number[];

  constructor(microInfo: WebMicroInfo) {
    this.microState = microInfo;
    this.calculateSegmentBoundaries();
  }

  getSegments = () => this.microState.segments;

  getBrightness = () => this.microState.brightness;

  setBrightness = (brightness: number) => {
    this.microState.brightness = brightness;
  };

  static setBrightness = (brightness: number) => {

  };

  setSegmentEffect = (index: number, effect: WebEffect) => {
    this.getSegment(index).effect = effect;
  };

  static setSegmentEffect = (index: number, effect: WebEffect, oldSegments: WebMicroSegment[]) => {
    const { createSegment } = SharedMicroState;
    const segments = oldSegments.map((segment, i) => {
      if (index !== i) {
        return segment;
      }
      const { offset, numLEDs } = segment;
      return createSegment(offset, numLEDs, effect);
    });
    return { segments };
  };

  getTotalLEDs = () => this.microState.totalLEDs;

  getSegmentCount = () => this.getSegments().length;

  getState = () => this.microState;

  getId = () => this.microState.id;

  getSegment = (index: number) => this.getSegments()[index];

  setSegments = (segments: WebMicroSegment[]) => {
    this.microState.segments = segments;
  };

  resizeSegment = (index: number, offset: number, numLEDs: number) => {
    const segment = this.getSegment(index);
    segment.offset = offset;
    segment.numLEDs = numLEDs;
  };

  getSegmentBoundaries = () => this.segmentBoundaries;

  setSegmentBoundaries = (segmentBoundaries: number[]) => {
    this.segmentBoundaries = segmentBoundaries;
  };

  resizeSegmentsFromBoundaries = (segmentBoundaries: number[]) => {
    const { resizeSegmentsFromBoundaries } = SharedMicroState;
    const {
      getSegments, getTotalLEDs,
      setSegmentBoundaries, setSegments,
    } = this;
    const { segments } = resizeSegmentsFromBoundaries(
      segmentBoundaries, getSegments(), getTotalLEDs(),
    );
    setSegmentBoundaries(segmentBoundaries);
    setSegments(segments);
  };

  static resizeSegmentsFromBoundaries = (
    segmentBoundaries: number[], oldSegments: WebMicroSegment[], totalLEDs: number,
  ) => {
    const { createSegment } = SharedMicroState;
    const segments = segmentBoundaries
      .reduce((segments, boundary, i, boundaries) => {
        const start = i === 0;
        const end = (i + 1) === boundaries.length;
        if (start) {
          const { effect } = oldSegments[i];
          segments
            .push(createSegment(0, boundary, effect));
        }
        if (!start && !end) {

        }
        if (end && (oldSegments.length > 1)) {
          const { effect } = oldSegments[i + 1];
          const numLEDs = totalLEDs - boundary;
          segments
            .push(createSegment(boundary, numLEDs, effect));
        }
        return segments;
      }, [] as WebMicroSegment[]);
    return {
      segments,
      segmentBoundaries,
    };
  };

  calculateSegmentBoundaries = () => {
    const { getSegments, setSegmentBoundaries } = this;
    const { calculateSegmentBoundaries } = SharedMicroState;
    setSegmentBoundaries(
      calculateSegmentBoundaries(
        getSegments(),
      ),
    );
  };

  static calculateSegmentBoundaries = (segments: WebMicroSegment[]) => {
    const boundaries: number[] = segments
      .reduce((boundaries, segment, index) => {
        const notEnd = !(index === (segments.length - 1));
        if (index === 0) {
          boundaries.push(segment.numLEDs);
        } else if (notEnd) {
          boundaries
            .push(segment.offset + segment.numLEDs);
        }
        return boundaries;
      }, [] as number[]);
    return boundaries;
  };

  splitSegment = (index: number, direction: Direction, newEffect: WebEffect) => {
    const { getSegments, setSegments, setSegmentBoundaries } = this;
    const { splitSegment } = SharedMicroState;
    const { segmentBoundaries, segments } = splitSegment(index, direction, newEffect, getSegments());
    setSegments(segments);
    setSegmentBoundaries(segmentBoundaries);
  };

  static splitSegment =
  (index: number, direction: Direction, newEffect: WebEffect, oldSegments: WebMicroSegment[]) => {
    const { createSegment, calculateSegmentBoundaries } = SharedMicroState;
    const segments = oldSegments.reduce((newArr, segment, i) => {
      const shouldSplit = index === i;
      if (shouldSplit) {
        const { effect, numLEDs, offset } = segment;
        const leftLen = Math.trunc(numLEDs / 2);
        const rightLen = numLEDs - leftLen;
        const rightOffset = offset + leftLen;
        const splitLeft = direction === Direction.Left;
        const leftEffect = splitLeft ? newEffect : effect;
        const rightEffect = splitLeft ? effect : newEffect;
        const newLeft = createSegment(offset, leftLen, leftEffect);
        const newRight = createSegment(rightOffset, rightLen, rightEffect);
        newArr.push(newLeft);
        newArr.push(newRight);
      } else {
        newArr.push(segment);
      }
      return newArr;
    }, [] as WebMicroSegment[]);
    const segmentBoundaries = calculateSegmentBoundaries(segments);
    return {
      segments,
      segmentBoundaries,
    };
  };

  mergeSegments = (index: number, direction: Direction) => {
    const {
      getSegments, getTotalLEDs,
      setSegments, setSegmentBoundaries,
    } = this;
    const { mergeSegments } = SharedMicroState;
    const { segments, segmentBoundaries } = mergeSegments(index, direction, getSegments(), getTotalLEDs());
    setSegments(segments);
    setSegmentBoundaries(segmentBoundaries);
  };

  static mergeSegments = (
    index: number, direction: Direction,
    oldSegments: WebMicroSegment[], totalLEDs: number,
  ) => {
    const { createSegment, calculateSegmentBoundaries } = SharedMicroState;
    const segment = oldSegments[index];
    const isLeftMerge = direction === Direction.Left;
    const mergeIndex = isLeftMerge ? index - 1 : index + 1;
    const segToMerge = oldSegments[mergeIndex];
    let newSegment: WebMicroSegment;
    if (segToMerge) {
      const offset = isLeftMerge ? segToMerge.offset : segment.offset;
      const numLEDs = segment.numLEDs + segToMerge.numLEDs;
      newSegment = createSegment(offset, numLEDs, segment.effect);
    } else {
      const atStart = index === 0;
      const numLEDs = atStart
        ? segment.offset + segment.numLEDs
        : totalLEDs - segment.offset;
      const offset = atStart ? 0 : segment.offset;
      newSegment = createSegment(offset, numLEDs, segment.effect);
    }
    const spliceIndex = isLeftMerge ? index - 1 : index;
    const segments = oldSegments.slice();
    segments.splice(spliceIndex, 2, newSegment);
    const segmentBoundaries = calculateSegmentBoundaries(segments);
    return {
      segments,
      segmentBoundaries,
    };
  };

  private static createSegment =
  (offset: number, numLEDs: number, effect: WebEffect) => ({
    offset,
    effect,
    numLEDs,
  });
}
export class Convert {
  static microSegmentToWeb(
    { effect, numLEDs, offset }: ControllerMicroSegment,
  ) {
    const webSegment: WebMicroSegment = {
      effect: MicroEffect[effect] as WebEffect,
      numLEDs,
      offset,
    };
    return webSegment;
  }

  static microSegmentsArrToWeb(
    microSegArr: ControllerMicroSegment[],
  ) {
    return microSegArr
      .map((microSeg) => Convert
        .microSegmentToWeb(microSeg));
  }

  static microInfoToWeb(
    id: string,
    { totalLEDs, segments, brightness }: MicroInfoResponse,
  ) {
    const { calculateSegmentBoundaries } = SharedMicroState;
    const { microSegmentsArrToWeb } = Convert;
    const webSegments = microSegmentsArrToWeb(segments);
    const segmentBoundaries = calculateSegmentBoundaries(webSegments);
    const webInfo: WebMicroInfo = {
      id,
      totalLEDs,
      brightness,
      segmentBoundaries,
      segments: webSegments,
    };
    return webInfo;
  }

  static microBrightnessToEmit(
    socketId: string, brightness: number,
    microId: string,
  ): BrightnessToServerEmit {
    return { socketId, body: { microId, brightness } };
  }

  static webEffectToMicro(webEffect: WebEffect) {
    const webEffectArr = Object.keys(WebEffect) as WebEffect[];
    return webEffectArr.indexOf(webEffect) as MicroEffect;
  }
}
