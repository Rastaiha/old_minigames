import * as actionTypes from './actionTypes';

export const updateSets = (set, index) => ({
  type: actionTypes.UPDATE_SETS,
  payload: { set, index },
});

export const updateStateOfSets = (stateOfSet, index) => ({
  type: actionTypes.UPDATE_STATE_OF_SETS,
  payload: { stateOfSet, index },
});

export const updateGuessedNumber = (guessedNumber) => ({
  type: actionTypes.UPDATE_GUESSED_NUMBER,
  payload: { guessedNumber },
});

export const updateInterviewerAnswer = (interviewerNumber, interviewerMessage) => ({
  type: actionTypes.UPDATE_INTERVIEWER_ANSWER,
  payload: { interviewerNumber, interviewerMessage },
});

export const updateQuestionStatus = (isQuestionAsked) => ({
  type: actionTypes.UPDATE_QUESTION_STATUS,
  payload: { isQuestionAsked },
});