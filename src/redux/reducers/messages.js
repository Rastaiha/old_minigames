import * as actionTypes from '../actions/actionTypes';

function addMessaage({ state, type, text, mode }) {
  return {
    ...state,
    messages: [...state.messages, { type, text, mode }],
  };
}

function addSuccessMessage({ state, text, mode }) {
  return addMessaage({ state, type: 'success', text, mode });
}

function addErrorMessage({ state, text, mode }) {
  return addMessaage({ state, type: 'error', text, mode });
}

function addRedirect({ state, to }) {
  return {
    ...state,
    redirects: [...state.redirects, { to }],
  };
}

function messages(state = { messages: [], redirects: [] }, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return addRedirect({
        state: addSuccessMessage({
          state,
          text: 'رمز شما با موفقیت تغییر کرد.',
        }),
        to: '/',
      });
    case actionTypes.SUBMIT_TEAM_SUCCESS:
      return addRedirect({
        state: addSuccessMessage({
          state,
          text: 'نمره و انتقال با موفقیت ثبت شد.',
        }),
        to: '/mentor',
      });

    case actionTypes.SEND_SOLUTION_SUCCESS:
      return addSuccessMessage({
        state,
        text: 'جواب شما با موفقیت ثبت شد.',
        mode: 'alert',
      });

    // case actionTypes.GET_NOTIFICATIONS_SUCCESS:
    //   return addErrorMessage({
    //     state,
    //     text:
    //       'تیم‌های ' +
    //       action.response.unread_list.map((unread) => unread.actor_object_id) +
    //       ' درخواست منتور دارند.',
    //   });

    case actionTypes.REQUEST_MENTOR_SUCCESS:
      return addSuccessMessage({
        state,
        text: action.response.text,
      });
    case actionTypes.GROUP_SIGNUP_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return addRedirect({
        state: addSuccessMessage({
          state,
          text:
            'ثبت‌نام با موفقیت انجام شد. ایمیل فعالسازی حساب کاربری برای شما ارسال شد.',
        }),
        to: '/',
      });
    case actionTypes.LOGIN_SUCCESS:
      return addRedirect({
        state: addSuccessMessage({
          state,
          text: 'خوش اومدی.',
        }),
        to: '/',
      });
    case actionTypes.EDIT_EDGES_SUCCESS:
      return addSuccessMessage({
        state,
        text: 'تغییر ثبت شد!',
      });
    case actionTypes.LOGOUT_REQUEST:
      return addRedirect({ state, to: '/' });

    case actionTypes.CHECK_PAYMENT_SUCCESS:
      return addRedirect({ state, to: '/payment' });

    case actionTypes.CREATE_FSM_SUCCESS:
      return addRedirect({ state, to: '/fsm/' + action.response.id });

    case actionTypes.CREATE_FSM_FAILURE:
    case actionTypes.GET_FSM_FAILURE:
    case actionTypes.SEND_SOLUTION_FAILURE:
    case actionTypes.CHECK_PAYMENT_FAILURE:
    case actionTypes.GROUP_SIGNUP_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
    case actionTypes.LOGIN_FAILURE:
      return addErrorMessage({ state, text: action.error });
    case actionTypes.SHIFT_MESSAGE:
      return {
        ...state,
        messages: state.messages.slice(1),
      };
    case actionTypes.SHIFT_REDIRECT:
      return {
        ...state,
        redirects: state.redirects.slice(1),
      };
    default:
      return state;
  }
}

export default messages;
