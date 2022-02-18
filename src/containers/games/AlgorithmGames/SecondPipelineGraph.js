import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {
  createEdge,
  createVertex,
  deselectEdge,
  deselectVertex,
  resetGraph,
  selectEdge,
  selectVertex,
  updateAddedFlux,
  updateEdge,
  updateVertex,
} from '../../../redux/actions/graph';
import gameTypes from '../gameTypes';
import PipelineGraph from './PipelineGraph';
import PipelineTable from './PipelineTable';

const panes = [
  {
    menuItem: 'Graph',
    render: (props) => {
      return <PipelineGraph {...props} />;
    },
  },
  {
    menuItem: 'Table',
    render: (props) => {
      return <PipelineTable {...props} />;
    },
  },
];

class SecondPipelineGraph extends Component {
  render() {
    return (
      <PipelineGraph
        edges={this.props.edges}
        vertices={this.props.vertices}
        addedFlux={this.props.addedFlux}
        gameType={gameTypes.SECOND_PIPELINE_GRAPH.type}
        s={this.props.s}
        t={this.props.t}
        createEdge={this.props.createEdge}
        createVertex={this.props.createVertex}
        deselectEdge={this.props.deselectEdge}
        deselectVertex={this.props.deselectVertex}
        selectEdge={this.props.selectEdge}
        selectVertex={this.props.selectVertex}
        updateAddedFlux={this.props.updateAddedFlux}
        updateEdge={this.props.updateEdge}
        updateVertex={this.props.updateVertex}
        canRedo={this.props.canRedo}
        canUndo={this.props.canUndo}
        onUndo={this.props.onUndo}
        onRedo={this.props.onRedo}
        reset={this.props.resetGraph}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  vertices: state.secondPipelineGraph.present.secondPipelineVertices,
  edges: state.secondPipelineGraph.present.secondPipelineEdges,
  addedFlux: state.secondPipelineGraph.present.addedFlux,
  s: state.secondPipelineGraph.present.s,
  t: state.secondPipelineGraph.present.t,
  canUndo: state.secondPipelineGraph.past.length > 0,
  canRedo: state.secondPipelineGraph.future.length > 0,
});

export default connect(mapStateToProps, {
  createVertex,
  createEdge,
  updateVertex,
  updateEdge,
  selectEdge,
  selectVertex,
  deselectEdge,
  deselectVertex,
  resetGraph,
  updateAddedFlux,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(SecondPipelineGraph);
