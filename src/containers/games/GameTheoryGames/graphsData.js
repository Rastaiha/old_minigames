import makeId from '../../../utils/makeId';

const widthScale = window.innerWidth / 671;
const heightScale = window.innerHeight / 381;

export const firstVertices = [
  {
    id: makeId(),
    props: {
      x: 50 * widthScale,
      y: 180 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 300 * widthScale,
      y: 50 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 300 * widthScale,
      y: 300 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 550 * widthScale,
      y: 180 * heightScale,
    },
  },
];

export const firstEdges = [
  {
    id: makeId(),
    from: firstVertices[1].id,
    to: firstVertices[0].id,
    a: 1,
    b: 0,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: firstVertices[3].id,
    to: firstVertices[1].id,
    a: 0,
    b: 100,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: firstVertices[2].id,
    to: firstVertices[0].id,
    a: 0,
    b: 100,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: firstVertices[3].id,
    to: firstVertices[2].id,
    a: 1,
    b: 0,
    weight: 0,
    props: {},
  },
];

export const secondVertices = [
  {
    id: makeId(),
    props: {
      x: 50 * widthScale,
      y: 180 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 300 * widthScale,
      y: 50 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 300 * widthScale,
      y: 300 * heightScale,
    },
  },
  {
    id: makeId(),
    props: {
      x: 550 * widthScale,
      y: 180 * heightScale,
    },
  },
];

export const secondEdges = [
  {
    id: makeId(),
    from: secondVertices[1].id,
    to: secondVertices[0].id,
    a: 1,
    b: 0,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: secondVertices[3].id,
    to: secondVertices[1].id,
    a: 0,
    b: 100,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: secondVertices[2].id,
    to: secondVertices[0].id,
    a: 0,
    b: 100,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: secondVertices[3].id,
    to: secondVertices[2].id,
    a: 1,
    b: 0,
    weight: 0,
    props: {},
  },
  {
    id: makeId(),
    from: secondVertices[2].id,
    to: secondVertices[1].id,
    a: 0,
    b: 0,
    weight: 0,
    props: {},
  },
];
