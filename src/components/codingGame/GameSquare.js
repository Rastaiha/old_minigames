import React, { Component } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import * as shapeTypes from '../../containers/games/CodingGame/ShapeTypes';

class GameSquare extends Component {
  render() {
    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        onDblClick={(e) => {
          this.props.onDblClick(e, this.props.id);
        }}
        onClick={() => {
          this.props.onClick(this.props.id, this.props.isSelected);
        }}
        onDragEnd={(e) => {
          this.props.onDragEnd(this.props.id, e, shapeTypes.SQUARE);
        }}

        onTouchStart={() => {
            this.props.onClick(this.props.id, this.props.isSelected);
        }}
        onDblTap={(e) => {
            this.props.onDblClick(e, this.props.id);
        }}
        draggable
      >
        <Rect
          width={this.props.side}
          height={this.props.side}
          shadowBlur={this.props.isSelected ? 20 : 0}
          stroke={this.props.isSelected ? '#6e6b6b' : 'black'}
        />
        <Circle
          x={this.props.side / 2}
          y={this.props.side / 2}
          radius={3}
          fill={this.props.isSelected ? '#6e6b6b' : 'black'}
        />
      </Group>
    );
  }
}

export default GameSquare;
