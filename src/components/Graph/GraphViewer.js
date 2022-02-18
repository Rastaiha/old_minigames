import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Circle, Layer, Line, Stage, Text } from 'react-konva';
import gameTypes from '../../containers/games/gameTypes';
import { edgeConfig, vertexConfig } from './config';

export default class GraphViewer extends Component {
  static propTypes = {
    vertices: PropTypes.arrayOf(PropTypes.object).isRequired,
    edges: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.edgItems = [];
    this.verticeNames = [];
    this.getEdgeVertices = this.getEdgeVertices.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onStartEditing = this.onStartEditing.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
    this.handleTextareaKeyDown = this.handleTextareaKeyDown.bind(this);
    this.onFinishEditing = this.onFinishEditing.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      editTextValue: 0,
      egdeEditingID: null,
      textEditingType: null,
    };
  }

  getEdgeVertices(edge) {
    const from = _.find(this.props.vertices, { id: edge.from });
    const to = _.find(this.props.vertices, { id: edge.to });
    return { from, to };
  }

  onDragMove(x, y, id) {
    if (this.verticeNames[id]) {
      this.verticeNames[id].x(x - 30);
      this.verticeNames[id].y(y - 10);
    }

    this.props.edges.forEach((edge) => {
      if (edge.from === id) {
        const points = this.edgItems[edge.id].points();
        points[0] = x;
        points[1] = y;
        this.edgItems[edge.id].points(points);
      }
      if (edge.to === id) {
        const points = this.edgItems[edge.id].points();
        points[2] = x;
        points[3] = y;
        this.edgItems[edge.id].points(points);
      }
    });
  }

  handleTextEdit(e) {
    this.setState({
      editTextValue: e.target.value,
    });
  }

  onFinishEditing() {
    if (!!this.state.egdeEditingID) {
      const edgeEdited = _.find(this.props.edges, {
        id: this.state.egdeEditingID,
      });
      if (!!edgeEdited) {
        if (this.state.textEditingType === 'weight') {
          edgeEdited.weight = this.state.editTextValue;
        } else {
          edgeEdited.b += parseInt(this.state.editTextValue);
        }
        this.props.onValueChange();
      }
      this.setState({ egdeEditingID: null });
    }

    window.removeEventListener('click', this.handleOutsideClick);
  }

  handleTextareaKeyDown(e) {
    if (e.keyCode === 13) {
      this.onFinishEditing();
    }
  }

  handleOutsideClick(e) {
    if (e.target.id !== 'graphTextInput') {
      this.onFinishEditing();
    }
  }

  onStartEditing(e, edgeID, value, targetType) {
    this.onFinishEditing();
    this.setState({
      textEditingType: targetType,
      egdeEditingID: edgeID,
      editTextPosition: e.target.getAbsolutePosition(),
    });
    const input = document.getElementById('graphTextInput');
    this.setState({ editTextValue: value });
    input.value = value;
    input.focus();
    setTimeout(() => {
      window.addEventListener('click', this.handleOutsideClick);
    });
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    let EdgeComponent = this.props.EdgeComponent || Line;
    return (
      <>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {this.props.edges.map((edge) => {
              const { from, to } = this.getEdgeVertices(edge);
              return (
                <>
                  <EdgeComponent
                    key={edge.id}
                    id={edge.id}
                    ref={(edgeItem) => (this.edgItems[edge.id] = edgeItem)}
                    points={[
                      from.props.x,
                      from.props.y,
                      to.props.x,
                      to.props.y,
                    ]}
                    textProps={{
                      weight: edge.weight,
                      a: edge.a,
                      b: edge.b,
                      capacity: edge.props.capacity,
                      filled: edge.filled,
                    }}
                    gameType={this.props.gameType}
                    {...edgeConfig}
                    {...edge.props}
                    canBeSelected={edge.canBeSelected}
                    isSelected={edge.isSelected}
                    isInput={edge.isInput}
                    hasChanged={edge.hasChanged}
                    lastMovPos={edge.lastMovPos}
                    onTextDoubleClick={this.onStartEditing}
                    onClick={() =>
                      this.props.onEdgeSelect(edge.id, edge.isSelected)
                    }
                    onPositiveClick={this.props.onPositiveClick}
                    onNegativeClick={this.props.onNegativeClick}
                  />
                </>
              );
            })}
            {this.props.vertices.map((vertex) => {
              return (
                <>
                  <Circle
                    key={vertex.id}
                    {...vertexConfig}
                    {...vertex.props}
                    {...vertex.props.inputFlux}
                    {...vertex.props.outputFlux}
                    fill={
                      this.props.gameType === gameTypes.PIPELINE_GRAPH.type
                        ? vertex.id === this.props.vertices[this.props.s].id ||
                          vertex.id === this.props.vertices[this.props.t].id
                          ? '#304c78'
                          : vertex.props.notStable
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                    draggable={
                      this.props.gameType === gameTypes.PIPELINE_GRAPH.type
                        ? false
                        : true
                    }
                    shadowBlur={vertex.isSelected ? 20 : 0}
                    onClick={() =>
                      this.props.onSelect(vertex.id, vertex.isSelected)
                    }
                    onTouchStart={() =>
                      this.props.onSelect(vertex.id, vertex.isSelected)
                    }
                    onDragEnd={(e) =>
                      this.props.onDragEnd(
                        e.target.x(),
                        e.target.y(),
                        vertex.id
                      )
                    }
                    onDragMove={(e) =>
                      this.onDragMove(e.target.x(), e.target.y(), vertex.id)
                    }
                  />
                  {this.props.gameType === gameTypes.PIPELINE_GRAPH.type ||
                  this.props.gameType === gameTypes.DORM_GAME.type ? (
                    <Text
                      x={vertex.props.x - 30}
                      y={vertex.props.y - 10}
                      width={60}
                      ref={(name) => (this.verticeNames[vertex.id] = name)}
                      align="center"
                      verticalAlign="middle"
                      text={vertex.props.name}
                      stroke="white"
                      fontSize={15}
                      strokeWidth={1}
                    />
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </Layer>
        </Stage>
        {this.state.egdeEditingID ? (
          <input
            id="graphTextInput"
            value={this.state.editTextValue}
            style={{
              top: this.state.editTextPosition.y * heightScale + 'px',
              left: this.state.editTextPosition.x * widthScale + 'px',
              position: 'absolute',
            }}
            type="number"
            min={0}
            max={100}
            onChange={this.handleTextEdit}
            onKeyDown={this.handleTextareaKeyDown}
          />
        ) : (
          ''
        )}
      </>
    );
  }
}
