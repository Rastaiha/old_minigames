import React, { Component } from 'react';
import {
  createVertex,
  createEdge,
  updateVertex,
  selectVertex,
  deselectVertex,
  deleteVertex,
  deleteEdge,
  updateEdge,
} from '../../../redux/actions/graph';
import { connect } from 'react-redux';
import gameTypes from '../gameTypes';
import GraphViewer from '../../../components/Graph/GraphViewer';
import { Icon, Container, Button } from 'semantic-ui-react';
import DormEdge from '../../../components/dormGame/EdgeLine';
import _ from 'lodash';

let mat = create2DArray(20, 20);
let per = [];
let answer = [[]];
let mark = new Array(20);

function create2DArray(rows, columns) {
  return Array.from(Array(rows), () => new Array(columns));
}

class DormGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxEdges: [],
      isShowingMaxMatchings: false,
      matchingsLength: 0,
      curMatchingIndex: 0,
      currentIndex: 0,
      graphHasChanged: false,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.edgeExists = this.edgeExists.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getEdges = this.getEdges.bind(this);
    this.clacMatchings = this.clacMatchings.bind(this);
    this.resetEdges = this.resetEdges.bind(this);
    this.showNextMaching = this.showNextMaching.bind(this);
  }

  match(v, n, m) {
    if (v >= n) {
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (mat[i][j] && !mark[i] && !mark[j]) {
            return;
          }
        }
      }

      let tempArray = [...per];
      answer = answer.concat([tempArray]);
      return;
    }

    if (mark[v]) {
      this.match(v + 1, n, m);
      return;
    }
    for (let i = v + 1; i < n; i++) {
      if (!mark[i] && mat[v][i] && i != v) {
        mark[v] = 1;
        mark[i] = 1;
        per.push(v, i);
        this.match(v + 1, n, m);
        mark[v] = 0;
        mark[i] = 0;
        per.pop();
        per.pop();
      }
    }
    this.match(v + 1, n, m);
  }

  onDragEnd(x, y, id) {
    this.props.updateVertex(
      id,
      {
        x,
        y,
      },
      gameTypes.DORM_GAME.type
    );
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

  onSelect(id, isSelected) {
    if (!this.state.isShowingMaxMatchings) {
      if (isSelected) {
        this.props.deselectVertex(id, gameTypes.DORM_GAME.type);
      } else {
        this.props.selectVertex(id, gameTypes.DORM_GAME.type);
        this.props.vertices.forEach((vertex) => {
          if (vertex.id !== id && vertex.isSelected) {
            if (!this.edgeExists(id, vertex.id)) {
              this.setState({ graphHasChanged: true });
              this.props.createEdge(id, vertex.id, gameTypes.DORM_GAME.type, {
                inMaxMatch: false,
              });
            }
            this.props.deselectVertex(id, gameTypes.DORM_GAME.type);
            this.props.deselectVertex(vertex.id, gameTypes.DORM_GAME.type);
          }
        });
      }
    }
  }

  onAddNodeClick() {
    this.props.createVertex(
      {
        x: 100,
        y: 100,
        name: alphabet[this.state.currentIndex],
      },
      gameTypes.DORM_GAME.type
    );
    this.setState({ graphHasChanged: true });
    if (this.state.currentIndex <= 30) {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  onTrashIconClick() {
    this.setState({
      isShowingMaxMatchings: false,
      matchingsLength: 0,
      curMatchingIndex: 1,
      graphHasChanged: true,
    });
    this.resetEdges();
    this.props.vertices.forEach((vertex) => {
      if (vertex.isSelected) {
        this.props.deleteVertex(vertex.id, gameTypes.DORM_GAME.type);
        this.props.edges.forEach((edge) => {
          if (edge.to === vertex.id || edge.from === vertex.id) {
            this.props.deleteEdge(edge.id, gameTypes.DORM_GAME.type);
          }
        });
      }
    });

    this.props.edges.forEach((edge) => {
      if (edge.isSelected) {
        this.props.deleteEdge(edge.id, gameTypes.DORM_GAME.type);
      }
    });
  }

  resetEdges() {
    this.props.edges.forEach((edge) => {
      if (edge.props.inMaxMatch) {
        this.props.updateEdge(
          edge.id,
          {
            inMaxMatch: false,
          },
          gameTypes.DORM_GAME.type
        );
      }
    });
  }

  showMaxMatching(index) {
    const maxEdges = answer[index];
    let maxEdgesNum = maxEdges.length / 2;
    for (let i = 0; i < maxEdgesNum; i++) {
      let firstIndex = maxEdges[i * 2];
      let secondIndex = maxEdges[i * 2 + 1];

      let firstID = this.props.vertices[firstIndex].id;
      let secondID = this.props.vertices[secondIndex].id;

      const edge = _.find(this.props.edges, function (edge) {
        return (
          (edge.from === firstID && edge.to === secondID) ||
          (edge.to === firstID && edge.from === secondID)
        );
      });

      this.props.updateEdge(
        edge.id,
        {
          inMaxMatch: true,
        },
        gameTypes.DORM_GAME.type
      );
    }
  }

  deleteMatching() {
    answer.splice(this.state.curMatchingIndex - 1, 1);
    this.showNextMaching(this.state.curMatchingIndex - 1, answer.length);
  }

  getEdges() {
    let edges = [];
    this.props.edges.forEach((edge) => {
      let firstIndex = _.findIndex(this.props.vertices, { id: edge.from });
      let secondIndex = _.findIndex(this.props.vertices, { id: edge.to });
      edges.push([firstIndex + 1, secondIndex + 1]);
    });
    return edges;
  }

  clacMatchings(edges) {
    let m = this.props.edges.length;

    for (let i = 0; i < m; i++) {
      let f = edges[i][0];
      let s = edges[i][1];
      mat[--f][--s] = 1;
      mat[s][f] = 1;
    }

    this.match(0, this.props.vertices.length, m);
  }

  showNextMaching(index, length) {
    if (!this.state.isShowingMaxMatchings) {
      if (this.state.graphHasChanged) {
        answer = [];
        mat = create2DArray(20, 20);
        per = [];
        answer = [[]];
        mark = new Array(20);
        let edges = this.getEdges();
        this.clacMatchings(edges);
        this.setState({ graphHasChanged: false });
      }

      if (answer.length === 1) {
        this.setState({ isShowingMaxMatchings: false });
        return;
      }

      this.setState({
        isShowingMaxMatchings: true,
        matchingsLength: answer.length - 1,
      });

      this.showMaxMatching(1);
      this.setState({ curMatchingIndex: 2 });
    } else {
      this.resetEdges();

      if (index <= answer.length - 1) {
        this.showMaxMatching(index);
        this.setState({ curMatchingIndex: index + 1 });
      } else {
        this.setState({ isShowingMaxMatchings: false });
      }
    }
  }

  onEdgeSelect() {}

  render() {
    return (
      <>
        <GraphViewer
          vertices={this.props.vertices}
          edges={this.props.edges}
          onDragEnd={this.onDragEnd}
          onSelect={this.onSelect}
          EdgeComponent={DormEdge}
          onEdgeSelect={this.onEdgeSelect}
          gameType={gameTypes.DORM_GAME.type}
        />
        <Container
          style={{
            top: '10px',
            left: '10px',
            position: 'absolute',
          }}
        >
          <Icon
            name="circle"
            onClick={this.onAddNodeClick.bind(this)}
            style={{ cursor: 'pointer' }}
            disabled={this.state.isShowingMaxMatchings ? true : false}
          />
          <Icon
            name="trash"
            onClick={this.onTrashIconClick.bind(this)}
            style={{ cursor: 'pointer' }}
            disabled={this.state.isShowingMaxMatchings ? true : false}
          />
          <Icon
            name="arrow right"
            onClick={() => {
              this.showNextMaching(this.state.curMatchingIndex, answer.length);
            }}
            style={{ cursor: 'pointer' }}
          />
        </Container>
        {this.state.isShowingMaxMatchings && (
          <Button
            style={{
              position: 'absolute',
              top: '40px',
              left: '10px',
            }}
            onClick={this.deleteMatching.bind(this)}
          >
            Delete This Matching
          </Button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  vertices: state.dormGraph.dormVertices,
  edges: state.dormGraph.dormEdges,
});

export default connect(mapStateToProps, {
  createVertex,
  updateEdge,
  createEdge,
  updateVertex,
  selectVertex,
  deselectVertex,
  deleteVertex,
  deleteEdge,
})(DormGame);

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'aa',
  'bb',
  'cc',
  'dd',
  'ee',
  'ff',
  'gg',
  'hh',
  'ii',
  'jj',
  'kk',
  'll',
  'mm',
  'oo',
  'pp',
  'qq',
  'rr',
  'ss',
  'tt',
  'uu',
  'vv',
  'ww',
  'xx',
  'yy',
  'zz',
];
