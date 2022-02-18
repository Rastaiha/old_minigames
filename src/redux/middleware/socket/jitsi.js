export const JITSI_API = 'JITSI_API';

const SendSocketMessageDispatcher = ({ type, data }) => (
  dispatch,
  getStore
) => {
  //   sendSocketMessage(getStore().socket.socket, {
  //     type,
  //     data,
  //     token: 'get_token', // getStore().account.token
  //     time: new Date(),
  //   });
  //   return dispatch({
  //     type: actionTypes.SEND_SOCKET_MESSAGE,
  //   });
};

export default ({ getState, dispatch }) => (next) => async (action) => {
  const sendJitsiData = action[JITSI_API];
  if (typeof sendJitsiData === 'undefined') {
    return next(action);
  }

  const { socketTypes, type, payload, sendWhiteboard } = sendJitsiData;

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[JITSI_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = socketTypes;
  next(actionWith({ type: requestType, payload }));

  try {
    if (!!sendWhiteboard) {
      dispatch(
        SendSocketMessageDispatcher({
          type,
          data: getState().whiteboard.present,
        })
      );
    } else {
      dispatch(SendSocketMessageDispatcher({ type, data: payload }));
    }
    return next(
      actionWith({
        type: successType,
        payload,
      })
    );
  } catch (error) {
    return next(
      actionWith({
        type: failureType,
        error: error.message || 'Something bad happened',
      })
    );
  }
};
