import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const create = ({ name }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_FSM_REQUEST,
      actionTypes.CREATE_FSM_SUCCESS,
      actionTypes.CREATE_FSM_FAILURE,
    ],
    url: urls.CREATE_FSM,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ name }),
    },
  },
});

export const getCurrentPage = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CURRENT_PAGE_REQUEST,
      actionTypes.GET_CURRENT_PAGE_SUCCESS,
      actionTypes.GET_CURRENT_PAGE_FAILURE,
    ],
    url: urls.GET_CURRENT_PAGE,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const moveToNextState = () => ({
  [CALL_API]: {
    types: [
      actionTypes.MOVE_TO_NEXT_STATE_REQUEST,
      actionTypes.MOVE_TO_NEXT_STATE_SUCCESS,
      actionTypes.MOVE_TO_NEXT_STATE_FAILURE,
    ],
    url: urls.MOVE_TO_NEXT_STATE,
    fetchOptions: {
      method: 'POST',
    },
  },
});

export const getWorkshops = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_FSM_REQUEST,
      actionTypes.GET_FSM_SUCCESS,
      actionTypes.GET_FSM_FAILURE,
    ],
    url: urls.CREATE_FSM,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const submitTeam = ({ grade, team_id, state_id, edge_id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SUBMIT_TEAM_REQUEST,
      actionTypes.SUBMIT_TEAM_SUCCESS,
      actionTypes.SUBMIT_TEAM_FAILURE,
    ],
    url: urls.SUBMIT_TEAM,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        grade,
        end_time: new Date(),
        team: team_id,
        state: state_id,
        edge: edge_id,
      }),
    },
  },
});

export const setFirstCurrentPage = ({ fsm }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SET_FIRST_CURRENT_PAGE_REQUEST,
      actionTypes.SET_FIRST_CURRENT_PAGE_SUCCESS,
      actionTypes.SET_FIRST_CURRENT_PAGE_FAILURE,
    ],
    url: urls.SET_FIRST_CURRENT_PAGE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        fsm,
      }),
    },
  },
});

export const sendAnswer = ({ answer_type, answer, problemId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SEND_ANSWER_REQUEST,
      actionTypes.SEND_ANSWER_SUCCESS,
      actionTypes.SEND_ANSWER_FAILURE,
    ],
    url: urls.SEND_ANSWER,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        answer: {
          answer_type,
          text: answer,
        },
        problem: problemId,
      }),
    },
  },
});

export const deletePage = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.DELETE_PAGE_REQUEST,
      actionTypes.DELETE_PAGE_SUCCESS,
      actionTypes.DELETE_PAGE_FAILURE,
    ],
    url: urls.CREATE_STATE + id + '/',
    fetchOptions: {
      method: 'DELETE',
    },
  },
});

export const deleteWidget = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.DELETE_WIDGET_REQUEST,
      actionTypes.DELETE_WIDGET_SUCCESS,
      actionTypes.DELETE_WIDGET_FAILURE,
    ],
    url: urls.CREATE_WIDGET + id + '/',
    fetchOptions: {
      method: 'DELETE',
    },
  },
});

export const getWorkshop = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_WORKSHOP_REQUEST,
      actionTypes.GET_WORKSHOP_SUCCESS,
      actionTypes.GET_WORKSHOP_FAILURE,
    ],
    url: urls.CREATE_FSM + id,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getPages = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PAGES_REQUEST,
      actionTypes.GET_PAGES_SUCCESS,
      actionTypes.GET_PAGES_FAILURE,
    ],
    url: urls.GET_PAGES,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const createState = ({ stateName, FSMId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_STATE_REQUEST,
      actionTypes.CREATE_STATE_SUCCESS,
      actionTypes.CREATE_STATE_FAILURE,
    ],
    url: urls.CREATE_STATE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        widgets: [],
        page_type: 'team',
        state: {
          name: stateName,
          fsm: FSMId,
        },
      }),
    },
  },
});

export const editEdges = ({ tail, edges }) => ({
  [CALL_API]: {
    types: [
      actionTypes.EDIT_EDGES_REQUEST,
      actionTypes.EDIT_EDGES_SUCCESS,
      actionTypes.EDIT_EDGES_FAILURE,
    ],
    url: urls.EDIT_EDGES,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ tail, edges }),
    },
  },
});

export const getState = ({ id }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_STATE_REQUEST,
      actionTypes.GET_STATE_SUCCESS,
      actionTypes.GET_STATE_FAILURE,
    ],
    url: urls.GET_STATE + id + '/',
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getTeamOutwardEdges = ({ team_uuid }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_TEAM_OUTWARD_EDGES_REQUEST,
      actionTypes.GET_TEAM_OUTWARD_EDGES_SUCCESS,
      actionTypes.GET_TEAM_OUTWARD_EDGES_FAILURE,
    ],
    url: urls.GET_TEAM_OUTWARD_EDGES,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        uuid: team_uuid,
      }),
    },
    payload: {
      team_uuid,
    },
  },
});

export const createWidget = ({
  pageId,
  priority = 1,
  widget_type,
  name,
  text,
  link,
  answer,
  choices,
}) => {
  const body = {
    page: pageId,
    priority,
    widget_type,
    name,
  };
  if (
    widget_type === 'Game' ||
    widget_type === 'Video' ||
    widget_type === 'Image'
  ) {
    body.link = link;
  }
  if (widget_type === 'Description') {
    body.text = text;
  }
  if (
    widget_type === 'ProblemSmallAnswer' ||
    widget_type === 'ProblemBigAnswer' ||
    widget_type === 'ProblemMultiChoice'
  ) {
    body.text = text;
    body.answer = { text: answer };
  }
  if (widget_type === 'ProblemMultiChoice') {
    body.choices = choices;
  }

  return {
    [CALL_API]: {
      types: [
        actionTypes.CREATE_WIDGET_REQUEST,
        actionTypes.CREATE_WIDGET_SUCCESS,
        actionTypes.CREATE_WIDGET_FAILURE,
      ],
      url: urls.CREATE_WIDGET,
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify(body),
      },
    },
  };
};

export const getWidget = ({ widgetId }) => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.GET_WIDGET_REQUEST,
        actionTypes.GET_WIDGET_SUCCESS,
        actionTypes.GET_WIDGET_FAILURE,
      ],
      url: urls.CREATE_WIDGET + widgetId,
      fetchOptions: {
        method: 'GET',
      },
    },
  };
};
