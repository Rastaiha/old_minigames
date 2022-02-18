import _ from 'lodash';
import React, { Component } from 'react';
import { Circle, Group, Layer, Line, Stage } from 'react-konva';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';
import CodingGameNav from '../../../components/codingGame/CodingGameNav';
import GameCircle from '../../../components/codingGame/GameCircle';
import GameSquare from '../../../components/codingGame/GameSquare';
import { clearShape, createCircle, createDot, createEdge, createSquare, deselectDot, selectDot, updateCircle, updateDistance, updateEdgee, updateSquare } from '../../../redux/actions/codingGame';
import { dotConfig } from './dotConfig';
import * as ShapeTypes from './ShapeTypes';

class CodingGame extends Component {
  constructor(props) {
    super(props);
    this.onDotClick = this.onDotClick.bind(this);
    this.onCircleIconClick = this.onCircleIconClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleTextEdit = this.handleTextEdit.bind(this);
    this.handleTextareaKeyDown = this.handleTextareaKeyDown.bind(this);
    this.finishEditing = this.finishEditing.bind(this);
    this.onSquareIconClick = this.onSquareIconClick.bind(this);
    this.selectCircle = this.selectCircle.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    this.onTrashIconClick = this.onTrashIconClick.bind(this);
    this.onShapeDblClick = this.onShapeDblClick.bind(this);
    this.getEdgeVertices = this.getEdgeDots.bind(this);
    this.selectEdge = this.selectEdge.bind(this);
    this.edgeExists = this.edgeExists.bind(this);
    this.getDistance = this.getDistance.bind(this);

    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    this.state = {
      surroundingWidth: 300 * widthScale,
      surroundingHeight: 300 * heightScale,
      shapeEditingID: null,
      shapeEditingType: null,
      selectedShapeID: null,
      sizeValue: '',
      editTextValue: null,
      editTextPosition: { x: null, y: null },
      height: window.innerHeight,
      width: window.innerWidth,

      startX: props.game === 1 ? 250 * widthScale : 180 * widthScale,
    };
  }

  componentDidMount() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    this.props.createDot({ x: 25 * widthScale, y: 25 * heightScale });
    this.props.createDot({ x: 225 * widthScale, y: 50 * heightScale });
    this.props.createDot({ x: 175 * widthScale, y: 125 * heightScale });
    this.props.createDot({ x: 50 * widthScale, y: 150 * heightScale });
    this.props.createDot({ x: 75 * widthScale, y: 250 * heightScale });
    this.props.createDot({ x: 175 * widthScale, y: 250 * heightScale });
    this.props.createDot({ x: 275 * widthScale, y: 175 * heightScale });

    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  edgeExists(from, to) {
    var res = false;
    this.props.edges.forEach((edge) => {
      if (
        (edge.props.from === from && edge.props.to === to) ||
        (edge.props.from === to && edge.props.to === from)
      ) {
        res = true;
      }
    });
    return res;
  }

  getEdgeDots(edge) {
    const from = _.find(this.props.dots, { id: edge.props.from });
    const to = _.find(this.props.dots, { id: edge.props.to });
    return { from, to };
  }

  getDistance(first, second) {
    const firstNode = _.find(this.props.dots, { id: first });
    const secondnode = _.find(this.props.dots, { id: second });

    let distance = Math.sqrt(
      Math.pow(Math.abs(firstNode.props.x - secondnode.props.x), 2) +
        Math.pow(Math.abs(firstNode.props.y - secondnode.props.y), 2)
    );
    return distance;
  }

  onDotClick(id, isSelected) {
    if (!isSelected) {
      this.props.selectDot(id);
      this.props.dots.forEach((dot) => {
        if (dot.id !== id && dot.isSelected) {
          if (!this.edgeExists(id, dot.id)) {
            this.props.updateDistance(
              Math.round(
                (this.getDistance(id, dot.id) / 25 + Number.EPSILON) * 100
              ) / 100
            );
            // this.setState({
            //   sizeValue:
            //     Math.round(
            //       (this.getDistance(id, dot.id) / 25 + Number.EPSILON) * 100
            //     ) / 100,
            // });
          }
          this.props.deselectDot(id);
          this.props.deselectDot(dot.id);
        }
      });
    } else {
      this.props.deselectDot(id);
    }
  }

  onDragEnd(id, e, shapeType) {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    let startX = this.state.startX;

    var toBeAdd = 0;
    if (shapeType === ShapeTypes.SQUARE) {
      const square = _.find(this.props.squares, { id: id });
      toBeAdd = square.props.side / 2;
    }

    const dot = _.find(this.props.dots, function (myDot) {
      return (
        Math.abs(myDot.props.x + startX - toBeAdd - e.target.x()) <
          20 * widthScale &&
        Math.abs(myDot.props.y + 30 * widthScale - toBeAdd - e.target.y()) <
          20 * widthScale
      );
    });

    let newX = dot ? dot.props.x + startX - toBeAdd : e.target.x();
    let newY = dot ? dot.props.y + 30 * widthScale - toBeAdd : e.target.y();

    this.setState({ editTextPosition: { x: newX, y: newY } });
    if (shapeType === ShapeTypes.CIRCLE) {
      this.props.updateCircle(id, { x: newX, y: newY });
    } else if (shapeType === ShapeTypes.SQUARE) {
      this.props.updateSquare(id, { x: newX, y: newY });
    }
  }

  onCircleIconClick() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    this.props.createCircle({
      x: 55 * widthScale,
      y: 125 * heightScale,
      radius: 30 * widthScale,
    });
  }

  onSquareIconClick() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    this.props.createSquare({
      x: 30 * widthScale,
      y: 100 * heightScale,
      side: 50 * widthScale,
    });
  }

  onTrashIconClick() {
    this.props.circles.forEach((circle) => {
      if (circle.props.isSelected) {
        this.props.clearShape(circle.id, ShapeTypes.CIRCLE);
      }
    });
    this.props.squares.forEach((square) => {
      if (square.props.isSelected) {
        this.props.clearShape(square.id, ShapeTypes.SQUARE);
      }
    });
    this.props.edges.forEach((edge) => {
      if (edge.props.isSelected) {
        this.props.clearShape(edge.id, ShapeTypes.EDGE);
      }
    });
  }

  onShapeDblClick(e, id) {
    var shape = _.find(this.props.circles, { id: id });
    if (!shape) {
      shape = _.find(this.props.squares, { id: id });
      this.setState({ shapeEditingType: ShapeTypes.SQUARE });
    } else {
      this.setState({ shapeEditingType: ShapeTypes.CIRCLE });
    }
    this.setState({
      shapeEditingID: id,
      editTextPosition: { x: shape.props.x, y: shape.props.y },
    });
  }

  handleTextEdit(e) {
    this.setState({ editTextValue: e.target.value });
  }

  finishEditing() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    if (this.state.shapeEditingType === ShapeTypes.CIRCLE) {
      this.props.updateCircle(this.state.shapeEditingID, {
        radius: this.state.editTextValue * widthScale,
      });
    } else if (this.state.shapeEditingType === ShapeTypes.SQUARE) {
      this.props.updateSquare(this.state.shapeEditingID, {
        side: this.state.editTextValue,
      });
    }
    this.setState({ shapeEditingID: null, shapeEditingType: null });
  }

  handleTextareaKeyDown(e) {
    if (e.keyCode === 13) {
      this.finishEditing();
    }
  }

  selectEdge(id, isSelected) {
    if (isSelected) {
      this.props.updateEdgee(id, { isSelected: false });
    } else {
      this.props.updateEdgee(id, { isSelected: true });
    }
  }

  selectCircle(id, isSelected) {
    if (!isSelected) {
      this.props.updateCircle(id, { isSelected: true });
    } else {
      this.props.updateCircle(id, { isSelected: false });
    }
  }

  selectSquare(id, isSelected) {
    if (!isSelected) {
      this.props.updateSquare(id, { isSelected: true });
    } else {
      this.props.updateSquare(id, { isSelected: false });
    }
  }

  render() {
    let ContainerComponent = this.props.container;

    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    return (
      <>
        <Stage width={this.state.width} height={this.state.height + 50}>
          <Layer>
            <Group x={this.state.startX} y={30 * heightScale}>
              <ContainerComponent
                width={Math.min(this.state.surroundingWidth, this.state.width)}
                height={Math.min(
                  this.state.surroundingHeight,
                  this.state.height
                )}
              />
              {this.props.edges.map((edge) => {
                const { from, to } = this.getEdgeDots(edge);
                return (
                  <Line
                    points={[
                      from.props.x,
                      from.props.y,
                      to.props.x,
                      to.props.y,
                    ]}
                    stroke={edge.props.isSelected ? '#6a6d73' : 'black'}
                    isSelected={edge.props.isSelected}
                    strokeWidth={3}
                    shadowBlur={edge.props.isSelected ? 10 : 0}
                    onClick={() => {
                      this.selectEdge(edge.id, edge.props.isSelected);
                    }}
                    onTouchStart={() => {
                      this.selectEdge(edge.id, edge.props.isSelected);
                    }}
                  />
                );
              })}
              {this.props.game === 1 ? (
                this.props.dots.map((dot) => {
                  return (
                    <Circle
                      key={dot.id}
                      x={dot.props.x}
                      y={dot.props.y}
                      {...dotConfig}
                      fill={dot.isSelected ? '#6e6b6b' : 'red'}
                      shadowBlur={dot.isSelected ? 10 : 0}
                      onTouchStart={() => {
                        this.onDotClick(dot.id, dot.isSelected);
                      }}
                      onClick={() => {
                        this.onDotClick(dot.id, dot.isSelected);
                      }}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </Group>
            {this.props.circles.map((circle) => {
              return (
                <GameCircle
                  key={circle.id}
                  id={circle.id}
                  x={circle.props.x}
                  y={circle.props.y}
                  isSelected={circle.props.isSelected}
                  radius={circle.props.radius}
                  onClick={this.selectCircle}
                  onDblClick={this.onShapeDblClick}
                  onDragEnd={this.onDragEnd}
                />
              );
            })}
            {this.props.squares.map((square) => {
              return (
                <GameSquare
                  key={square.id}
                  id={square.id}
                  x={square.props.x}
                  y={square.props.y}
                  side={square.props.side}
                  isSelected={square.props.isSelected}
                  onClick={this.selectSquare}
                  onDblClick={this.onShapeDblClick}
                  onDragEnd={this.onDragEnd}
                />
              );
            })}
          </Layer>
        </Stage>
        <CodingGameNav
          onCircleIconClick={this.onCircleIconClick}
          onSquareIconClick={this.onSquareIconClick}
          onTrashIconClick={this.onTrashIconClick}
        />
        {this.props.game === 1 ? (
          <Label style={{ top: '40px', left: '10px', position: 'absolute' }}>
            فاصله :<Label.Detail>{this.props.distance}</Label.Detail>
          </Label>
        ) : (
          <></>
        )}
        {this.state.shapeEditingID ? (
          <input
            id="graphTextInput"
            value={this.state.editTextValue}
            style={{
              top: this.state.editTextPosition.y + 20 + 'px',
              left: this.state.editTextPosition.x - 10 + 'px',
              width: 60,
              height: 30,
              position: 'absolute',
            }}
            type="number"
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

const mapStateToProps = (state) => ({
  dots: state.codingGame.dots,
  circles: state.codingGame.circles,
  squares: state.codingGame.squares,
  edges: state.codingGame.edges,
  distance: state.codingGame.distance,
});
export default connect(mapStateToProps, {
  createDot,
  selectDot,
  deselectDot,
  createCircle,
  updateCircle,
  createSquare,
  updateSquare,
  clearShape,
  updateEdgee,
  createEdge,
  updateDistance,
})(CodingGame);
