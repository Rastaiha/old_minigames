import makeId from '../../../utils/makeId';

const widthScale = window.innerWidth / 671;
const heightScale = window.innerHeight / 381;

export const correctTableInputs = [
  '20',
  '30',
  '24',
  '19',
  '36',
  '32',
  '21',
  '30',
  '26',
  '29',
  '40',
  '20',
  '27',
  '32',
  '30',
  '20',
];

export const pipelineInitialVertices1 = [
  {
    id: makeId(),
    props: {
      x: 50 * widthScale,
      y: 180 * heightScale,
      name: 's',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 200 * widthScale,
      y: 50 * heightScale,
      name: 'h',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 200 * widthScale,
      y: 300 * heightScale,
      name: 'r',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 450 * widthScale,
      y: 50 * heightScale,
      name: 'o',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 500 * widthScale,
      y: 300 * heightScale,
      name: 'v',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 600 * widthScale,
      y: 170 * heightScale,
      name: 't',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
];

export const pipelineInitialEdges1 = [
  {
    id: makeId(),
    from: pipelineInitialVertices1[1].id,
    to: pipelineInitialVertices1[0].id,
    filled: 0,
    props: {
      capacity: 10,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[2].id,
    to: pipelineInitialVertices1[0].id,
    filled: 0,
    props: {
      capacity: 10,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[2].id,
    to: pipelineInitialVertices1[1].id,
    filled: 0,
    props: {
      capacity: 2,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[3].id,
    to: pipelineInitialVertices1[1].id,
    filled: 0,
    props: {
      capacity: 4,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[3].id,
    to: pipelineInitialVertices1[4].id,
    filled: 0,
    props: {
      capacity: 6,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[4].id,
    to: pipelineInitialVertices1[1].id,
    filled: 0,
    props: {
      capacity: 8,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[4].id,
    to: pipelineInitialVertices1[2].id,
    filled: 0,
    props: {
      capacity: 9,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[5].id,
    to: pipelineInitialVertices1[3].id,
    filled: 0,
    props: {
      capacity: 10,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices1[5].id,
    to: pipelineInitialVertices1[4].id,
    filled: 0,
    props: {
      capacity: 10,
      canBeSelected: false,
    },
  },
];

export const pipelineInitialVertices2 = [
  {
    id: makeId(),
    props: {
      x: 50 * widthScale,
      y: 180 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 200 * widthScale,
      y: 55 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 200 * widthScale,
      y: 320 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 260 * widthScale,
      y: 180 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 350 * widthScale,
      y: 55 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 500 * widthScale,
      y: 55 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 450 * widthScale,
      y: 180 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 350 * widthScale,
      y: 320 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 500 * widthScale,
      y: 320 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
  {
    id: makeId(),
    props: {
      x: 620 * widthScale,
      y: 180 * heightScale,
      name: '',
      inputFlux: 0,
      outputFlux: 0,
    },
  },
];

export const pipelineInitialEdges2 = [
  {
    id: makeId(),
    from: pipelineInitialVertices2[1].id,
    to: pipelineInitialVertices2[0].id,
    filled: 0,
    props: {
      capacity: 9,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[2].id,
    to: pipelineInitialVertices2[0].id,
    filled: 0,
    props: {
      capacity: 4,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[3].id,
    to: pipelineInitialVertices2[1].id,
    filled: 0,
    props: {
      capacity: 6,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[3].id,
    to: pipelineInitialVertices2[2].id,
    filled: 0,
    props: {
      capacity: 1,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[4].id,
    to: pipelineInitialVertices2[3].id,
    filled: 0,
    props: {
      capacity: 7,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[7].id,
    to: pipelineInitialVertices2[3].id,
    filled: 0,
    props: {
      capacity: 3,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[7].id,
    to: pipelineInitialVertices2[2].id,
    filled: 0,
    props: {
      capacity: 5,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[6].id,
    to: pipelineInitialVertices2[7].id,
    filled: 0,
    props: {
      capacity: 5,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[5].id,
    to: pipelineInitialVertices2[6].id,
    filled: 0,
    props: {
      capacity: 2,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[4].id,
    to: pipelineInitialVertices2[5].id,
    filled: 0,
    props: {
      capacity: 5,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[4].id,
    to: pipelineInitialVertices2[7].id,
    filled: 0,
    props: {
      capacity: 1,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[8].id,
    to: pipelineInitialVertices2[6].id,
    filled: 0,
    props: {
      capacity: 7,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[9].id,
    to: pipelineInitialVertices2[8].id,
    filled: 0,
    props: {
      capacity: 5,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[9].id,
    to: pipelineInitialVertices2[5].id,
    filled: 0,
    props: {
      capacity: 8,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[3].id,
    to: pipelineInitialVertices2[6].id,
    filled: 0,
    props: {
      capacity: 4,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[6].id,
    to: pipelineInitialVertices2[4].id,
    filled: 0,
    props: {
      capacity: 3,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[4].id,
    to: pipelineInitialVertices2[1].id,
    filled: 0,
    props: {
      capacity: 3,
      canBeSelected: false,
    },
  },
  {
    id: makeId(),
    from: pipelineInitialVertices2[7].id,
    to: pipelineInitialVertices2[8].id,
    filled: 0,
    props: {
      capacity: 3,
      canBeSelected: false,
    },
  },
];
