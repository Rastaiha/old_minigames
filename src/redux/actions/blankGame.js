import * as actionTypes from './actionTypes';
import makeId from '../../utils/makeId';

export const updateBlank = (newText, blankIndex, gameIndex) => ({
  type: actionTypes.UPDATE_BLANK,
  payload: { newText, blankIndex, gameIndex },
});

export const updateBlankSituation = (newSituation, blankIndex, gameIndex) => ({
  type: actionTypes.UPDATE_BLANK_SITUATION,
  payload: { newSituation, blankIndex, gameIndex },
});
