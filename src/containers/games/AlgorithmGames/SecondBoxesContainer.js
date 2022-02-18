import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { Icon } from 'semantic-ui-react';
import SecondContainer from '../../../components/boxes/SecondContainer';
import SimulatorView from '../../../components/boxes/SimulatorView';
import * as situations from '../../../components/boxes/situations';
import {
  changeMode,
  changeTotaltime,
  createBox,
  deleteBox,
  nextRound,
  resetBoxes,
  updateBox,
} from '../../../redux/actions/boxesSimulation';

class SecondBoxesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optimum: 24,
      height: window.innerHeight,
      width: (window.innerWidth * 2) / 3 + 30,
    };

    this.reset = this.reset.bind(this);
  }

  reset() {
    this.props.resetBoxes();
  }

  render() {
    const shellBoxes = this.props.boxes.filter((box) => {
      return box.props.situation === situations.IN_SHELL;
    });
    return (
      <>
        <Icon
          name="undo"
          onClick={this.reset}
          style={{
            cursor: 'pointer',
          }}
        />
        <SimulatorView
          stageWidth={this.state.width}
          boxes={this.props.boxes}
          box={shellBoxes.length !== 0 ? shellBoxes[0] : null}
          createBox={this.props.createBox}
          updateBox={this.props.updateBox}
          deleteBox={this.props.deleteBox}
          boxContainer={SecondContainer}
          optimum={this.state.optimum}
          mode={this.props.mode}
          totalTime={this.props.totalTime}
          changeMode={this.props.changeMode}
          changeTotaltime={this.props.changeTotaltime}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  boxes: state.boxesSimulation.present.boxes,
  mode: state.boxesSimulation.present.mode,
  totalTime: state.boxesSimulation.present.totalTime,
  canUndo: state.boxesSimulation.past.length > 0,
  canRedo: state.boxesSimulation.future.length > 0,
});

export default connect(mapStateToProps, {
  createBox,
  updateBox,
  deleteBox,
  resetBoxes,
  nextRound,
  changeMode,
  changeTotaltime,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(SecondBoxesContainer);
