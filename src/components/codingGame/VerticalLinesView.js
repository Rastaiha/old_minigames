import React, { Component } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';
import _ from 'lodash';

class VerticalLinesView extends Component {
  constructor(props) {
    super(props);

    this.getLinePoints = this.getLinePoints.bind(this);
  }

  getLinePoints(line) {
    const from = _.find(this.props.points, { id: line.from });
    const to = _.find(this.props.points, { id: line.to });

    let m = (to.props.y - from.props.y) / (to.props.x - from.props.x);
    let b = from.props.y - m * from.props.x;

    let start = {
      x: 50,
      y: m * 50 + b,
    };

    let end = {
      x: 650,
      y: m * 650 + b,
    };

    return { start, end };
  }

  returnY(x) {
    return -0.4 * x + 320;
  }

  render() {
    console.log('widht:', window.innerWidth, 'height:', window.innerHeight);
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Line
            x={0}
            y={0}
            points={[
              50 * widthScale,
              300 * heightScale,
              650 * widthScale,
              60 * heightScale,
            ]}
            stroke="black"
            strokeWidth={2}
          />

          {this.props.points.map((point) => {
            return (
              <Line
                x={point.props.x}
                y={0}
                points={[0, 3 * heightScale, 0, window.innerHeight - 6 * heightScale]}
                stroke="black"
                strokeWidth={1}
              />
            );
          })}

          {this.props.lines.map((line) => {
            let { start, end } = this.getLinePoints(line);
            return (
              <Line
                x={start.x}
                y={start.y}
                points={[0, 0, (end.x - start.x), (end.y - start.y)]}
                stroke="red"
              />
            );
          })}

          {this.props.points.map((point) => {
            return (
              <Circle
                key={point.id}
                x={point.props.x}
                y={point.props.y}
                radius={7 * widthScale}
                shadowBlur={point.props.isSelected ? 20 : 0}
                fill={point.props.isSelected ? 'gray' : 'black'}
                onClick={() => {
                  this.props.onSelect(point.id);
                }}
                draggable={!point.props.isUsed}
                onDragEnd={(e) => {
                  this.props.onDragEnd(point.id, e);
                }}
                dragBoundFunc={(pos) => {
                  if (pos.y < 3 * heightScale) {
                    return {
                      x: point.props.x,
                      y: 3 * heightScale,
                    };
                  } else if (pos.y > window.innerHeight - 3 * heightScale) {
                    return {
                      x: point.props.x,
                      y: window.innerHeight - 3 * heightScale,
                    };
                  } else {
                    return {
                      x: point.props.x,
                      y: pos.y,
                    };
                  }
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}

export default VerticalLinesView;
