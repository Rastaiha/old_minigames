import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const updateProtractor = (props) => ({
  type: actionTypes.UPDATE_PROTRACTOR,
  payload: { props },
});

export const resetMap = () => ({
  type: actionTypes.RESET_MAP,
  payload: {},
});

export const addDot = (newDot) => ({
  type: actionTypes.ADD_DOT,
  payload: { id: makeId(), newDot },
});

export const updateLittleDots = (index, props) => ({
  type: actionTypes.UPDATE_LITTLE_DOTS,
  payload: { index, props },
});

export const updateDot = (id, props) => ({
  type: actionTypes.UPDATE_DOTT,
  payload: { id, props },
});

export const drawLine = (from, to) => ({
  type: actionTypes.DRAW_LINE,
  payload: { from, to },
});
