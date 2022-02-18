import * as actionTypes from '../actions/actionTypes';
import makeId from '../../utils/makeId';

function verticalLines(
  state = {
    points: [],
    lines: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_POINTS:
      var newPointss = [...state.points];
      action.payload.pointProps.forEach((props) => {
        newPointss = [
          ...newPointss,
          {
            id: makeId(),
            props: props,
          },
        ];
      });
      return {
        ...state,
        points: newPointss,
      };
    case actionTypes.CREATE_POINT:
      const newPoint = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const newPoints = [...state.points, newPoint];
      return {
        ...state,
        points: newPoints,
      };
    case actionTypes.UPDATE_POINT:
      return {
        ...state,
        points: state.points.map((point) => {
          return point.id === action.payload.id
            ? {
                ...point,
                props: {
                  ...point.props,
                  ...action.payload.props,
                },
              }
            : point;
        }),
      };

    case actionTypes.CREATE_LINE:
      const newLine = {
        id: action.payload.id,
        from: action.payload.from,
        to: action.payload.to,
        props: action.payload.props,
      };
      return {
        ...state,
        lines: [...state.lines, newLine],
      };
    case actionTypes.RESET_POINTS:
      return {
        ...state,
        points: [],
        lines: [],
      };
    default:
      return state;
  }
}

export default verticalLines;
