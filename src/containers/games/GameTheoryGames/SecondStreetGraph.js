import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createEdge,
  createVertex,
  deselectEdge,
  deselectVertex,
  removeSelectedEdges,
  removeSelectedVertices,
  selectEdge,
  selectVertex,
  updateCost,
  updateEdge,
  updateVertex,
} from '../../../redux/actions/graph';
import Graph from '../GameTheoryGraph';
import gameTypes from '../gameTypes';
import './style.css';

class SecondStreetGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Graph
        vertices={this.props.vertices}
        edges={this.props.edges}
        wholeCost={this.props.wholeCost}
        gameType={gameTypes.SECOND_TRAFFIC_GAME.type}
        createVertex={this.props.createVertex}
        createEdge={this.props.createEdge}
        updateVertex={this.props.updateVertex}
        selectEdge={this.props.selectEdge}
        selectVertex={this.props.selectVertex}
        deselectEdge={this.props.deselectEdge}
        deselectVertex={this.props.deselectVertex}
        removeSelectedEdges={this.props.removeSelectedEdges}
        removeSelectedVertices={this.props.removeSelectedVertices}
        updateEdge={this.props.updateEdge}
        updateCost={this.props.updateCost}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  vertices: state.secondTrafficGraph.secondVerices,
  edges: state.secondTrafficGraph.secondEdges,
  wholeCost: state.secondTrafficGraph.secondEdgesCostSum,
});

export default connect(mapStateToProps, {
  createVertex,
  createEdge,
  updateVertex,
  selectEdge,
  selectVertex,
  deselectEdge,
  deselectVertex,
  removeSelectedEdges,
  removeSelectedVertices,
  updateEdge,
  updateCost,
})(SecondStreetGraph);
