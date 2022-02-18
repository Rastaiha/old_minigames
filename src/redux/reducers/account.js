import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, refresh: null, signuping: false, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.response,
      };
    case actionTypes.GROUP_SIGNUP_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        signuping: true,
      };
    case actionTypes.GROUP_SIGNUP_SUCCESS:
    case actionTypes.GROUP_SIGNUP_FAILURE:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_FAILURE:
    case actionTypes.DISABLE_SIGNUPING:
      return {
        ...state,
        signuping: false,
      };
    case actionTypes.LOGOUT_REQUEST:
      return initState;
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.response.access,
        refresh: action.response.refresh,
      };
    case actionTypes.CHECK_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: {
          url: action.response.message,
          amount: action.response.amount,
          typePayment: action.response.typePayment,
        },
      };
    case actionTypes.REMOVE_PAYMENT_DATA:
      return {
        ...state,
        payment: null,
      };
    case actionTypes.SEND_SOLUTION_SUCCESS:
      return {
        ...state,
        sentSolution: true,
      };
    default:
      return state;
  }
}

export default account;
