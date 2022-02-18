import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const createPoints = (pointProps) => ({
  type: actionTypes.CREATE_POINTS,
  payload: {pointProps}
})

export const createPoint = (props) => ({
  type: actionTypes.CREATE_POINT,
  payload: { id: makeId(), props },
});

export const updatePoint = (id, props) => ({
  type: actionTypes.UPDATE_POINT,
  payload: { id, props },
});

export const createLine = (from, to, props) => ({
  type: actionTypes.CREATE_LINE,
  payload: { id: makeId(), from, to, props },
});

export const resetPoints = () => ({
  type: actionTypes.RESET_POINTS,
  payload: {}
})
