import * as ShapeTypes from '../../containers/games/CodingGame/ShapeTypes';
import * as actionTypes from '../actions/actionTypes';

function codingGame(
  state = {
    dots: [],
    circles: [],
    squares: [],
    edges: [],
    distance: '',
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_DOT:
      const newDot = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const dots = [...state.dots, newDot];
      return {
        ...state,
        dots: dots,
      };
    case actionTypes.SELECT_DOT:
      return {
        ...state,
        dots: state.dots.map((dot) => {
          return dot.id === action.payload.id
            ? { ...dot, isSelected: true }
            : dot;
        }),
      };

    case actionTypes.DESELECT_DOT:
      return {
        ...state,
        dots: state.dots.map((dot) => {
          return dot.id === action.payload.id
            ? { ...dot, isSelected: false }
            : dot;
        }),
      };

    case actionTypes.CREATE_CIRCLE:
      const newCircle = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const circles = [...state.circles, newCircle];
      return {
        ...state,
        circles: circles,
      };

    case actionTypes.UPDATE_CIRCLE:
      return {
        ...state,
        circles: state.circles.map((circle) => {
          return circle.id === action.payload.id
            ? {
                ...circle,
                props: {
                  ...circle.props,
                  ...action.payload.props,
                },
              }
            : circle;
        }),
      };
    case actionTypes.CREATE_SQUARE:
      const newSquare = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const squares = [...state.squares, newSquare];
      return {
        ...state,
        squares: squares,
      };

    case actionTypes.UPDATE_SQUARE:
      return {
        ...state,
        squares: state.squares.map((square) => {
          return square.id === action.payload.id
            ? {
                ...square,
                props: {
                  ...square.props,
                  ...action.payload.props,
                },
              }
            : square;
        }),
      };

    case actionTypes.CLEAR_SHAPE:
      if (action.payload.shape === ShapeTypes.CIRCLE) {
        const newCircles = state.circles.filter((circle) => {
          return circle.id !== action.payload.id;
        });
        return {
          ...state,
          circles: newCircles,
        };
      } else if (action.payload.shape === ShapeTypes.SQUARE) {
        const newSquares = state.squares.filter((square) => {
          return square.id !== action.payload.id;
        });
        return {
          ...state,
          squares: newSquares,
        };
      } else if (action.payload.shape === ShapeTypes.EDGE) {
        const newEdges = state.edges.filter((edge) => {
          return edge.id !== action.payload.id;
        });
        return {
          ...state,
          edges: newEdges,
        };
      }
    case actionTypes.ADD_EDGE:
      return {
        ...state,
        edges: [
          ...state.edges,
          {
            id: action.payload.id,
            props: action.payload.props,
          },
        ],
      };

    case actionTypes.UPDATE_EDGEE:
      return {
        ...state,
        edges: state.edges.map((edge) => {
          return edge.id === action.payload.id
            ? {
                ...edge,
                props: {
                  ...edge.props,
                  ...action.payload.props,
                },
              }
            : edge;
        }),
      };
    case actionTypes.UPDATE_DISTANCE:
      return {
        ...state,
        distance: action.payload.distance,
      };

    default:
      return state;
  }
}

export default codingGame;
