import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const createVertex = (props, gameType) => ({
  type: actionTypes.CREATE_VERTICE + '_' + gameType,
  payload: { id: makeId(), props },
});

export const createEdge = (from, to, gameType, props) => ({
  type: actionTypes.CREATE_EDGE + '_' + gameType,
  payload: { id: makeId(), from, to, props },
});

export const initialVertices = (newVertices, gameType) => ({
  type: actionTypes.INITIAL_VERTICES + '_' + gameType,
  payload: { newVertices },
});

export const initialEdges = (newEdges, gameType) => ({
  type: actionTypes.INITIAL_EDGES + '_' + gameType,
  payload: { newEdges },
});

export const updateVertex = (id, props, gameType) => {
  return {
    type: actionTypes.UPDATE_VERTICE + '_' + gameType,
    payload: { id, props },
  };
};

export const updateEdge = (id, props, gameType) => ({
  type: actionTypes.UPDATE_EDGE + '_' + gameType,
  payload: { id, props },
});

export const selectVertex = (id, gameType) => ({
  type: actionTypes.SELECT_VERTICE + '_' + gameType,
  payload: { id },
});

export const selectEdge = (id, gameType) => ({
  type: actionTypes.SELECT_EDGE + '_' + gameType,
  payload: { id },
});

export const deselectVertex = (id, gameType) => ({
  type: actionTypes.DESELECT_VERTICE + '_' + gameType,
  payload: { id },
});

export const deselectEdge = (id, gameType) => ({
  type: actionTypes.DESELECT_EDGE + '_' + gameType,
  payload: { id },
});

export const removeSelectedVertices = (gameType) => ({
  type: actionTypes.REMOVE_SELECTED_VERTICES + '_' + gameType,
});

export const removeSelectedEdges = (gameType) => ({
  type: actionTypes.REMOVE_SELECTED_EDGES + '_' + gameType,
});

export const deleteVertex = (id, gameType) => ({
  type: actionTypes.DELETE_VERTEX + '_' + gameType,
  payload: { id },
});

export const deleteEdge = (id, gameType) => ({
  type: actionTypes.DELETE_EDGE + '_' + gameType,
  payload: { id },
});

export const resetGraph = (gameType) => ({
  type: actionTypes.RESET_GRAPH + '_' + gameType,
  payload: {},
});

export const updateCost = (cost, gameType) => ({
  type: actionTypes.UPDATE_COST + '_' + gameType,
  payload: { cost },
});

export const updateAddedFlux = (newFlux, gameType) => ({
  type: actionTypes.UPDATE_ADDED_FLUX + '_' + gameType,
  payload: { newFlux },
});
