import React, { Component } from 'react';
import { Line } from 'react-konva';

class DormEdge extends Component {
  points(points) {
    let res;
    if (!!points) {
      this.myLine.points(points);
    } else {
        res = this.myLine.points();
    }
    this.myLine.getLayer().batchDraw();
    return res;
  }

  render() {
    const widthScale = window.innerWidth / 671;
    return (
      <>
        <Line
          {...this.props}
          stroke={this.props.inMaxMatch ? 'red' : "#333"}
          strokeWidth={widthScale > 0.8 ? 10 : 7}
          ref={(line) => (this.myLine = line)}
          shadowBlur={this.props.isSelected ? 20 : 0}
        />
      </>
    );
  }
}

export default DormEdge;
