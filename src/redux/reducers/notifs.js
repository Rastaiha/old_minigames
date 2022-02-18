import * as actionTypes from '../actions/actionTypes';

function notifs(state = { unreads: [] }, action) {
  switch (action.type) {
    case actionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        unreads: action.response.unread_list.map(
          (unread) => unread.actor_object_id
        ),
      };
    default:
      return state;
  }
}

export default notifs;
