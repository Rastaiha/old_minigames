import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

export const signup = ({ user }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
    url: urls.SIGNUP,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: getFormData(user),
    },
  },
});

export const getUserInfo = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_USER_INFO_REQUEST,
      actionTypes.GET_USER_INFO_SUCCESS,
      actionTypes.GET_USER_INFO_FAILURE,
    ],
    url: urls.GET_USER_INFO,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getTeams = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_TEAMS_REQUEST,
      actionTypes.GET_TEAMS_SUCCESS,
      actionTypes.GET_TEAMS_FAILURE,
    ],
    url: urls.GET_TEAMS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getTeam = ({ team_uuid }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_TEAM_REQUEST,
      actionTypes.GET_TEAM_SUCCESS,
      actionTypes.GET_TEAM_FAILURE,
    ],
    url: urls.GET_TEAM + '?uuid=' + team_uuid,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getNotification = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_NOTIFICATIONS_REQUEST,
      actionTypes.GET_NOTIFICATIONS_SUCCESS,
      actionTypes.GET_NOTIFICATIONS_FAILURE,
    ],
    url: urls.GET_NOTIFICATIONS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const requestMentor = () => ({
  [CALL_API]: {
    types: [
      actionTypes.REQUEST_MENTOR_REQUEST,
      actionTypes.REQUEST_MENTOR_SUCCESS,
      actionTypes.REQUEST_MENTOR_FAILURE,
    ],
    url: urls.REQUEST_MENTOR,
    fetchOptions: {
      method: 'POST',
    },
  },
});

export const goToTeam = ({ team_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GO_TO_TEAM_REQUEST,
      actionTypes.GO_TO_TEAM_SUCCESS,
      actionTypes.GO_TO_TEAM_FAILURE,
    ],
    url: urls.GO_TO_TEAM,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        team: team_id,
      }),
    },
  },
});

export const groupSignup = ({ data, document1, document2, document3 }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GROUP_SIGNUP_REQUEST,
      actionTypes.GROUP_SIGNUP_SUCCESS,
      actionTypes.GROUP_SIGNUP_FAILURE,
    ],
    url: urls.GROUP_SIGNUP,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: getFormData({
        data: JSON.stringify(data),
        document1,
        document2,
        document3,
      }),
    },
  },
});

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    url: urls.LOGIN,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
  },
});

export const changePassword = (newPass) => ({
  [CALL_API]: {
    types: [
      actionTypes.CHANGE_PASSWORD_REQUEST,
      actionTypes.CHANGE_PASSWORD_SUCCESS,
      actionTypes.CHANGE_PASSWORD_FAILURE,
    ],
    url: urls.CHANGE_PASSWORD,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ newPass }),
    },
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: urls.LOGOUT,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const checkPayment = () => ({
  [CALL_API]: {
    types: [
      actionTypes.CHECK_PAYMENT_REQUEST,
      actionTypes.CHECK_PAYMENT_SUCCESS,
      actionTypes.CHECK_PAYMENT_FAILURE,
    ],
    url: urls.CHECK_PAYMENT,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const removePaymentData = () => ({
  type: actionTypes.REMOVE_PAYMENT_DATA,
});

export const sendSolution = (form) => ({
  [CALL_API]: {
    types: [
      actionTypes.SEND_SOLUTION_REQUEST,
      actionTypes.SEND_SOLUTION_SUCCESS,
      actionTypes.SEND_SOLUTION_FAILURE,
    ],
    url: urls.SEND_SOLUTION,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: getFormData(form),
    },
  },
});

export const disableSignuping = () => ({
  type: actionTypes.DISABLE_SIGNUPING,
});
