import undoable from 'redux-undo';
import * as actionTypes from '../actions/actionTypes';

import DrawingModes from './whiteboardModes';
const init = {
  mode: DrawingModes.MOVE,
  paint: {
    stroke: 'black',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    tension: 0.5,
    lastUpdate: null,
  },
  nodes: [],
};
function whiteboard(state = init, action) {
  switch (action.type) {
    case actionTypes.INIT_WHITEBOARD:
      return init;
    case actionTypes.UPDATE_WHITEBOARD:
      if (!action.payload.state.lastUpdate) {
        return state;
      }
      if (!state.lastUpdate) {
        return {
          ...action.payload.state,
          mode: state.mode
        };
      }
      action.payload.state.lastUpdate = new Date(
        action.payload.state.lastUpdate
      );
      state.lastUpdate = new Date(state.lastUpdate);
      if (
        action.payload.state.lastUpdate.getTime() > state.lastUpdate.getTime()
      ) {
        return {
          ...action.payload.state,
          mode: state.mode
        };
      }
      return state;

    case actionTypes.DESELECT_NODES:
      return {
        ...state,
        nodes: state.nodes.map(function (node) {
          return { ...node, isSelected: false };
        }),
      };
    case actionTypes.DESELECT_NODE:
      return {
        ...state,
        nodes: state.nodes.map(function (node) {
          return node.id === action.payload.node_id
            ? { ...node, isSelected: false }
            : node;
        }),
      };
    case actionTypes.SELECT_NODE:
      return {
        ...state,
        nodes: state.nodes.map(function (node) {
          return node.id === action.payload.node_id
            ? { ...node, isSelected: true }
            : node;
        }),
      };
    case actionTypes.ADD_NODE_REQUEST:
      if (action.payload.node.type === 'LINE') {
        state.isPainting = true;
      }
      return {
        ...state,
        lastUpdate: new Date(),
        nodes: [...state.nodes, action.payload.node],
      };
    case actionTypes.UPDATE_SHAPE_PROPS_REQUEST:
      return {
        ...state,
        lastUpdate: new Date(),
        nodes: state.nodes.map(function (node) {
          return node.id === action.payload.node_id
            ? { ...node, shapeProps: action.payload.shapeProps }
            : node;
        }),
      };
    case actionTypes.ADD_POINTS_TO_LINE:
      return {
        ...state,
        lastUpdate: new Date(),
        nodes: state.nodes.map(function (node) {
          if (node.id === action.payload.node_id && node.type === 'LINE') {
            const points = [
              ...node.shapeProps.points,
              ...action.payload.points,
            ];
            return {
              ...node,
              shapeProps: {
                ...node.shapeProps,
                points,
              },
            };
          } else {
            return node;
          }
        }),
      };
    case actionTypes.COMPLETE_LINE_REQUEST:
      return {
        ...state,
        lastUpdate: new Date(),
        isPainting: false,
      };
    case actionTypes.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
      };
    case actionTypes.REMOVE_SELECTED_NODES_REQUEST:
      return {
        ...state,
        lastUpdate: new Date(),
        nodes: state.nodes.filter((node) => !node.isSelected),
      };
    default:
      return state;
  }
}

const undoableWhiteboard = undoable(whiteboard, {
  limit: 20,
  filter: (action, state) => {
    return (
      (action.type === actionTypes.ADD_NODE_REQUEST && !state.isPainting) ||
      action.type === actionTypes.UPDATE_SHAPE_PROPS_REQUEST ||
      action.type === actionTypes.REMOVE_SELECTED_NODES_REQUEST ||
      action.type === actionTypes.COMPLETE_LINE_REQUEST
    );
  },
});

export default undoableWhiteboard;
