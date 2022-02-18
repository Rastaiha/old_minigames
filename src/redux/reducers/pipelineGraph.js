import undoable from 'redux-undo';
import {
  pipelineInitialEdges1,
  pipelineInitialVertices1,
} from '../../containers/games/AlgorithmGames/pipelineGraphData';
import gameTypes from '../../containers/games/gameTypes';
import * as actionTypes from '../actions/actionTypes';

function pipelineGraph(
  state = {
    pipelineEdges: [...pipelineInitialEdges1],
    pipelineVertices: [...pipelineInitialVertices1],
    initialVertices: [],
    initialEdges: [],
    addedFlux: 0,
    s: 0,
    t: 5,
  },
  action
) {
  switch (action.type) {
    case actionTypes.CREATE_VERTICE + '_' + gameTypes.PIPELINE_GRAPH.type:
      const newVertice = {
        id: action.payload.id,
        props: action.payload.props,
      };
      const vertices = [...state.pipelineVertices, newVertice];
      return {
        ...state,
        pipelineVertices: vertices,
      };
    case actionTypes.CREATE_EDGE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineEdges: [
          ...state.pipelineEdges,
          {
            id: action.payload.id,
            from: action.payload.from,
            to: action.payload.to,
            filled: 0,
            props: action.payload.props,
          },
        ],
      };
    case actionTypes.INITIAL_VERTICES + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineVertices: action.payload.newVertices,
        initialVertices: action.payload.newVertices,
      };
    case actionTypes.INITIAL_EDGES + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineEdges: action.payload.newEdges,
        initialEdges: action.payload.newEdges,
      };
    case actionTypes.SELECT_EDGE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineEdges: state.pipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: true }
            : edge;
        }),
      };

    case actionTypes.SELECT_VERTICE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineVertices: state.pipelineVertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: true }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_VERTICE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineVertices: state.pipelineVertices.map(function (vertice) {
          return vertice.id === action.payload.id
            ? { ...vertice, isSelected: false }
            : vertice;
        }),
      };

    case actionTypes.DESELECT_EDGE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineEdges: state.pipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, isSelected: false }
            : edge;
        }),
      };

    case actionTypes.UPDATE_VERTICE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineVertices: state.pipelineVertices.map(function (vertice) {
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

    case actionTypes.UPDATE_EDGE + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineEdges: state.pipelineEdges.map(function (edge) {
          return edge.id === action.payload.id
            ? { ...edge, ...action.payload.props }
            : edge;
        }),
      };

    case actionTypes.RESET_GRAPH + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        pipelineVertices: [...pipelineInitialVertices1],
        pipelineEdges: [...pipelineInitialEdges1],
        addedFlux: 0,
      };
    case actionTypes.UPDATE_ADDED_FLUX + '_' + gameTypes.PIPELINE_GRAPH.type:
      return {
        ...state,
        addedFlux: action.payload.newFlux,
      };
    default:
      return state;
  }
}

const undoablePipelineGraph = undoable(pipelineGraph, {
  limit: 40,
  filter: (action, state) => {
    return (
      action.type ===
      actionTypes.UPDATE_EDGE + '_' + gameTypes.PIPELINE_GRAPH.type ||
      action.type ===
      actionTypes.UPDATE_VERTICE + '_' + gameTypes.PIPELINE_GRAPH.type
    );
  },
});

export default undoablePipelineGraph;
