import {WebMicroInfo, ControllerMicroSegment,
  WebMicroSegment, BrightnessToServerEmit, MicroInfoResponse,
  } from './MicroTypes';
import {MicroEffect, WebEffect} from './MicroCommands';
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
  resizeSegmentsFromBoundaries = (boundaries: number[]) => {
    const {
      getSegmentCount, resizeSegment,
      setSegmentBoundaries
    } = this;
    const iterations = getSegmentCount();
    for(let i = 0; i < iterations; i++){
      const [offset, segmentEnd] = boundaries.slice(i, i+2);
      const numLEDs = segmentEnd - offset;
      resizeSegment(i, offset, numLEDs);
    }
    setSegmentBoundaries(boundaries);
  }
  calculateSegmentBoundaries = () => {
    const boundaries: number[] = this.getSegments()
      .reduce((boundaries, segment, index) => {
        if (index === 0) {
          boundaries.push(0);
          boundaries.push(segment.numLEDs);
        }else {
          boundaries
            .push(segment.offset + segment.numLEDs);
        }
        return boundaries;
      }, [] as number[]);
    return boundaries;
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