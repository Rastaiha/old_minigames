import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const createBox = (id, props) => ({
  type: actionTypes.CREATE_BOX,
  payload: { id: id ? id : makeId(), props },
});

export const createMachine = (props) => ({
  type: actionTypes.CREATE_MACHINE,
  payload: { id: makeId(), props },
});

export const updateBox = (id, props) => ({
  type: actionTypes.UPDATE_BOX,
  payload: { id, props },
});

export const updateMachine = (id, props) => ({
  type: actionTypes.UPDATE_MACHINE,
  payload: { id, props },
});

export const deleteBox = (id) => ({
  type: actionTypes.DELETE_BOX,
  payload: { id },
});

export const resetBoxes = () => ({
  type: actionTypes.RESET_BOXES,
  payload: {},
});

export const nextRound = () => ({
  type: actionTypes.NEXT_ROUND,
  payload: {},
});

export const changeMode = (mode) => ({
  type: actionTypes.CHANGE_GAME_MODE,
  payload: { mode },
});

export const changeTotaltime = (totalTime) => ({
  type: actionTypes.CHANGE_TOTAL_TIME,
  payload: { totalTime },
});

export const nextLevel = (level) => ({
  type: actionTypes.NEXT_LEVEL,
  payload: { level },
});

export const updateAnswer = (answer) => ({
  type: actionTypes.UPDATE_ANSWER,
  payload: { answer },
});

export const changeBoxes = () => ({
  type: actionTypes.CHANGE_BOXES,
  payload: {},
});
