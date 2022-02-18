import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { Icon, Grid } from 'semantic-ui-react';
import FirstContainer from '../../../components/boxes/FirstContainer';
import SecondContainer from '../../../components/boxes/SecondContainer';
import SimulatorView from '../../../components/boxes/SimulatorView';
import * as situations from '../../../components/boxes/situations';
import {
  createBox,
  deleteBox,
  updateBox,
  nextRound,
  changeMode,
  changeTotaltime,
  nextLevel,
  updateAnswer,
  changeBoxes,
} from '../../../redux/actions/boxesSimulation';

class FirstBoxesContainer extends Component {
  state = {
    optimum: 24,
    height: window.innerHeight,
    width: (window.innerWidth * 2) / 3 + 30,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.nextRound();
    window.addEventListener('resize', this.resizeListener);
    this.props.changeBoxes()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    const shellBoxes = this.props.boxes.filter((box) => {
      return box.props.situation === situations.IN_SHELL;
    });
    return (
      <>
        <Icon
          name="undo"
          onClick={this.props.onUndo}
          style={{
            cursor: 'pointer',
          }}
          disabled={true}
        />
        <Icon
          name="redo"
          onClick={this.props.onRedo}
          style={{
            cursor: 'pointer',
          }}
          disabled={true}
        />
        <SimulatorView
          optimum={this.props.optimum}
          stageWidth={this.state.width}
          boxes={this.props.boxes}
          box={shellBoxes.length !== 0 ? shellBoxes[0] : null}
          createBox={this.props.createBox}
          updateBox={this.props.updateBox}
          deleteBox={this.props.deleteBox}
          boxContainer={SecondContainer}
          round={this.props.round}
          answer={this.props.answer}
          mode={this.props.mode}
          level={2}
          totalTime={this.props.totalTime}
          changeMode={this.props.changeMode}
          changeTotaltime={this.props.changeTotaltime}
          nextRound={this.props.nextRound}
          nextLevel={this.props.nextLevel}
          updateAnswer={this.props.updateAnswer}
          changeBoxes={this.props.changeBoxes}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  boxes: state.boxesSimulation.present.boxes,
  round: state.boxesSimulation.present.round,
  mode: state.boxesSimulation.present.mode,
  totalTime: state.boxesSimulation.present.totalTime,
  level: state.boxesSimulation.present.level,
  answer: state.boxesSimulation.present.answer,
  optimum: state.boxesSimulation.present.optimum,
  canUndo: state.boxesSimulation.past.length > 0,
  canRedo: state.boxesSimulation.future.length > 0,
});

export default connect(mapStateToProps, {
  createBox,
  updateBox,
  deleteBox,
  nextRound,
  changeMode,
  changeTotaltime,
  nextLevel,
  updateAnswer,
  changeBoxes,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(FirstBoxesContainer);
