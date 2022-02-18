import React, { Component } from 'react';
import { Layer, Line } from 'react-konva';

export default class Road extends Component {

  updateRoad(road) {
    this.firstLine.points(road);
    this.secondLine.points(road);
    this.firstLine.getLayer().batchDraw();
  }

  render() {
    return (
      <Layer >
        <Line
          points={this.props.road}
          stroke="#333"
          strokeWidth={25}
          shadowBlur={3}
          lineJoin='round'
          ref={(line) => (this.firstLine = line)}
        />
        <Line
          points={this.props.road}
          stroke="#ccc"
          // dash={[25, 10]}
          ref={(line) => (this.secondLine = line)}
        />
      </Layer>
    );
  }
}