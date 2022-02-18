import {
  secondEdges,
  secondVertices,
} from '../../containers/games/GameTheoryGames/graphsData';
import gameTypes from '../../containers/games/gameTypes';
import * as actionTypes from '../actions/actionTypes';

function secondTrafficGraph(
  state = {
    secondVerices: [...secondVertices],
    secondEdges: [...secondEdges],
    secondEdgesCostSum: 0,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_VERTICE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      const newVertice = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const vertices = [...state.secondVerices, newVertice];
      return {
        ...state,
        secondVerices: vertices,
      };

    case actionTypes.CREATE_EDGE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdges: [
          ...state.secondEdges,
          {
            id: action.payload.id,
            from: action.payload.from,
            to: action.payload.to,
            filled: 0,
            a: 2,
            b: 5,
            weight: 0,
            props: action.payload.props,
          },
        ],
      };

    case actionTypes.SELECT_VERTICE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondVerices: state.secondVerices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: true }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_VERTICE +
      '_' +
      gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondVerices: state.secondVerices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: false }
            : vertice;
        }),
      };

    case actionTypes.SELECT_EDGE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdges: state.secondEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: true }
            : edge;
        }),
      };

    case actionTypes.DESELECT_EDGE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdges: state.secondEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: false }
            : edge;
        }),
      };

    case actionTypes.UPDATE_VERTICE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondVerices: state.secondVerices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, props: action.payload.props }
            : vertice;
        }),
      };

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdges: state.secondEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, ...action.payload.props }
            : edge;
        }),
      };

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdges: state.secondEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, props: action.payload.props }
            : edge;
        }),
      };

    case actionTypes.REMOVE_SELECTED_VERTICES +
      '_' +
      gameTypes.SECOND_TRAFFIC_GAME.type:
      const _vertices = state.secondVerices.map(function (vertice) {
        return vertice.id === action.payload.id ? null : vertice;
      });
      return {
        ...state,
        secondVerices: _vertices,
      };

    case actionTypes.REMOVE_SELECTED_EDGES +
      '_' +
      gameTypes.SECOND_TRAFFIC_GAME.type:
      const _edges = state.secondEdges.map(function (edge) {
        return edge.id === action.payload.id ? null : edge;
      });
      return {
        ...state,
        secondEdges: _edges,
      };
    case actionTypes.UPDATE_COST + '_' + gameTypes.SECOND_TRAFFIC_GAME.type:
      return {
        ...state,
        secondEdgesCostSum: action.payload.cost,
      };

    default:
      return state;
  }
}

export default secondTrafficGraph;
