import * as actionTypes from '../actions/actionTypes';

export default function socket(
  state = {
    connected: false,
    socket: null,
  },
  action
) {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECTION_INIT:
      return { ...state, connected: false, socket: action.socket };

    case actionTypes.CLOSE_SOCKET_CONNECTION:
      state.socket && state.socket.close();
      return { ...state, connected: false, socket: null };

    case actionTypes.SOCKET_CONNECTION_SUCCESS:
      return { ...state, connected: true };

    case actionTypes.SOCKET_CONNECTION_ERROR:
      return { ...state, connected: false };

    case actionTypes.SOCKET_CONNECTION_CLOSED:
      return { ...state, connected: false, socket: null };

    default:
      return state;
  }
}
