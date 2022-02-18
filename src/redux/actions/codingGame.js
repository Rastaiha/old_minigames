import makeId from '../../utils/makeId';
import * as actionTypes from './actionTypes';

export const createDot = (props) => ({
  type: actionTypes.CREATE_DOT,
  payload: { id: makeId(), props },
});

export const selectDot = (id) => ({
  type: actionTypes.SELECT_DOT,
  payload: {
    id,
  },
});

export const deselectDot = (id) => ({
  type: actionTypes.DESELECT_DOT,
  payload: {
    id,
  },
});

export const createCircle = (props) => ({
  type: actionTypes.CREATE_CIRCLE,
  payload: {
    id: makeId(),
    props,
  },
});

export const updateCircle = (id, props) => ({
  type: actionTypes.UPDATE_CIRCLE,
  payload: {
    id,
    props,
  },
});

export const createSquare = (props) => ({
  type: actionTypes.CREATE_SQUARE,
  payload: {
    id: makeId(),
    props,
  },
});

export const updateSquare = (id, props) => ({
  type: actionTypes.UPDATE_SQUARE,
  payload: {
    id,
    props,
  },
});

export const circleMode = () => ({
  type: actionTypes.CIRCLE_MODE,
  payload: {},
});

export const squareMode = () => ({
  type: actionTypes.SQUARE_MODE,
  payload: {},
});

export const triangleMode = () => ({
  type: actionTypes.TRIANGLE_MODE,
  payload: {},
});

export const clearShape = (id, shape) => ({
  type: actionTypes.CLEAR_SHAPE,
  payload: {
    id,
    shape,
  },
});

export const createEdge = (props) => ({
  type: actionTypes.ADD_EDGE,
  payload: {
    id: makeId(),
    props,
  },
});

export const updateEdgee = (id, props) => ({
  type: actionTypes.UPDATE_EDGEE,
  payload: {
    id,
    props,
  }

})

export const updateDistance = (distance) => ({
  type: actionTypes.UPDATE_DISTANCE,
  payload: {distance}
})
