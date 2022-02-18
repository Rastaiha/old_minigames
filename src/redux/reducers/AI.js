import * as actionTypes from '../actions/actionTypes';

export default function AI(
  state = {
    state1: 0,
    road1: [],
    x1: null,
    y1: null,
    tetha1: -90,


    state2: 0,
    road2: [],
    x2: null,
    y2: null,
    tetha2: -90,
    KValue: 0,
  },
  action
) {
  switch (action.type) {

    case actionTypes.UPDATE_ROAD_FIRST_GAME:
      return {
        ...state,
        road1: action.payload.road,
      };

    case actionTypes.UPDATE_AI_FIRST_GAME_STATE:
      return {
        ...state,
        state1: action.payload.state,
      };

    /////

    case actionTypes.UPDATE_ROAD_SECOND_GAME:
      return {
        ...state,
        road2: action.payload.road,
      };

    case actionTypes.UPDATE_K_VALUE_SECOND_GAME:
      return {
        ...state,
        KValue: action.payload.KValue,
      };

    case actionTypes.UPDATE_AI_SECOND_GAME_STATE:
      return {
        ...state,
        state2: action.payload.state,
      };

    ////

    default:
      return state;
  }
}