import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const createAuction = ({ values, auction_pay_type }) => ({
  [CALL_API]: {
    types: [
      actionTypes.CREATE_AUCTION_REQUEST,
      actionTypes.CREATE_AUCTION_SUCCESS,
      actionTypes.CREATE_AUCTION_FAILURE,
    ],
    url: urls.CREATE_AUCTION,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        values,
        auction_pay_type,
      }),
    },
  },
});

export const joinAuction = () => ({
  [CALL_API]: {
    types: [
      actionTypes.JOIN_AUCTION_REQUEST,
      actionTypes.JOIN_AUCTION_SUCCESS,
      actionTypes.JOIN_AUCTION_FAILURE,
    ],
    url: urls.JOIN_AUCTION,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const bid = ({ auction, bid }) => ({
  [CALL_API]: {
    types: [
      actionTypes.BID_REQUEST,
      actionTypes.BID_SUCCESS,
      actionTypes.BID_FAILURE,
    ],
    url: urls.AUCTION_BID,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({
        auction,
        bid,
      }),
    },
  },
});

export const getResult = () => ({
  [CALL_API]: {
    types: [
      actionTypes.AUCTION_RESULT_REQUEST,
      actionTypes.AUCTION_RESULT_SUCCESS,
      actionTypes.AUCTION_RESULT_FAILURE,
    ],
    url: urls.AUCTION_RESULT,
    fetchOptions: {
      method: 'GET',
    },
  },
});
export const restartAuction = () => ({
  type: actionTypes.RESTART_AUCTION,
});
