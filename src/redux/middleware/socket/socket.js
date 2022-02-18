import { SendSocketMessageDispatcher } from '../../actions/socket';

export const SEND_SOCKET = 'SEND_SOCKET';

export default ({ getState, dispatch }) => (next) => async (action) => {
  const sendSocketData = action[SEND_SOCKET];
  if (typeof sendSocketData === 'undefined') {
    return next(action);
  }

  const { socketTypes, type, payload, sendWhiteboard } = sendSocketData;

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[SEND_SOCKET];
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
        payload
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
