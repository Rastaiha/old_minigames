import * as actionTypes from '../actions/actionTypes';
import gameTypes from '../../containers/games/gameTypes';
import undoable from 'redux-undo';
import makeId from '../../utils/makeId';
import {
  pipelineInitialVertices2,
  pipelineInitialEdges2,
} from '../../containers/games/AlgorithmGames/pipelineGraphData';

function secondPipelineGraph(
  state = {
    secondPipelineEdges: [...pipelineInitialEdges2],
    secondPipelineVertices: [...pipelineInitialVertices2],
    addedFlux: 0,
    s: 0,
    t: 9,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_VERTICE +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      const newVertice = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const vertices = [...state.secondPipelineVertices, newVertice];
      return {
        ...state,
        secondPipelineVertices: vertices,
      };
    case actionTypes.CREATE_EDGE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineEdges: [
          ...state.secondPipelineEdges,
          {
            id: action.payload.id,
            from: action.payload.from,
            to: action.payload.to,
            filled: 0,
            props: action.payload.props,
          },
        ],
      };
    case actionTypes.INITIAL_VERTICES +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineVertices: action.payload.newVertices,
        initialVertices: action.payload.newVertices,
      };
    case actionTypes.INITIAL_EDGES + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineEdges: action.payload.newEdges,
        initialEdges: action.payload.newEdges,
      };
    case actionTypes.SELECT_EDGE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineEdges: state.secondPipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: true }
            : edge;
        }),
      };

    case actionTypes.SELECT_VERTICE +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineVertices: state.secondPipelineVertices.map(function (
          vertice
        ) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: true }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_VERTICE +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineVertices: state.secondPipelineVertices.map(function (
          vertice
        ) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: false }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_EDGE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineEdges: state.secondPipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: false }
            : edge;
        }),
      };

    case actionTypes.UPDATE_VERTICE +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineVertices: state.secondPipelineVertices.map(function (
          vertice
        ) {
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

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineEdges: state.secondPipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, ...action.payload.props }
            : edge;
        }),
      };

    case actionTypes.RESET_GRAPH + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        secondPipelineVertices: [...pipelineInitialVertices2],
        secondPipelineEdges: [...pipelineInitialEdges2],
        addedFlux: 0,
      };
    case actionTypes.UPDATE_ADDED_FLUX +
      '_' +
      gameTypes.SECOND_PIPELINE_GRAPH.type:
      return {
        ...state,
        addedFlux: action.payload.newFlux,
      };
    default:
      return state;
  }
}

const undoablePipelineGraph = undoable(secondPipelineGraph, {
  limit: 40,
  filter: (action, state) => {
    return (
      action.type ===
      actionTypes.UPDATE_EDGE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type ||
      action.type ===
      actionTypes.UPDATE_VERTICE + '_' + gameTypes.SECOND_PIPELINE_GRAPH.type
    );
  },
});

export default undoablePipelineGraph;
