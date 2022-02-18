import undoable from 'redux-undo';
import * as situations from '../../components/boxes/situations';
import * as actionTypes from '../actions/actionTypes';
import initialBoxes from './boxesInitialData';
import * as boxesModes from './boxesModes';

const optimums = [21, 24, 18, 100];

function boxesSimulation(
  state = {
    boxes: [...initialBoxes[0]],
    optimum: optimums[0],
    round: 1,
    mode: boxesModes.PLAYING,
    totalTime: 0,
    level: 1,
    answer: boxesModes.WRONG_ANSWER,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_BOX:
      const newBox = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const newBoxes = [newBox, ...state.boxes];
      return {
        ...state,
        boxes: newBoxes,
      };

    case actionTypes.UPDATE_BOX:
      return {
        ...state,
        boxes: state.boxes.map((box) => {
          return box.id === action.payload.id
            ? {
                ...box,
                props: {
                  ...box.props,
                  ...action.payload.props,
                },
              }
            : box;
        }),
      };

    case actionTypes.DELETE_BOX:
      const newBoxess = state.boxes.filter((box) => {
        return box.id !== action.payload.id;
      });
      return {
        ...state,
        boxes: newBoxess,
      };

    case actionTypes.RESET_BOXES:
      return {
        ...state,
        round: 1,
        mode: boxesModes.PLAYING,
        boxes: state.boxes.map((box) => {
          return {
            ...box,
            props: {
              ...box.props,
              situation: situations.IN_SHELL,
            },
          };
        }),
      };
    case actionTypes.NEXT_ROUND:
      return {
        ...state,
        optimum: optimums[state.round],
        round: state.round + 1,
      };
    case actionTypes.CHANGE_GAME_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case actionTypes.CHANGE_TOTAL_TIME:
      return {
        ...state,
        totalTime: action.payload.totalTime,
      };
    case actionTypes.NEXT_LEVEL:
      return {
        ...state,
        level: action.payload.level,
      };
    case actionTypes.UPDATE_ANSWER:
      return {
        ...state,
        answer: action.payload.answer,
      };
    case actionTypes.CHANGE_BOXES:
      return {
        ...state,
        boxes: initialBoxes[state.round - 1],
        mode: boxesModes.PLAYING,
      };
    default:
      return state;
  }
}

const undoableBoxesSimulation = undoable(boxesSimulation, {
  limit: 20,
  filter: (action, state) => {
    return (
      action.type === actionTypes.CREATE_BOX ||
      action.type === actionTypes.UPDATE_BOX
    );
  },
});

export default undoableBoxesSimulation;
