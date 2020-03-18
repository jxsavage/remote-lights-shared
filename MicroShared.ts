import {WebMicroInfo, ControllerMicroSegment,
  WebMicroSegment, BrightnessToServerEmit, MicroInfoResponse,
  } from './MicroTypes';
import {MicroEffect, WebEffect} from './MicroCommands';
export class SharedMicroState {
  microState: WebMicroInfo;
  constructor(microInfo: WebMicroInfo) {
    this.microState = microInfo;
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
  getTotalLEDs = () => {
    return this.microState.totalLEDs;
  }
  getSegmentCount = () => {
    return this.getSegments().length;
  }
  setSegmentEffect = (effect: WebEffect, segment: number) => {
    this.microState.segments[segment].effect = effect;
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
    {totalLEDs, segments, brightness}: MicroInfoResponse
  ){
    const webInfo: WebMicroInfo = {
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
    return {microId, socketId, brightness};
  }
  static webEffectToMicro(webEffect: WebEffect) {
    const webEffectArr = Object.keys(WebEffect) as WebEffect[];
    return webEffectArr.indexOf(webEffect) as MicroEffect;
  }
}