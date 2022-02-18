import * as actionTypes from './actionTypes';

export const updateRoad_firstGame = (road) => ({
  type: actionTypes.UPDATE_ROAD_FIRST_GAME,
  payload: { road },
});

export const updateState_firstGame = (state) => ({
  type: actionTypes.UPDATE_AI_FIRST_GAME_STATE,
  payload: { state },
});

////

export const updateKValue_secondGame = (KValue) => ({
  type: actionTypes.UPDATE_K_VALUE_SECOND_GAME,
  payload: { KValue },
});

export const updateRoad_secondGame = (road) => ({
  type: actionTypes.UPDATE_ROAD_SECOND_GAME,
  payload: { road },
});

export const updateState_secondGame = (state) => ({
  type: actionTypes.UPDATE_AI_SECOND_GAME_STATE,
  payload: { state },
});


/////
