import * as actionTypes from '../actions/actionTypes';
import gameTypes from '../../containers/games/gameTypes';
import makeId from '../../utils/makeId';

function dormGraph(
  state = {
    dormVertices: [],
    dormEdges: [],
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_VERTICE + '_' + gameTypes.DORM_GAME.type:
      const newVertice = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const vertices = [...state.dormVertices, newVertice];
      return {
        ...state,
        dormVertices: vertices,
      };
    case actionTypes.CREATE_EDGE + '_' + gameTypes.DORM_GAME.type:
      return {
        ...state,
        dormEdges: [
          ...state.dormEdges,
          {
            id: action.payload.id,
            from: action.payload.from,
            to: action.payload.to,
            props: action.payload.props,
          },
        ],
      };

    case actionTypes.UPDATE_VERTICE + '_' + gameTypes.DORM_GAME.type:
      return {
        ...state,
        dormVertices: state.dormVertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? {
              ...vertice,
              props: {
                ...vertice.props,
                ...action.payload.props,
              },
            }
            : vertice;
        }),
      };

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.DORM_GAME.type:
      return {
        ...state,
        dormEdges: state.dormEdges.map(function (edge) {
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

    case actionTypes.SELECT_VERTICE + '_' + gameTypes.DORM_GAME.type:
      return {
        ...state,
        dormVertices: state.dormVertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: true }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_VERTICE + '_' + gameTypes.DORM_GAME.type:
      return {
        ...state,
        dormVertices: state.dormVertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: false }
            : vertice;
        }),
      };
    case actionTypes.DELETE_VERTEX + '_' + gameTypes.DORM_GAME.type:
      const _vertices = state.dormVertices.filter((vertex) => {
        return vertex.id !== action.payload.id;
      });
      return {
        ...state,
        dormVertices: _vertices,
      };

    case actionTypes.DELETE_EDGE + '_' + gameTypes.DORM_GAME.type:
      const _edges = state.dormEdges.filter((edge) => {
        return edge.id !== action.payload.id;
      });
      return {
        ...state,
        dormEdges: _edges,
      };

    default:
      return state;
  }
}

export default dormGraph;
