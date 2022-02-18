import React from 'react';
import { connect } from 'react-redux';
import {
  firstAnswers,
  firstData,
  firstHelps,
} from '../../../components/BlankGame/firstData';
import {
  updateBlank,
  updateBlankSituation,
} from '../../../redux/actions/blankGame';
import BlankGameContainer from './BlankGameContainer';

const answerOptions = [
  'table',
  'empty',
  'is',
  'domain',
  'minCell',
  'size',
  '{1,2,3,4,5,6,7,8,9}',
  'smaller than',
];

const FirstBlankGame = (props) => {
  return (
    <BlankGameContainer
      gameIndex={0}
      updateBlank={props.updateBlank}
      updateBlankSituation={props.updateBlankSituation}
      code={firstData}
      blanks={props.blanks}
      answers={firstAnswers}
      helps={firstHelps}
      answerOptions={answerOptions}
      situations={props.situtations}
    />
  );
};

const mapStateToProps = (state) => ({
  blanks: state.blankGame.blanks[0],
  situtations: state.blankGame.blanksSituation[0],
});

export default connect(mapStateToProps, {
  updateBlank,
  updateBlankSituation,
})(FirstBlankGame);
