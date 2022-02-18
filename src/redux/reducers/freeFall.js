import * as actionTypes from '../actions/actionTypes';

export default function graph(
  state = {
    state: 0,
    pageNumber: 0,
    power: 1,
    dataX: [],
    dataY: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_FREEFALL_STATE:
      return {
        ...state,
        state: action.payload.state,
      };

    case actionTypes.UPDATE_FREEFALL_PAGENUMBER:
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };

    case actionTypes.UPDATE_FREEFALL_DATA:
      return {
        ...state,
        dataX: action.payload.dataX || state.dataX,
        dataY: action.payload.dataY || state.dataY,
      };

    case actionTypes.UPDATE_FREEFALL_POWER:
      return {
        ...state,
        power: action.payload.power,
      };

    default:
      return state;
  }
}