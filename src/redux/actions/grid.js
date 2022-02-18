import * as actionTypes from './actionTypes';

export const insertDots = (dots) => ({
  type: actionTypes.INSERT_DOTS,
  payload: { dots },
});

export const insertLines = (lines) => ({
  type: actionTypes.INSERT_LINES,
  payload: { lines },
});

export const updateDot = (id, props) => ({
  type: actionTypes.UPDATE_DOT,
  payload: { id, props },
});

export const updateLine = (id, props) => ({
  type: actionTypes.UPDATE_LINE,
  payload: { id, props },
});

export const resetGrid = () => ({
  type: actionTypes.RESET_GRID,
  payload: {}
})