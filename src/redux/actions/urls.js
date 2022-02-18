export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://rastaiha.ir/api/'
    : 'https://rastaiha.ir/api/';

export const SIGNUP = ROOT.concat('auth/individualSignup/');
export const GROUP_SIGNUP = ROOT.concat('auth/groupSignup/');
export const LOGIN = ROOT.concat('auth/token/obtain/');
export const CHANGE_PASSWORD = ROOT.concat('auth/changePass/');
export const LOGOUT = ROOT.concat('auth/logout/');
export const CHECK_PAYMENT = ROOT.concat('auth/pay/');
export const SEND_SOLUTION = ROOT.concat('auth/answerFile/');
export const CREATE_FSM = ROOT.concat('fsm/fsm/');
export const CREATE_STATE = ROOT.concat('fsm/page/');
export const CREATE_WIDGET = ROOT.concat('fsm/widget/');
export const EDIT_EDGES = ROOT.concat('fsm/editedges/');
export const GET_STATE = ROOT.concat('fsm/state/');
export const GET_PAGES = ROOT.concat('fsm/page/');
export const SUBMIT_TEAM = ROOT.concat('fsm/submitteam/');
export const SET_FIRST_CURRENT_PAGE = ROOT.concat(
  'fsm/set_first_current_page/'
);
export const GET_USER_INFO = ROOT.concat('auth/userInfo/');
export const GET_TEAMS = ROOT.concat('auth/teams/');
export const GET_TEAM = ROOT.concat('auth/teamInfo/');
export const GET_TEAM_OUTWARD_EDGES = ROOT.concat('fsm/getteamoutwardedges/');
export const GO_TO_TEAM = ROOT.concat('fsm/gototeam/');
export const GET_NOTIFICATIONS = ROOT.concat('notifications/api/unread_list/');
export const GET_CURRENT_PAGE = ROOT.concat('fsm/getcurrentpage/');
export const REQUEST_MENTOR = ROOT.concat('fsm/requestmentor/');
export const SEND_ANSWER = ROOT.concat('fsm/sendanswer/');
export const MOVE_TO_NEXT_STATE = ROOT.concat('fsm/movetonextstate/');

//auction:
export const AUCTION_RESULT = ROOT.concat('auction/result/');
export const CREATE_AUCTION = ROOT.concat('auction/create/');
export const JOIN_AUCTION = ROOT.concat('auction/lastAuction/');
export const AUCTION_BID = ROOT.concat('auction/bid/');
