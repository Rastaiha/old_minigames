import React, { Component } from 'react';
import { Circle, Group, Layer, Line, Stage } from 'react-konva';
import makeId from '../../utils/makeId';
import _ from 'lodash';

import {
  insertDots,
  insertLines,
  resetGrid,
  updateDot,
  updateLine,
} from '../../redux/actions/grid';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

const getInitLines = (firstX, firstY) => {
  const widthScale = window.innerWidth / 671;
  const heightScale = window.innerHeight / 381;

  let lines = [];
  let tempY = firstY;
  let x;
  let y;
  let length = 23 * heightScale;
  let id;

  for (let i = 0; i < 15; i++) {
    x = firstX;
    y = tempY;
    for (let i = 0; i < 15; i++) {
      id = makeId();
      lines.push({
        id: id,
        x: x,
        y: y,
        points: [0, 0, length, 0],
        props: {
          relatedNodes: [],
        },
      });
      x += length;
    }
    x = firstX;
    y = tempY;
    for (let i = 0; i < 16; i++) {
      id = makeId();
      lines.push({
        id: id,
        x: x,
        y: y,
        points: [0, 0, 0, length],
        props: {
          relatedNodes: [],
        },
      });
      x += length;
    }
    tempY += length;
  }

  x = firstX;
  y = tempY;
  for (let i = 0; i < 15; i++) {
    id = makeId();
    lines.push({
      id: id,
      x: x,
      y: y,
      points: [0, 0, length, 0],
      props: {
        relatedNodes: [],
      },
    });
    x += length;
  }

  return lines;
};

const getInitDots = (firstX, firstY) => {
  const widthScale = window.innerWidth / 671;
  const heightScale = window.innerHeight / 381;

  let dots = [];
  let x;
  let y;
  let tempY = firstY;
  let length = 23 * heightScale;
  let id;

  for (let i = 0; i < 16; i++) {
    x = firstX;
    y = tempY;
    for (let i = 0; i < 16; i++) {
      id = makeId();
      dots.push({
        id: id,
        x: x,
        y: y,
        props: {
          relatedNodes: [],
        },
      });
      x += length;
    }
    tempY += length;
  }

  return dots;
};

class GridComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      dots: [],
      height: window.innerHeight,
      width: window.innerWidth,
    };
    this.onDotClick = this.onDotClick.bind(this);
    this.updateCircle = this.updateGrid.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    const dots = getInitDots(170 * widthScale, 10 * heightScale);
    const lines = getInitLines(170 * widthScale, 10 * heightScale);

    this.props.insertDots(dots);
    this.props.insertLines(lines);
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  updateGrid(id) {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    const dot = _.find(this.props.dots, { id: id });
    let dotID = dot.id;
    let length = 23 * heightScale;
    let value = true;

    if (
      dot.props.relatedNodes.length === 1 &&
      dot.props.relatedNodes[0] === dot.id
    ) {
      return;
    }

    let precision = 0.005;

    const dotsConnected = _.filter(this.props.dots, function (other) {
      return (
        (Math.abs(other.x - dot.x) < precision &&
          (Math.abs(other.y - dot.y + length) < precision ||
            Math.abs(other.y - dot.y - length) < precision)) ||
        (Math.abs(other.y - dot.y) < precision &&
          (Math.abs(other.x - dot.x + length) < precision ||
            Math.abs(other.x - dot.x - length) < precision))
      );
    });

    const linesConnected = _.filter(this.props.lines, function (line) {
      return (
        (Math.abs(line.x - dot.x) < precision &&
          Math.abs(line.y - dot.y) < precision) ||
        (Math.abs(line.x - dot.x + length) < precision &&
          Math.abs(line.y - dot.y) < precision &&
          line.points[2] !== 0) ||
        (Math.abs(line.x - dot.x) < precision &&
          Math.abs(line.y - dot.y + length) < precision &&
          line.points[3] !== 0)
      );
    });

    let newProps = this.returnNewProps(dot, value, dotID, 'center');
    this.props.updateDot(dot.id, newProps);

    dotsConnected.forEach((dot) => {
      let newProps = this.returnNewProps(dot, value, dotID, 'other');
      this.props.updateDot(dot.id, newProps);
    });

    linesConnected.forEach((line) => {
      let newProps = this.returnNewProps(line, value, dotID, 'other');
      this.props.updateLine(line.id, newProps);
    });
  }

  returnNewProps(node, value, dotID, situation) {
    let newProps;

    let newRelateds = value
      ? [...node.props.relatedNodes, dotID]
      : this.removeFromArray(node.props.relatedNodes, dotID);

    let color =
      newRelateds.length > 1
        ? 'red'
        : situation === 'center'
        ? 'green'
        : '#edd224';

    if (!newRelateds.length) {
      newProps = {
        isSelected: value,
        relatedNodes: newRelateds,
        color,
      };
    } else {
      newProps = {
        isSelected: true,
        relatedNodes: newRelateds,
        color,
      };
    }
    return newProps;
  }

  removeFromArray(array, id) {
    return _.remove(array, (member) => {
      return member !== id;
    });
  }

  onDotClick(id) {
    this.updateGrid(id);
  }

  reset() {
    this.props.resetGrid();
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;

    return (
      <>
        <Stage width={this.state.width} height={this.state.height + 50}>
          <Layer
            style={{
              top: '10px',
            }}
          >
            <Group y={(this.state.height - 345 * heightScale) / 2 - 10}>
              {this.props.lines.map((line) => {
                return (
                  <Line
                    key={line.id}
                    id={line.id}
                    x={line.x}
                    y={line.y}
                    points={line.points}
                    stroke={line.props.isSelected ? '#edd224' : 'black'}
                  />
                );
              })}
              {this.props.dots.map((dot) => {
                return (
                  <Circle
                    key={dot.id}
                    id={dot.id}
                    x={dot.x}
                    y={dot.y}
                    radius={7 * widthScale}
                    fill={dot.props.isSelected ? dot.props.color : 'black'}
                    onClick={(e) => {
                      this.onDotClick(e.target.attrs.id);
                    }}
                    onTouchStart={(e) => {
                      this.onDotClick(e.target.attrs.id);
                    }}
                  />
                );
              })}
            </Group>
          </Layer>
        </Stage>
        <Icon
          name="repeat"
          onClick={this.reset}
          style={{
            top: '10px',
            left: '10px',
            position: 'absolute',
            cursor: 'pointer',
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dots: state.grid.gridDots,
  lines: state.grid.lines,
});
export default connect(mapStateToProps, {
  insertDots,
  insertLines,
  updateDot,
  updateLine,
  resetGrid,
})(GridComponent);
