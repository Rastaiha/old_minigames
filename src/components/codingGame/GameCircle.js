import React, { Component } from 'react';
import { Circle, Group } from 'react-konva';
import * as shapeTypes from '../../containers/games/CodingGame/ShapeTypes';

class GameCircle extends Component {
  render() {
    return (
      <>
        <Group
          draggable
          x={this.props.x}
          y={this.props.y}
          onDblClick={(e) => {
            this.props.onDblClick(e, this.props.id);
          }}
          onDragEnd={(e) => {
            this.props.onDragEnd(this.props.id, e, shapeTypes.CIRCLE);
          }}
          onClick={() => {
            this.props.onClick(this.props.id, this.props.isSelected);
          }}
          onTouchStart={() => {
              this.props.onClick(this.props.id, this.props.isSelected);
          }}
          onDblTap={(e) => {
              this.props.onDblClick(e, this.props.id);
          }}
        >
          <Circle
            x={0}
            y={0}
            radius={this.props.radius}
            stroke={this.props.isSelected ? '#6e6b6b' : 'black'}
            strokeWidth={2}
            shadowBlur={this.props.isSelected ? 20 : 0}
          />
          <Circle
            x={0}
            y={0}
            fill={this.props.isSelected ? '#6e6b6b' : 'black'}
            radius={3}
          />
        </Group>
      </>
    );
  }
}

export default GameCircle;
