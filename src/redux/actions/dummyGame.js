import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const createDummy = (props) => ({
  type: actionTypes.CREATE_DUMMY,
  payload: { id: makeId(), props },
});

export const updateDummy = (id, props) => ({
  type: actionTypes.UPDATE_DUMMY,
  payload: { id, props },
});

export const nextDummyRound = () => ({
  type: actionTypes.NEXT_DUMMY_ROUND,
  payload: {},
});

export const wrongAnswered = () => ({
  type: actionTypes.WRONG_ANSWERED,
  payload: {},
});

export const resetDummyGame = () => ({
  type: actionTypes.RESET_DUMMY_GAME,
  payload: {},
});

export const nextDummyLevel = () => ({
  type: actionTypes.DUMMY_NEXT_LEVEl,
  payload: {},
});

export const changeGameMode = (mode) => ({
  type: actionTypes.DUMMIES_CHANGE_MODE,
  payload: { mode },
});
