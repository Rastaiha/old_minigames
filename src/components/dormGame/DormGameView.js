import React, { Component } from 'react';
import { Stage, Layer, Circle } from 'react-konva';

class DormGameView extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);

    this.state = {
      isSelected: false,
    };
  }

  onSelect(id) {}

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.props.vertices.map((vertex) => {
            return (
              <Circle
                x={100}
                y={100}
                radius={20}
                fill={vertex.props.isSelected ? 'red' : 'yellow'}
                draggable
                onClick={this.onSelect(vertex.id)}
                stroke="black"
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}

export default DormGameView;
