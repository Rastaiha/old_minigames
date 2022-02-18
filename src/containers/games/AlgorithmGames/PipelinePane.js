import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import PipelineGraph from './PipelineGraph';
import PipelineTable from './PipelineTable';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {
  pipelineInitialVertices1,
  pipelineInitialEdges1,
} from './pipelineGraphData';

import {
  createEdge,
  createVertex,
  deselectEdge,
  deselectVertex,
  selectEdge,
  selectVertex,
  updateEdge,
  updateVertex,
  resetGraph,
  updateAddedFlux,
  initialEdges,
  initialVertices,
} from '../../../redux/actions/graph';
import gameTypes from '../gameTypes';

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

class PipelinePane extends Component {
  render() {
    return (
      <Tab
        edges={this.props.edges}
        vertices={this.props.vertices}
        gameType={gameTypes.PIPELINE_GRAPH.type}
        s={this.props.s}
        t={this.props.t}
        addedFlux={this.props.addedFlux}
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
        panes={panes}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  vertices: state.pipelineGraph.present.pipelineVertices,
  edges: state.pipelineGraph.present.pipelineEdges,
  addedFlux: state.pipelineGraph.present.addedFlux,
  s: state.pipelineGraph.present.s,
  t: state.pipelineGraph.present.t,
  canUndo: state.pipelineGraph.past.length > 0,
  canRedo: state.pipelineGraph.future.length > 0,
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
  initialEdges,
  initialVertices,
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
})(PipelinePane);
