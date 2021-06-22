import {
  mergeSegments, resizeSegmentsFromBoundaries,
  setMicroBrightness, setSegmentEffect, splitSegment,
} from 'Shared/store';
import {
  Direction, LEDSegment, MicroEffect, MicroEntity,
  MicrosAndSegmentsEntity, MicroState, RemoteLightsEntity, SegmentEntity,
  RedisLEDSegmentHash, RedisMicroHash,
} from 'Shared/types';

function getSegmentsAfterSetEffect(): SegmentEntity {
  return {
    allIds: [
      358174915,
      1863146864,
    ],
    byId: {
      358174915: {
        alias: '358174915',
        offset: 0,
        effect: MicroEffect.ColorWaves,
        numLEDs: 144,
        microId: 1111329336,
        segmentId: 358174915,
        effectControlledBy: 0,
      },
      1863146864: {
        alias: '1863146864',
        offset: 144,
        effect: MicroEffect.ColorWaves,
        numLEDs: 144,
        microId: 1111329336,
        segmentId: 1863146864,
        effectControlledBy: 0,
      },
    },
  };
}
function getMicrosStateAfterBrightnessChange(): MicroEntity {
  return {
    allIds: [
      1111329336,
    ],
    byId: {
      1111329336: {
        alias: '1111329336',
        microId: 1111329336,
        totalLEDs: 288,
        brightness: 21,
        segmentBoundaries: [
          144,
        ],
        segmentIds: [
          358174915,
          1863146864,
        ],
      },
    },
  };
}
function getState(): RemoteLightsEntity {
  const state = {
    micros: {
      allIds: [
        1111329336,
      ],
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentBoundaries: [
            144,
          ],
          segmentIds: [
            358174915,
            1863146864,
          ],
        },
      },
    },
    segments: {
      allIds: [
        358174915,
        1863146864,
      ],
      byId: {
        358174915: {
          alias: '358174915',
          offset: 0,
          effect: 1,
          numLEDs: 144,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          offset: 144,
          effect: 0,
          numLEDs: 144,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
    },
    segmentGroups: {
      allIds: [],
      byId: {},
    },
  };
  return state;
}
function getMicrosAndSegmentsAfterSplitSegmentLeftEdge(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            155811981,
            358174915,
            1863146864,
          ],
          segmentBoundaries: [
            72,
            144,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      byId: {
        155811981: {
          alias: '155811981',
          offset: 0,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 155811981,
          effectControlledBy: 0,
        },
        358174915: {
          alias: '358174915',
          offset: 72,
          effect: 1,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          segmentId: 1863146864,
          effect: 0,
          offset: 144,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1863146864,
        155811981,
      ],
    },
  };
}
function getMicrosAndSegmentsAfterSplitSegmentRightEdge(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            1863146864,
            1851683174,
          ],
          segmentBoundaries: [
            144,
            216,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      byId: {
        358174915: {
          alias: '358174915',
          segmentId: 358174915,
          effect: 1,
          offset: 0,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
        1851683174: {
          alias: '1851683174',
          offset: 216,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 1851683174,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          offset: 144,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1863146864,
        1851683174,
      ],
    },
  };
}
function getMicrosAndSegmentsAfterMergeSegmentsRight(): RemoteLightsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: 't1111329336',
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
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      allIds: [
        358174915,
      ],
      byId: {
        358174915: {
          alias: '358174915',
          offset: 0,
          effect: 1,
          numLEDs: 288,
          microId: 1111329336,
          segmentId: 358174915,
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
function getMicrosAndSegmentsAfterMergeSegmentsLeft(): RemoteLightsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentBoundaries: [
            288,
          ],
          segmentIds: [
            1863146864,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      allIds: [
        1863146864,
      ],
      byId: {
        1863146864: {
          alias: '1863146864',
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
function getMicrosAndSegmentsAfterSplitSegmentRightInterior(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            344539015,
            1863146864,
          ],
          segmentBoundaries: [
            72,
            144,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      byId: {
        344539015: {
          alias: '344539015',
          offset: 72,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 344539015,
          effectControlledBy: 0,
        },
        358174915: {
          alias: '358174915',
          offset: 0,
          effect: 1,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          segmentId: 1863146864,
          effect: 0,
          offset: 144,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1863146864,
        344539015,
      ],
    },
  };
}
function getMicrosAndSegmentsAfterSplitSegmentLeftInterior(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            114400036,
            1863146864,
          ],
          segmentBoundaries: [
            144,
            216,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      byId: {
        114400036: {
          alias: '114400036',
          offset: 144,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 114400036,
          effectControlledBy: 0,
        },
        358174915: {
          alias: '358174915',
          segmentId: 358174915,
          effect: 1,
          offset: 0,
          numLEDs: 144,
          microId: 1111329336,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          offset: 216,
          effect: 0,
          numLEDs: 72,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1863146864,
        114400036,
      ],
    },
  };
}
function microsAndSegmentsAfterResizeSegmentsFromBoundaries(): MicrosAndSegmentsEntity {
  return {
    micros: {
      byId: {
        1111329336: {
          alias: '1111329336',
          microId: 1111329336,
          totalLEDs: 288,
          brightness: 20,
          segmentIds: [
            358174915,
            1863146864,
          ],
          segmentBoundaries: [
            169,
          ],
        },
      },
      allIds: [
        1111329336,
      ],
    },
    segments: {
      byId: {
        358174915: {
          alias: '358174915',
          offset: 0,
          effect: 1,
          numLEDs: 169,
          microId: 1111329336,
          segmentId: 358174915,
          effectControlledBy: 0,
        },
        1863146864: {
          alias: '1863146864',
          offset: 169,
          effect: 0,
          numLEDs: 119,
          microId: 1111329336,
          segmentId: 1863146864,
          effectControlledBy: 0,
        },
      },
      allIds: [
        358174915,
        1863146864,
      ],
    },
  };
}
function getSegment(): LEDSegment {
  return {
    alias: '3',
    effect: 0,
    offset: 5,
    microId: 20,
    numLEDs: 30,
    segmentId: 3,
    effectControlledBy: 0,
  };
}
function getSegmentHash(): RedisLEDSegmentHash {
  return {
    alias: '3',
    effect: '0',
    offset: '5',
    microId: '20',
    numLEDs: '30',
    segmentId: '3',
    effectControlledBy: '0',
  };
}
function getMicroHash(): RedisMicroHash {
  return {
    alias: '1',
    microId: '1',
    totalLEDs: '10',
    brightness: '20',
  };
}
function getMicro(): MicroState {
  return {
    alias: '1',
    microId: 1,
    totalLEDs: 10,
    brightness: 20,
    segmentIds: [3, 4, 5],
    segmentBoundaries: [5],
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
const setsSegmentEffect = {
  before: getSegments,
  after: getSegmentsAfterSetEffect,
  action: setSegmentEffect({
    microId: 1111329336,
    newEffect: MicroEffect.ColorWaves,
    segmentId: 358174915,
  }),
};
const splitSegmentLeftInterior = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentLeftInterior,
  action: splitSegment({
    microId: 1111329336,
    segmentId: 1863146864,
    direction: Direction.Left,
    newEffect: MicroEffect.ColorWaves,
    forceNewId: 114400036,
  }),
};
const splitSegmentRightInterior = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentRightInterior,
  action: splitSegment({
    direction: Direction.Right,
    newEffect: MicroEffect.ColorWaves,
    microId: 1111329336,
    segmentId: 358174915,
    forceNewId: 344539015,
  }),
};
const splitSegmentLeftEdge = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentLeftEdge,
  action: splitSegment({
    microId: 1111329336,
    segmentId: 358174915,
    direction: Direction.Left,
    newEffect: MicroEffect.ColorWaves,
    forceNewId: 155811981,
  }),
};
const splitSegmentRightEdge = {
  before: getMicrosAndSegments,
  after: getMicrosAndSegmentsAfterSplitSegmentRightEdge,
  action: splitSegment({
    direction: Direction.Right,
    newEffect: MicroEffect.ColorWaves,
    microId: 1111329336,
    segmentId: 1863146864,
    forceNewId: 1851683174,
  }),
};
const mergeSegmentsLeft = {
  before: getState,
  after: getMicrosAndSegmentsAfterMergeSegmentsLeft,
  action: mergeSegments({
    direction: Direction.Left,
    microId: 1111329336,
    segmentId: 1863146864,
  }),
};
const mergeSegmentsRight = {
  before: getState,
  after: getMicrosAndSegmentsAfterMergeSegmentsRight,
  action: mergeSegments({
    direction: Direction.Right,
    microId: 1111329336,
    segmentId: 358174915,
  }),
};
const resizeMicroSegmentsFromBoundaries = {
  before: getMicrosAndSegments,
  after: microsAndSegmentsAfterResizeSegmentsFromBoundaries,
  action: resizeSegmentsFromBoundaries({
    microId: 1111329336,
    segmentBoundaries: [169],
  }),
};
const rawData = {
  micros: getMicros,
  microsAndSegments: getMicrosAndSegments,
  micro: {
    value: getMicro,
    hash: getMicroHash,
  },
  segment: {
    value: getSegment,
    hash: getSegmentHash,
  },
};

const testFixture = {
  raw: rawData,
  setBrightness,
  setSegmentEffect: setsSegmentEffect,
  resizeSegmentsFromBoundaries: resizeMicroSegmentsFromBoundaries,
  mergeSegments: {
    left: mergeSegmentsLeft,
    right: mergeSegmentsRight,
  },
  splitSegment: {
    left: {
      edge: splitSegmentLeftEdge,
      interior: splitSegmentLeftInterior,
    },
    right: {
      edge: splitSegmentRightEdge,
      interior: splitSegmentRightInterior,
    },
  },
};

export default testFixture;
