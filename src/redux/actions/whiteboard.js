import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';
import { SEND_SOCKET } from '../middleware/socket/socket';
import { PASS_DRAWING_STATE } from './socketActionTypes';

export const deselectNode = (node_id) => ({
  type: actionTypes.DESELECT_NODE,
  payload: { node_id },
});


export const init = () => ({
  type: actionTypes.INIT_WHITEBOARD
});

export const deselectNodes = () => ({
  type: actionTypes.DESELECT_NODES,
});

export const selectNode = (node_id) => ({
  type: actionTypes.SELECT_NODE,
  payload: { node_id },
});

export const addNode = (
  type,
  shapeProps,
  transformerProps = {},
  id = makeId()
) => {
  if (type === 'LINE') {
    return {
      type: actionTypes.ADD_NODE_REQUEST,
      payload: {
        node: {
          isSelected: false,
          id,
          type,
          shapeProps,
          transformerProps,
        },
      },
    };
  }
  return {
    [SEND_SOCKET]: {
      socketTypes: [
        actionTypes.ADD_NODE_REQUEST,
        actionTypes.ADD_NODE_SUCCESS,
        actionTypes.ADD_NODE_FAILURE,
      ],
      payload: {
        node: {
          isSelected: false,
          id,
          type,
          shapeProps,
          transformerProps,
        },
      },
      type: PASS_DRAWING_STATE,
      sendWhiteboard: true,
    },
  };
};

export const updateShapeProps = (node_id, shapeProps) => ({
  [SEND_SOCKET]: {
    socketTypes: [
      actionTypes.UPDATE_SHAPE_PROPS_REQUEST,
      actionTypes.UPDATE_SHAPE_PROPS_SUCCESS,
      actionTypes.UPDATE_SHAPE_PROPS_FAILURE,
    ],
    payload: {
      node_id,
      shapeProps,
    },
    type: PASS_DRAWING_STATE,
    sendWhiteboard: true,
  },
});

export const addPointsToLine = (node_id, points) => ({
  type: actionTypes.ADD_POINTS_TO_LINE,
  payload: {
    node_id,
    points,
  },
});

export const completeLine = (node_id) => ({
  [SEND_SOCKET]: {
    socketTypes: [
      actionTypes.COMPLETE_LINE_REQUEST,
      actionTypes.COMPLETE_LINE_SUCCESS,
      actionTypes.COMPLETE_LINE_FAILURE,
    ],
    payload: {
      node_id,
    },
    type: PASS_DRAWING_STATE,
    sendWhiteboard: true,
  },
});

export const changeMode = (mode) => ({
  type: actionTypes.CHANGE_MODE,
  payload: {
    mode,
  },
});

export const removeSelectednodes = () => ({
  [SEND_SOCKET]: {
    socketTypes: [
      actionTypes.REMOVE_SELECTED_NODES_REQUEST,
      actionTypes.REMOVE_SELECTED_NODES_SUCCESS,
      actionTypes.REMOVE_SELECTED_NODES_FAILURE,
    ],
    type: PASS_DRAWING_STATE,
    sendWhiteboard: true,
  },
});

export const updateWhiteboard = (state) => ({
  type: actionTypes.UPDATE_WHITEBOARD,
  payload: {
    state,
  },
});
