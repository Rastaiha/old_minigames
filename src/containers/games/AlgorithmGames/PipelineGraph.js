import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import GraphViewer from '../../../components/Graph/GraphViewer';
import KonvaPipeline from '../../../components/konva/KonvaPipeline/KonvaPipeline';
import gameTypes from '../gameTypes';
import '../style.css';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.onEdgeSelect = this.onEdgeSelect.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
    this.handleTextareaKeyDown = this.handleTextareaKeyDown.bind(this);
    this.checkGraph = this.checkGraph.bind(this);
    this.checkPath = this.checkPath.bind(this);
    this.unselectEdges = this.unselectEdges.bind(this);
    this.onPositiveClick = this.onPositiveClick.bind(this);
    this.onNegativeClick = this.onNegativeClick.bind(this);
    this.handleFlux = this.handleFlux.bind(this);
    this.createNode = this.createNode.bind(this);
    this.activeEdges = this.activeEdges.bind(this);

    this.state = {
      preOperation: '',

      editTextValue: 0,
      canEnterValue: false,

      predUnstableVertice: null,
      unstableVertice: null,
      studentaValue: 4,
    };
  }

  componentDidMount() {
    this.start();
  }

  activeEdges(unStableVerticID, predUnstableVertice) {
    this.props.edges.forEach((edge) => {
      if (
        edge.to === predUnstableVertice ||
        edge.from === predUnstableVertice
      ) {
        if (edge.canBeSelected) {
          this.props.updateEdge(
            edge.id,
            {
              canBeSelected: false,
            },
            this.props.gameType
          );
        }
      } else if (
        edge.to === unStableVerticID ||
        edge.from === unStableVerticID
      ) {
        if (
          edge.to === this.state.unstableVertice ||
          edge.from === this.state.unstableVertice
        ) {
          this.props.updateEdge(
            edge.id,
            {
              canBeSelected: true,
            },
            this.props.gameType
          );
          let isInput = unStableVerticID === edge.from ? true : false;
          this.props.updateEdge(
            edge.id,
            {
              canBeSelected: true,
              isInput: isInput,
            },
            this.props.gameType
          );
        } else {
          if (!edge.canBeSelected) {
            let isInput = unStableVerticID === edge.from ? true : false;
            this.props.updateEdge(
              edge.id,
              {
                canBeSelected: true,
                isInput: isInput,
              },
              this.props.gameType
            );
          }
        }
      } else {
        if (edge.canBeSelected) {
          this.props.updateEdge(
            edge.id,
            {
              canBeSelected: false,
            },
            this.props.gameType
          );
        }
      }
    });
    this.props.updateVertex(
      this.state.unstableVertice,
      {
        notStable: false,
      },
      this.props.gameType
    );
    if (unStableVerticID === this.props.vertices[this.props.t].id) {
      let addedNumber = this.state.preOperation === '+' ? 1 : -1;
      this.props.updateAddedFlux(
        this.props.addedFlux + addedNumber,
        this.props.gameType
      );
      this.start();
    } else {
      this.setState({ unstableVertice: unStableVerticID });
    }
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
    if (isSelected) {
      this.props.deselectVertex(id, this.props.gameType);
    } else {
      this.props.selectVertex(id, this.props.gameType);
      this.props.vertices.forEach((vertex) => {
        if (vertex.id !== id && vertex.isSelected) {
          if (!this.edgeExists(id, vertex.id)) {
            this.props.createEdge(id, vertex.id, this.props.gameType, {
              capacity: 10,
              canBeSelected: false,
            });
          }
          this.props.deselectVertex(id, this.props.gameType);
          this.props.deselectVertex(vertex.id, this.props.gameType);
        }
      });
    }
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
      // this.setState({ canEnterValue: this.checkPath().isPath });
    } else {
      this.props.selectEdge(id, this.props.gameType);
      // this.setState({ canEnterValue: this.checkPath().isPath });
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

  unselectEdges(selectedEdges) {
    selectedEdges.forEach((edge) => {
      this.props.deselectEdge(edge.id, this.props.gameType);
    });
  }

  checkGraph(selectedEdges) {
    var error = false;
    let fluxValue = this.state.editTextValue;

    if (!fluxValue) {
      error = true;
    }

    selectedEdges.forEach((edge) => {
      if (fluxValue > edge.props.capacity - edge.filled) {
        alert('not enough capacity!');
        error = true;
      }
    });

    if (error) {
      return;
    }

    selectedEdges.forEach((edge) => {
      let preFilled = edge.filled;

      this.props.updateEdge(
        edge.id,
        {
          filled: preFilled + parseInt(this.state.editTextValue),
        },
        this.props.gameType
      );
      this.props.deselectEdge(edge.id, this.props.gameType);
    });
  }

  checkPath() {
    const selectedEdges = this.props.edges.filter((edge) => {
      return edge.isSelected === true;
    });

    var checkEdges = [...selectedEdges];

    var isPath = true;

    var startNodeID = this.props.vertices[this.props.s].id;
    let selectedSize = checkEdges.length;

    for (let i = 0; i < selectedSize; i++) {
      const myEdge = _.filter(checkEdges, function (edge) {
        return edge.to === startNodeID || edge.from === startNodeID;
      });
      if (!myEdge.length) {
        isPath = false;
        break;
      } else if (myEdge.length > 1) {
        isPath = false;
        break;
      }

      let index = _.findIndex(checkEdges, myEdge[0]);
      checkEdges.splice(index, 1);

      startNodeID =
        myEdge[0].from === startNodeID ? myEdge[0].to : myEdge[0].from;
    }
    let endNodeID = this.props.vertices[this.props.t].id;
    if (startNodeID !== endNodeID) {
      isPath = false;
    }

    return {
      isPath,
      selectedEdges,
    };
  }

  handleTextEdit(e) {
    this.setState({
      editTextValue: e.target.value,
    });
  }

  handleTextareaKeyDown(e) {
    if (e.keyCode === 13) {
      let { isPath, selectedEdges } = this.checkPath();
      this.checkGraph(selectedEdges);
      this.unselectEdges(selectedEdges);
      this.setState({ canEnterValue: false });
    }
  }

  changeVertic(nextID, curID) {
    this.setState({
      unstableVertic: nextID,
      predUnstableVertice: curID,
    });
    this.props.updateVertex(
      nextID,
      {
        notStable: true,
      },
      this.props.gameType
    );
    this.props.updateVertex(
      curID,
      {
        notStable: false,
      },
      this.props.gameType
    );
    this.activeEdges(nextID, curID);
  }

  checkIfStable() {
    const unstableVertic = _.find(this.props.vertices, {
      id: this.state.unstableVertice,
    });

    let res = false;
    if (unstableVertic.props.inputFlux === unstableVertic.props.outputFlux) {
      res = true;
    }
    return res;
  }

  handleFlux(edge, sign) {
    this.setState({ preOperation: sign });
    const fromNode = _.find(this.props.vertices, { id: edge.from });
    const toNode = _.find(this.props.vertices, { id: edge.to });

    let numberAdded = sign === '+' ? 1 : -1;

    this.props.updateVertex(
      edge.from,
      {
        inputFlux: parseInt(fromNode.props.inputFlux) + numberAdded,
      },
      this.props.gameType
    );

    this.props.updateVertex(
      edge.to,
      {
        outputFlux: parseInt(toNode.props.outputFlux) + numberAdded,
      },
      this.props.gameType
    );

    let sourceID = this.props.vertices[this.props.s].id;

    let verticIsStable = this.checkIfStable();

    let nextVertic =
      edge.from === this.state.unstableVertice ? edge.to : edge.from;
    let curVertic =
      this.state.unstableVertice === edge.from ? edge.from : edge.to;

    if (sourceID === this.state.unstableVertice) {
      this.changeVertic(nextVertic, curVertic);
    } else {
      if (verticIsStable) {
        this.changeVertic(nextVertic, curVertic);
      } else {
        alert('با این حرکت، راس پایدار نمی‌شود');
        this.props.onUndo();
        this.props.onUndo();
        this.props.onUndo();
      }
    }
  }

  onPositiveClick(id, canBeSelected) {
    if (canBeSelected) {
      const edge = _.find(this.props.edges, { id: id });

      let preFilled = edge.filled;

      if (preFilled !== edge.props.capacity) {
        this.props.updateEdge(
          id,
          {
            canBeSelected: false,
            hasChanged: true,
            filled: preFilled + 1,
            lastMovPos: true,
          },
          this.props.gameType
        );
        this.handleFlux(edge, '+');
      }
    }
  }

  onNegativeClick(id, canBeSelected) {
    if (canBeSelected) {
      const edge = _.find(this.props.edges, { id: id });

      let preFilled = edge.filled;

      if (preFilled !== 0) {
        this.props.updateEdge(
          id,
          {
            canBeSelected: false,
            hasChanged: true,
            filled: preFilled - 1,
            lastMovPos: false,
          },
          this.props.gameType
        );
        this.handleFlux(edge, '-');
      }
    }
  }

  createNode() {
    this.props.createVertex(
      {
        x: 32,
        y: 100,
        inputFlux: 0,
        outputFlux: 0,
      },
      this.props.gameType
    );
  }

  restartGame() {
    this.props.reset(this.props.gameType);

    this.start();
  }

  start() {
    this.props.edges.forEach((edge) => {
      if (edge.hasChanged) {
        this.props.updateEdge(
          edge.id,
          {
            hasChanged: false,
          },
          this.props.gameType
        );
      }
    });
    let nextID = this.props.vertices[this.props.s].id;
    if (!this.state.unstableVertice) {
      this.setState({
        unstableVertice: nextID,
      });
    }
    this.activeEdges(nextID);
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    return (
      <>
        <input
          id="pipelineFlux"
          value={this.state.editTextValue}
          style={{
            top: 0,
            left: 0,
            width: 100,
            display: this.state.canEnterValue ? 'block' : 'none',
          }}
          type="number"
          min={0}
          max={100}
          onChange={this.handleTextEdit}
          onKeyDown={this.handleTextareaKeyDown}
        />
        <GraphViewer
          vertices={this.props.vertices}
          edges={this.props.edges}
          onDragEnd={this.onDragEnd}
          onSelect={this.onSelect}
          onEdgeSelect={this.onEdgeSelect}
          updateVertex={this.props.updateVertex}
          EdgeComponent={KonvaPipeline}
          gameType={this.props.gameType}
          checkGraph={this.checkPipelineGraph}
          onPositiveClick={this.onPositiveClick}
          onNegativeClick={this.onNegativeClick}
          s={this.props.s}
          t={this.props.t}
        />
        <Icon
          name="undo"
          onClick={this.restartGame.bind(this)}
          style={{
            top:
              this.props.gameType === gameTypes.PIPELINE_GRAPH.type
                ? '70px'
                : '40px',
            left: '10px',
            cursor: 'pointer',
            position: 'absolute',
          }}
        />
        <Label
          size={widthScale > 0.8 ? 'medium' : 'mini'}
          style={{
            top:
              this.props.gameType === gameTypes.PIPELINE_GRAPH.type
                ? '40px'
                : '10px',
            left: '10px',
            position: 'absolute',
          }}
        >
          جریان اضافه شده :<Label.Detail>{this.props.addedFlux}</Label.Detail>
        </Label>
      </>
    );
  }
}

export default Graph;
