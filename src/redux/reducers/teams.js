import * as actionTypes from '../actions/actionTypes';

function teams(state = { teams: [], currentOutwardEdges: [] }, action) {
  switch (action.type) {
    case actionTypes.GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.response,
      };
    case actionTypes.GET_TEAM_SUCCESS:
      return {
        ...state,
        teams: [
          ...state.teams.filter(
            (team) => team.team_id !== action.response.team_id
          ),
          action.response,
        ],
      };
    case actionTypes.GET_TEAM_OUTWARD_EDGES_REQUEST:
      return {
        ...state,
        currentOutwardEdges: [],
      };
    case actionTypes.GET_TEAM_OUTWARD_EDGES_SUCCESS:
      return {
        ...state,
        currentOutwardEdges: action.response,
      };
    default:
      return state;
  }
}

export default teams;
