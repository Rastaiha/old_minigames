import React, { Component } from 'react';
import { Rect, Group, Text } from 'react-konva';
import * as situations from './situations';

class Box extends Component {
  render() {
    return (
      <Group
        x={this.props.boxX}
        y={this.props.boxY}
        ref={(box) => (this.box = box)}
        draggable={
          !this.props.mostLeftBox &&
          this.props.situation === situations.IN_SHELL
            ? false
            : this.props.situation !== situations.IN_SHELL
            ? this.props.draggableBox
            : true
        }
        onDragEnd={(e) => {
          this.props.onDragEnd(this.props.id, e);
        }}
        dragBoundFunc={(pos) => {
          return this.props.situation !== situations.IN_SHELL
            ? {
                x: pos.x,
                y: this.box.getAbsolutePosition().y,
              }
            : pos;
        }}
      >
        <Rect
          x={0}
          y={0}
          height={this.props.boxWidth}
          width={this.props.boxWidth}
          fill={this.props.mostLeftBox ? 'gray' : 'black'}
          cornerRadius={5}
        />
        <Text
          x={0}
          y={this.props.boxWidth / 2 - 6}
          align="center"

          width={this.props.boxWidth}
          text={this.props.label}
          stroke="green"
          fontSize={12}
        />
      </Group>
    );
  }
}

export default Box;
