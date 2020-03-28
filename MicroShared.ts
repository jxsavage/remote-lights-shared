import {WebMicroInfo, ControllerMicroSegment,
  WebMicroSegment, BrightnessToServerEmit, MicroInfoResponse,
  } from './MicroTypes';
import {MicroEffect, WebEffect, Direction} from './MicroCommands';
export class SharedMicroState {
  microState: WebMicroInfo;
  segmentBoundaries: number[];
  constructor(microInfo: WebMicroInfo) {
    this.microState = microInfo;
    this.segmentBoundaries = this.calculateSegmentBoundaries();

  }
  getSegments = () => {
    return this.microState.segments;
  }
  getBrightness = () => {
    return this.microState.brightness;
  }
  setBrightness = (brightness: number) => {
    this.microState.brightness = brightness;
  }
  setEffect(index: number, effect: WebEffect) {
    this.getSegment(index).effect = effect;
  }
  getTotalLEDs = () => {
    return this.microState.totalLEDs;
  }
  getSegmentCount = () => {
    return this.getSegments().length;
  }
  setSegmentEffect = (effect: WebEffect, segment: number) => {
    this.microState.segments[segment].effect = effect;
  }
  getState = () => {
    return this.microState;
  }
  getId = () => {
    return this.microState.id;
  }
  getSegment = (index: number) => {
    return this.getSegments()[index];
  }
  resizeSegment = (index: number, offset: number, numLEDs: number) => {
    const segment = this.getSegment(index);
    segment.offset = offset;
    segment.numLEDs = numLEDs;
  }
  getSegmentBoundaries = () => {
    return this.segmentBoundaries;
  }
  setSegmentBoundaries = (segmentBoundaries: number[]) => {
    this.segmentBoundaries = segmentBoundaries;
  }
  resizeSegmentsFromBoundaries = (segmentBoundaries: number[]) => {
    const {getSegment, createSegment} = this;
    const segments = segmentBoundaries
      .reduce((segments, boundary, i, boundaries) => {
      const start = i===0;
      const end = (i+1)===boundaries.length;
      if(start) {
        const {effect} = getSegment(i);
        segments
          .push(createSegment(0, boundary, effect));
      }
      if(!start && !end) {

      }
      if(end) {
        const {effect} = getSegment(i+1);
        const totalLEDs = this.getTotalLEDs();
        const numLEDs = totalLEDs - boundary;
        segments
          .push(createSegment(boundary, numLEDs, effect));
      }
      return segments;
    }, [] as WebMicroSegment[]);
    return {
      segments,
      segmentBoundaries
    }
  }
  calculateSegmentBoundaries = (segments?: WebMicroSegment[]) => {
    const {getSegments} = this;
    const currentSegments = segments? segments : getSegments();
    const boundaries: number[] = currentSegments
      .reduce((boundaries, segment, index) => {
        const notEnd = !(index === (currentSegments.length - 1));
        if (index === 0) {
          boundaries.push(segment.numLEDs);
        } else if (notEnd) {
          boundaries
            .push(segment.offset + segment.numLEDs);
        }
        return boundaries;
      }, [] as number[]);
    return boundaries;
  }
  splitSegment = 
  (index: number, direction: Direction, newEffect: WebEffect, segs?: WebMicroSegment[]) => {
    const { getSegments, calculateSegmentBoundaries,
      createSegment} = this;
    const currentSegments = segs? segs : getSegments();
    const segments = 
    currentSegments.reduce((newArr, segment, i) => {
      const shouldSplit = index === i;
      if(shouldSplit) {
        const {effect, numLEDs, offset} = segment;
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
      segmentBoundaries
    }
  }
  mergeSegments = (index: number, direction: Direction, segs?: WebMicroSegment[]) => {
    const { getSegments, createSegment, getTotalLEDs,
    calculateSegmentBoundaries } = this;
    const segments = segs? segs.slice() : getSegments().slice();
    const segment = segments[index];
    const isLeftMerge = direction === Direction.Left;
    const mergeIndex = isLeftMerge ? index-1 : index+1;
    const segToMerge = segments[mergeIndex];
    let newSegment: WebMicroSegment;
    if (segToMerge) {
      const offset = isLeftMerge ? segToMerge.offset : segment.offset;
      const numLEDs = segment.numLEDs + segToMerge.numLEDs;
      newSegment = createSegment(offset, numLEDs, segment.effect);
    } else {
      const atStart = index === 0;
      const numLEDs = atStart ?
        segment.offset + segment.numLEDs :
        getTotalLEDs() - segment.offset;
      const offset = atStart ? 0 : segment.offset;
      newSegment = createSegment(offset, numLEDs, segment.effect);
    }
    const spliceIndex = isLeftMerge ? index-1 : index;
    segments.splice(spliceIndex,2,newSegment);
    const segmentBoundaries = calculateSegmentBoundaries(segments);
    return {
      segments,
      segmentBoundaries
    }
  }
  private createSegment = 
  (offset: number, numLEDs: number, effect: WebEffect) => {
    return {
      offset,
      effect,
      numLEDs
    }
  }
}
export class Convert {
  static microSegmentToWeb(
    {effect, numLEDs, offset}: ControllerMicroSegment
  ){
    const webSegment: WebMicroSegment = {
      effect: MicroEffect[effect] as WebEffect,
      numLEDs,
      offset
    };
    return webSegment;
  }
  static microSegmentsArrToWeb(
    microSegArr: ControllerMicroSegment[]
  ){
    return microSegArr
      .map(microSeg => Convert
        .microSegmentToWeb(microSeg));
  }
  static microInfoToWeb(
    id: string,
    {totalLEDs, segments, brightness}: MicroInfoResponse
  ){
    const webInfo: WebMicroInfo = {
      id,
      totalLEDs,
      segments: Convert.microSegmentsArrToWeb(segments),
      brightness,
    }
    return webInfo;
  }
  static microBrightnessToEmit(
    socketId: string, brightness: number,
    microId: string
  ): BrightnessToServerEmit {
    return { socketId, body:{microId, brightness} };
  }
  static webEffectToMicro(webEffect: WebEffect) {
    const webEffectArr = Object.keys(WebEffect) as WebEffect[];
    return webEffectArr.indexOf(webEffect) as MicroEffect;
  }
}