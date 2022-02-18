import * as actionTypes from '../actions/actionTypes';

const Q_number = 8;

export default function x_questions(
  state = {
    guessedNumber: '',
    interviewerNumber: '',
    interviewerMessage: '',
    isQuestionAsked: false,
    sets: Array.from(Array(Q_number).keys(), x => ''),
    stateOfSets: Array.from(Array(Q_number).keys(), x => 0),
  },
  action
) {
  switch (action.type) {

    case actionTypes.UPDATE_GUESSED_NUMBER:
      return {
        ...state,
        guessedNumber: action.payload.guessedNumber,
      };

    case actionTypes.UPDATE_INTERVIEWER_ANSWER:
      return {
        ...state,
        interviewerNumber: action.payload.interviewerNumber,
        interviewerMessage: action.payload.interviewerMessage,
      };

    case actionTypes.UPDATE_QUESTION_STATUS:
      return {
        ...state,
        isQuestionAsked: action.payload.isQuestionAsked,
      };

    case actionTypes.UPDATE_SETS:
      {
        const { set, index } = action.payload;
        let newSets = state.sets;
        newSets[index] = set;
        return {
          ...state,
          sets: JSON.parse(JSON.stringify(newSets)),
        };
      }

    case actionTypes.UPDATE_STATE_OF_SETS:
      {
        const { stateOfSet, index } = action.payload;
        let newStateofSets = state.stateOfSets;
        newStateofSets[index] = stateOfSet;
        return {
          ...state,
          stateOfSets: JSON.parse(JSON.stringify(newStateofSets)),
        };
      }
    default:
      return state;
  }
}