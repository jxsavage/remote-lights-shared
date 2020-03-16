import {WebMicroInfo, ControllerMicroSegment, WebMicroSegment,
  MicroEffect,
  WebEffect} from '../types/MicroTypes';
class SharedMicro {
  constructor(microInfo: WebMicroInfo) {

  }

}
export class Convert {
  static microSegmentToWeb
    ({effect, numLEDs, offset}: ControllerMicroSegment) {
    const webSegment: WebMicroSegment = {
      effect: MicroEffect[effect] as WebEffect,
      numLEDs,
      offset
    };
    return webSegment;
  }
  static microSegmentsArrToWeb
    (microSegArr: ControllerMicroSegment[]) {
    return microSegArr
      .map(microSeg => Convert
        .microSegmentToWeb(microSeg));
  }
}

export default SharedMicro;