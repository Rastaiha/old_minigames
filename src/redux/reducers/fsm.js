import * as actionTypes from '../actions/actionTypes';

function fsm(state = { workshops: [], pages: [], states:[] }, action) {
  switch (action.type) {
    case actionTypes.GET_CURRENT_PAGE_SUCCESS:
      return {
        ...state,
        pages: [action.response],
      };
    case actionTypes.GET_PAGES_SUCCESS:
      return {
        ...state,
        pages: action.response.filter((page) => !!page.state),
      };
    case actionTypes.GET_FSM_SUCCESS:
      return {
        ...state,
        workshops: action.response,
      };
    case actionTypes.GET_WORKSHOP_SUCCESS:
      return {
        ...state,
        workshops: [
          ...state.workshops.filter(
            (workshop) => workshop.id !== action.response.id
          ),
          action.response,
        ],
      };
    case actionTypes.GET_STATE_SUCCESS:
      return {
        ...state,
        states: [
          ...state.states.filter((stt) => stt.id !== action.response.id),
          action.response,
        ],
      };
    default:
      return state;
  }
}

export default fsm;
