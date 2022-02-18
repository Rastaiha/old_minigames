import * as actionTypes from '../actions/actionTypes';
import makeId from '../../utils/makeId';

function protractor(
  state = {
    protractor: {
      x: 100,
      y: 100,
    },
    dots: [],
    lines: [],
    littleDots: [
      {
        x: 550,
        y: 286,
        isSelected: false,
      },
    ],
  },
  action
) {
  switch (action.type) {
    case actionTypes.RESET_MAP:
      return {
        ...state,
        dots: [],
        lines: [],
        littleDots: [
          {
            x: 550,
            y: 286,
            isSelected: false,
          },
        ],
      };
    case actionTypes.ADD_DOT:
      const dot = {
        id: action.payload.id,
        ...action.payload.newDot,
      };
      return {
        ...state,
        dots: [...state.dots, dot],
      };
    case actionTypes.UPDATE_PROTRACTOR:
      return {
        ...state,
        protractor: {
          ...state.protractor,
          ...action.payload.props,
        },
      };
    case actionTypes.UPDATE_LITTLE_DOTS:
      let i = -1;
      const newDots = state.littleDots.map((dot) => {
        i++;
        return i === action.payload.index
          ? {
              ...dot,
              ...action.payload.props,
            }
          : dot;
      });
      return {
        ...state,
        littleDots: newDots,
      };
    case actionTypes.UPDATE_DOTT:
      return {
        ...state,
        dots: state.dots.map((dot) => {
          return dot.id === action.payload.id
            ? {
                ...dot,
                ...action.payload.props,
              }
            : dot;
        }),
      };
    case actionTypes.DRAW_LINE:
      const newLine = {
        from: action.payload.from,
        to: action.payload.to,
      };
      return {
        ...state,
        lines: [...state.lines, newLine],
      };
    default:
      return state;
  }
}

export default protractor;
