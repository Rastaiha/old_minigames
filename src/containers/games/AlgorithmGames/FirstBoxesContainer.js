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
    height: window.innerHeight,
    width: (window.innerWidth * 2) / 3 + 30,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    // const shellBoxes = this.props.boxes.filter((box) => {
    //   return box.props.situation === situations.IN_SHELL;
    // });
    return (
      <>
        <Icon
          name="undo"
          onClick={this.props.onUndo}
          style={{
            cursor: 'pointer',
          }}
        />
        <Icon
          name="redo"
          onClick={this.props.onRedo}
          style={{
            cursor: 'pointer',
          }}
        />
        <SimulatorView
          optimum={this.props.optimum}
          stageWidth={this.state.width}
          boxes={this.props.boxes}
          createBox={this.props.createBox}
          updateBox={this.props.updateBox}
          deleteBox={this.props.deleteBox}
          boxContainer={FirstContainer}
          round={this.props.round}
          answer={this.props.answer}
          mode={this.props.mode}
          level={1}
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
