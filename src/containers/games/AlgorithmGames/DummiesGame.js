import React, { Component } from 'react';
import { connect } from 'react-redux';
import DummiesGameView from '../../../components/dummiesGame/DummiesGameView';
import * as situations from '../../../components/dummiesGame/situations';
import { changeGameMode, createDummy, nextDummyLevel, nextDummyRound, resetDummyGame, updateDummy, wrongAnswered } from '../../../redux/actions/dummyGame';

class DummiesGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // roundNumber: 15,
    };
  }
  componentDidMount() {
    for (let i = 0; i < 15; i++) {
      this.props.createDummy({
        number: i + 1,
        wrongNumber: 0,
        situation: situations.MIDDLE,
      });
    }
  }

  render() {
    return (
      <DummiesGameView
        dummies={this.props.dummies}
        updateDummy={this.props.updateDummy}
        roundNumber={this.state.roundNumber}
        nextRound={this.props.nextDummyRound}
        nextLevel={this.props.nextDummyLevel}
        resetGame={this.props.resetDummyGame}
        changeMode={this.props.changeGameMode}
        wrongAnswered={this.props.wrongAnswered}
        round={this.props.round}
        level={this.props.level}
        mode={this.props.mode}
        totalRounds={this.props.totalRounds}
        userWrongNumber={this.props.userWrongNumber}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  dummies: state.dummiesGame.dummies,
  round: state.dummiesGame.round,
  level: state.dummiesGame.level,
  mode: state.dummiesGame.mode,
  totalRounds: state.dummiesGame.totalRounds,
  userWrongNumber: state.dummiesGame.userWrongNumber,
});

export default connect(mapStateToProps, {
  createDummy,
  updateDummy,
  nextDummyRound,
  nextDummyLevel,
  resetDummyGame,
  changeGameMode,
  wrongAnswered,
})(DummiesGame);
