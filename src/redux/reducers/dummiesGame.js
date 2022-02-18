import * as actionTypes from '../actions/actionTypes';
import * as gameModes from './dummiesGameModes';

function dummiesGame(
  state = {
    dummies: [],
    round: 1,
    totalRounds: rounds[0],
    userWrongNumber: 0,
    level: 1,
    mode: gameModes.START,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_DUMMY:
      const newDummy = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const newDummies = [...state.dummies, newDummy];
      return {
        ...state,
        dummies: newDummies,
      };
    case actionTypes.UPDATE_DUMMY:
      return {
        ...state,
        dummies: state.dummies.map((dummy) => {
          return dummy.id === action.payload.id
            ? {
                ...dummy,
                props: {
                  ...dummy.props,
                  ...action.payload.props,
                },
              }
            : dummy;
        }),
      };
    case actionTypes.NEXT_DUMMY_ROUND:
      return {
        ...state,
        round: state.round + 1,
      };
    case actionTypes.WRONG_ANSWERED:
      return {
        ...state,
        userWrongNumber: state.userWrongNumber + 1,
      };
    case actionTypes.RESET_DUMMY_GAME:
      return {
        ...state,
        round: 1,
        totalRounds: rounds[0],
        userWrongNumber: 0,
        level: 1,
      };
    case actionTypes.DUMMY_NEXT_LEVEl:
      return {
        ...state,
        round: 1,
        totalRounds: rounds[1],
        userWrongNumber: 0,
        level: 2,
      };
    case actionTypes.DUMMIES_CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };

    default:
      return state;
  }
}

const rounds = [8, 25];

export default dummiesGame;
