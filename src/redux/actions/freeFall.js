import * as actionTypes from './actionTypes';

export const updateState = (state) => ({
  type: actionTypes.UPDATE_FREEFALL_STATE,
  payload: { state },
});

export const updatePageNumber = (pageNumber) => ({
  type: actionTypes.UPDATE_FREEFALL_PAGENUMBER,
  payload: { pageNumber },
});

export const updatePower = (power) => ({
  type: actionTypes.UPDATE_FREEFALL_POWER,
  payload: { power },
});

export const updateData = (dataX, dataY) => ({
  type: actionTypes.UPDATE_FREEFALL_DATA,
  payload: { dataX, dataY },
});
