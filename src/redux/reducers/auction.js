import * as actionTypes from '../actions/actionTypes';

const init = { params: {}, result: {} };
function auction(state = init, action) {
  switch (action.type) {
    case actionTypes.RESTART_AUCTION:
      return init;
    case actionTypes.JOIN_AUCTION_SUCCESS:
    case actionTypes.CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        params: { ...action.response, response_time: new Date() },
      };
    case actionTypes.BID_SUCCESS:
      return { ...state, params: { ...state.params, submited: true } };
    case actionTypes.AUCTION_RESULT_SUCCESS:
      return { ...state, result: action.response };
    default:
      return state;
  }
}

export default auction;
