import * as actionTypes from '../actions/actionTypes';

function grid(
  state = {
    gridDots: [],
    lines: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.INSERT_DOTS:
      return {
        ...state,
        gridDots: action.payload.dots,
      };
    case actionTypes.INSERT_LINES:
      return {
        ...state,
        lines: action.payload.lines,
      };
    case actionTypes.UPDATE_DOT:
      return {
        ...state,
        gridDots: state.gridDots.map((dot) => {
          return dot.id === action.payload.id
            ? {
                ...dot,
                props: {
                  ...dot.props,
                  ...action.payload.props,
                },
              }
            : dot;
        }),
      };
    case actionTypes.UPDATE_LINE:
      return {
        ...state,
        lines: state.lines.map((line) => {
          return line.id === action.payload.id
            ? {
                ...line,
                props: {
                  ...line.props,
                  ...action.payload.props,
                },
              }
            : line;
        }),
      };
    case actionTypes.RESET_GRID:
      return {
        ...state,
        gridDots: state.gridDots.map((dot) => {
          return {
            ...dot,
            props: {
              ...dot.props,
              isSelected: false,
              relatedNodes: [],
            },
          };
        }),
        lines: state.lines.map((line) => {
          return {
            ...line,
            props: {
              ...line.props,
              isSelected: false,
              relatedNodes: [],
            },
          };
        }),
      };
    default:
      return state;
  }
}

export default grid;
