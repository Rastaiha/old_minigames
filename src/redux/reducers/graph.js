import * as actionTypes from '../actions/actionTypes';
import gameTypes from '../../containers/games/gameTypes';

var tempCapacity = 2;

function graph(
  state = {
    vertices: [],
    edges: [],
    edgesCostSum: 0,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_VERTICE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      const newVertice = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const vertices = [...state.vertices, newVertice];
      return {
        ...state,
        vertices: vertices,
      };

    case actionTypes.CREATE_EDGE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edges: [
          ...state.edges,
          {
            id: action.payload.id,
            from: action.payload.from,
            to: action.payload.to,
            capacity: ++tempCapacity,
            filled: 0,
            a: 2,
            b: 5,
            weight: 0,
            props: action.payload.props,
          },
        ],
      };

    case actionTypes.SELECT_VERTICE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        vertices: state.vertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: true }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_VERTICE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        vertices: state.vertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: false }
            : vertice;
        }),
      };

    case actionTypes.SELECT_EDGE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edges: state.edges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: true }
            : edge;
        }),
      };

    case actionTypes.DESELECT_EDGE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edges: state.edges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: false }
            : edge;
        }),
      };

    case actionTypes.UPDATE_VERTICE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        vertices: state.vertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, props: action.payload.props }
            : vertice;
        }),
      };

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edges: state.edges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, ...action.payload.props }
            : edge;
        }),
      };

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edges: state.edges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, props: action.payload.props }
            : edge;
        }),
      };

    case actionTypes.REMOVE_SELECTED_VERTICES +
      '_' +
      gameTypes.GAME_THEORY_GRAPH.type:
      const _vertices = state.vertices.map(function (vertice) {
        return vertice.id === action.payload.id ? null : vertice;
      });
      return {
        ...state,
        vertices: _vertices,
      };

    case actionTypes.REMOVE_SELECTED_EDGES +
      '_' +
      gameTypes.GAME_THEORY_GRAPH.type:
      const _edges = state.edges.map(function (edge) {
        return edge.id === action.payload.id ? null : edge;
      });
      return {
        ...state,
        edges: _edges,
      };
    case actionTypes.UPDATE_COST + '_' + gameTypes.GAME_THEORY_GRAPH.type:
      return {
        ...state,
        edgesCostSum: action.payload.cost,
      }

    default:
      return state;
  }
}

export default graph;
