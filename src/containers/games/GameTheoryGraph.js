import _ from 'lodash';
import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import GraphViewer from '../../components/Graph/GraphViewer';
import KonvaStreet from '../../components/konva/KonvaStreet/KonvaStreet';
import './style.css';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.onEdgeSelect = this.onEdgeSelect.bind(this);
  }

  onDragEnd(x, y, id) {
    this.props.updateVertex(
      id,
      {
        x,
        y,
      },
      this.props.gameType
    );
  }

  onSelect(id, isSelected) {
    // if (isSelected) {
    //   this.props.deselectVertex(id, this.props.gameType);
    // } else {
    //   this.props.selectVertex(id, this.props.gameType);
    //   this.props.vertices.forEach((vertex) => {
    //     if (vertex.id !== id && vertex.isSelected) {
    //       if (!this.edgeExists(id, vertex.id)) {
    //         this.props.createEdge(id, vertex.id, this.props.gameType, {});
    //       }
    //       this.props.deselectVertex(id, this.props.gameType);
    //       this.props.deselectVertex(vertex.id, this.props.gameType);
    //     }
    //   });
    // }
  }

  edgeExists(fromID, toID) {
    var res = false;
    this.props.edges.forEach((edge) => {
      if (
        (edge.from === fromID && edge.to === toID) ||
        (edge.from === toID && edge.to === fromID)
      ) {
        res = true;
      }
    });
    return res;
  }

  onEdgeSelect(id, isSelected) {
    if (isSelected) {
      this.props.deselectEdge(id, this.props.gameType);
    } else {
      this.props.selectEdge(id, this.props.gameType);
    }
  }

  deleteEdge(id) {
    let newEdges = this.props.edges.filter((obj) => {
      return obj.fromNodeID !== id && obj.toNodeID !== id;
    });

    this.setState({ edges: newEdges });
  }

  deleteNode(id) {
    let newNodes = this.state.nodes.filter((obj) => {
      return obj.id !== id;
    });

    //delet edges related to this node
    let newEdges = this.state.edges.filter((obj) => {
      return obj.fromNodeID !== id && obj.toNodeID !== id;
    });

    this.setState({ nodes: newNodes, edges: newEdges });
  }

  onFormulaChange(edgeID, newB) {
    const edge = _.find(this.props.edges, { id: edgeID });

    this.props.updateEdge(
      edgeID,
      {
        b: newB + edge.b,
      },
      this.props.gameType
    );
  }

  onValueChange() {
    let sum = 0;
    this.props.edges.forEach((edge) => {
      sum += parseInt(edge.weight) * (parseInt(edge.weight) * edge.a + edge.b);
    });

    this.props.updateCost(sum, this.props.gameType);
  }

  onUpdateEdge(id, props) {
    this.props.updateEdge(id, props, this.props.gameType);
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    return (
      <>
        <Label
          size={widthScale > 0.8 ? 'small' : 'mini'}
          style={{
            top: '10px' * widthScale,
            left: '10px' * heightScale,
            position: 'absolute',
            marginLeft: '30px',
          }}
        >
          مجموع هزینه‌ی تمام یال ها :
          <Label.Detail>{this.props.wholeCost}</Label.Detail>
        </Label>
        <GraphViewer
          vertices={this.props.vertices}
          edges={this.props.edges}
          onDragEnd={this.onDragEnd}
          onSelect={this.onSelect}
          onEdgeSelect={this.onEdgeSelect}
          updateEdge={this.onUpdateEdge.bind(this)}
          onValueChange={this.onValueChange.bind(this)}
          onFormulaChange={this.onFormulaChange.bind(this)}
          EdgeComponent={KonvaStreet}
          gameType={this.props.gameType}
        />
      </>
    );
  }
}

export default Graph;
