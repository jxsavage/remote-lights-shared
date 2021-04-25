import { mergeSegments, setMicroBrightness, setSegmentEffect, splitSegment } from 'Shared/store';
import {
  Direction,
  MicroEffect, MicroEntity, MicrosAndSegmentsEntity, RemoteLightsEntity, SegmentEntity,
} from 'Shared/types';

function getSegmentsAfterSetEffect(): SegmentEntity {
  return {
    byId: {
      358174915: {
        segmentId: 358174915,
        effect: MicroEffect.ColorWaves,
        offset: 0,
        numLEDs: 144,
        microId: 1111329336,
        effectControlledBy: 0,
      },
      1045716497: {
        segmentId: 1045716497,
        effect: MicroEffect.ColorWaves,
        offset: 144,
        numLEDs: 144,
        microId: 2129426863,
        effectControlledBy: 0,
      },
      1216267815: {
        segmentId: 1216267815,
        effect: MicroEffect.BlendWave,
        offset: 0,
        numLEDs: 144,
        microId: 2129426863,
        effectControlledBy: 0,
      },
      1863146864: {
        segmentId: 1863146864,
        effect: MicroEffect.ColorWaves,
        offset: 144,
        numLEDs: 144,
        microId: 1111329336,
        effectControlledBy: 0,
      },
    },
    allIds: [
      358174915,
      1045716497,
      1216267815,
      1863146864,
    ],
  };
}
function getMicrosStateAfterBrightnessChange(): MicroEntity {
  return {
    byId: {
      1111329336: {
        microId: 1111329336,
        totalLEDs: 288,
        brightness: 21,
        segmentIds: [
          358174915,
          1863146864,
        ],
        segmentBoundaries: [
          144,
        ],
      },
      2129426863: {
        microId: 2129426863,
        totalLEDs: 288,
        brightness: 20,
        segmentIds: [
          1216267815,
          1045716497,
        ],
        segmentBoundaries: [
          144,
        ],
      },
    },
    allIds: [
      1111329336,
      2129426863,
    ],
  };
}
function getState(): RemoteLightsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            1863146864,
          ],
          segmentBoundaries: [
            144,
          ],
        },
        2129426863: {
          microId: 2129426863,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1216267815,
            1045716497,
          ],
          segmentBoundaries: [
            144,
          ],
        },
      },
      allIds: [
        1111329336,
        2129426863,
      ],
    },
    segments: {
      byId: {
        358174915: {
          segmentId: 358174915,
          effect: MicroEffect.BlendWave,
          offset: 0,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
        1045716497: {
          segmentId: 1045716497,
          effect: MicroEffect.ColorWaves,
          offset: 144,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1216267815: {
          segmentId: 1216267815,
          effect: MicroEffect.BlendWave,
          offset: 0,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1863146864: {
          segmentId: 1863146864,
          effect: MicroEffect.ColorWaves,
          offset: 144,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1045716497,
        1216267815,
        1863146864,
      ],
    },
    segmentGroups: {
      byId: {},
      allIds: [],
    },
  };
}
function getMicrosAndSegmentsAfterSplitSegmentLeft(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            402030797,
            358174915,
            1863146864,
          ],
          segmentBoundaries: [
            72,
            144,
          ],
        },
        2129426863: {
          microId: 2129426863,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1216267815,
            1045716497,
          ],
          segmentBoundaries: [
            144,
          ],
        },
      },
      allIds: [
        1111329336,
        2129426863,
      ],
    },
    segments: {
      byId: {
        358174915: {
          offset: 72,
          effect: MicroEffect.BlendWave,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        402030797: {
          offset: 0,
          effect: MicroEffect.ColorWaves,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 402030797,
          effectControlledBy: 0,
        },
        1045716497: {
          segmentId: 1045716497,
          effect: MicroEffect.ColorWaves,
          offset: 144,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1216267815: {
          segmentId: 1216267815,
          effect: MicroEffect.BlendWave,
          offset: 0,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1863146864: {
          segmentId: 1863146864,
          effect: MicroEffect.ColorWaves,
          offset: 144,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1045716497,
        1216267815,
        1863146864,
        402030797,
      ],
    },
  };
}
function getMicrosAndSegmentsAfterSplitSegmentRight(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            1863146864,
            1347786750,
          ],
          segmentBoundaries: [
            144,
            216,
          ],
        },
        2129426863: {
          microId: 2129426863,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1216267815,
            1045716497,
          ],
          segmentBoundaries: [
            144,
          ],
        },
      },
      allIds: [
        1111329336,
        2129426863,
      ],
    },
    segments: {
      byId: {
        358174915: {
          segmentId: 358174915,
          effect: MicroEffect.BlendWave,
          offset: 0,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
        1045716497: {
          segmentId: 1045716497,
          effect: MicroEffect.ColorWaves,
          offset: 144,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1216267815: {
          segmentId: 1216267815,
          effect: MicroEffect.BlendWave,
          offset: 0,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1347786750: {
          offset: 216,
          effect: MicroEffect.BlendWave,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 1347786750,
          effectControlledBy: 0,
        },
        1863146864: {
          offset: 144,
          effect: MicroEffect.ColorWaves,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1045716497,
        1216267815,
        1863146864,
        1347786750,
      ],
    },
  };
}
function getMicrosAndSegmentsAfterMergeSegementsRight(): RemoteLightsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
          ],
          segmentBoundaries: [
            288,
          ],
        },
        2129426863: {
          microId: 2129426863,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1216267815,
            1045716497,
          ],
          segmentBoundaries: [
            144,
          ],
        },
      },
      allIds: [
        1111329336,
        2129426863,
      ],
    },
    segments: {
      allIds: [
        358174915,
        1045716497,
        1216267815,
      ],
      byId: {
        358174915: {
          offset: 0,
          effect: 1,
          numLEDs: 288,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        1045716497: {
          segmentId: 1045716497,
          effect: 0,
          offset: 144,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1216267815: {
          segmentId: 1216267815,
          effect: 1,
          offset: 0,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
      },
    },
    segmentGroups: {
      byId: {},
      allIds: [],
    },
  };
}
function getMicrosAndSegmentsAfterMergeSegementsLeft(): RemoteLightsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1863146864,
          ],
          segmentBoundaries: [
            288,
          ],
        },
        2129426863: {
          microId: 2129426863,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            1216267815,
            1045716497,
          ],
          segmentBoundaries: [
            144,
          ],
        },
      },
      allIds: [
        1111329336,
        2129426863,
      ],
    },
    segments: {
      allIds: [
        1045716497,
        1216267815,
        1863146864,
      ],
      byId: {
        1045716497: {
          segmentId: 1045716497,
          effect: 0,
          offset: 144,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1216267815: {
          segmentId: 1216267815,
          effect: 1,
          offset: 0,
          numLEDs: 144,
          microId: 2129426863,
          effectControlledBy: 0,
        },
        1863146864: {
          offset: 0,
          effect: 0,
          numLEDs: 288,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
    },
    segmentGroups: {
      byId: {},
      allIds: [],
    },
  };
}
function getSegments(): SegmentEntity {
  return getState().segments;
}
function getMicros(): MicroEntity {
  return getState().micros;
}
function getMicrosAndSegments(): MicrosAndSegmentsEntity {
  const { micros, segments } = getState();
  return { micros, segments };
}
const setBrightness = {
  before: getMicros,
  after: getMicrosStateAfterBrightnessChange,
  action: setMicroBrightness({
    microId: 1111329336,
    brightness: 21,
  }),
};
const setSegmentEffectData = {
  before: getSegments,
  after: getSegmentsAfterSetEffect,
  action: setSegmentEffect({
    microId: 1111329336,
    newEffect: MicroEffect.ColorWaves,
    segmentId: 358174915,
  }),
};
const splitSegmentLeft = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentLeft,
  action: splitSegment({
    microId: 1111329336,
    segmentId: 358174915,
    direction: Direction.Left,
    newEffect: MicroEffect.ColorWaves,
    forceNewId: 402030797,
  }),
};
const splitSegmentRight = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentRight,
  action: splitSegment({
    direction: Direction.Right,
    newEffect: MicroEffect.BlendWave,
    microId: 1111329336,
    segmentId: 1863146864,
    forceNewId: 1347786750,
  }),
};
const mergeSegmentsLeft = {
  before: getState,
  after: getMicrosAndSegmentsAfterMergeSegementsLeft,
  action: mergeSegments({
    direction: Direction.Left,
    microId: 1111329336,
    segmentId: 1863146864,
  }),
};
const mergeSegmentsRight = {
  before: getState,
  after: getMicrosAndSegmentsAfterMergeSegementsRight,
  action: mergeSegments({
    direction: Direction.Right,
    microId: 1111329336,
    segmentId: 358174915,
  }),
};

const rawData = {
  micros: getMicros,
  microsAndSegments: getMicrosAndSegments,
};

const testFixture = {
  rawData,
  setBrightness,
  splitSegmentLeft,
  splitSegmentRight,
  mergeSegmentsLeft,
  mergeSegmentsRight,
  setSegmentEffectData,
};

export default testFixture;
