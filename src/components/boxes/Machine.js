import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
import Box from './Box';

class Machine extends Component {
  render() {
    let count = -1 * this.props.boxWidth + 3;
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        ref={(machine) => (this.machine1 = machine)}
      >
        <Rect
          x={0}
          y={0}
          width={this.props.machineWidth}
          height={this.props.machineHeight}
          stroke="#86a38a"
          cornerRadius={5}
        />
        {this.props.boxes.map((box) => {
          count += this.props.boxWidth + 2;
          return (
            <Box
              key={box.id}
              id={box.id}
              boxX={2.5}
              boxY={this.props.machineHeight - this.props.boxWidth - count}
              label={box.props.label}
              draggableBox={this.props.draggableBox}
              boxWidth={this.props.boxWidth}
              // onDragStart={this.props.onDragStart}
              // onDragMove={this.props.onDragMove}
              onDragEnd={this.props.onDragEnd}
            />
          );
        })}
      </Group>
    );
  }
}

export default Machine;
