import React, { Component } from 'react';
import URLImage from '../konva/URLImage/URLImage';
import { Group, Text } from 'react-konva';

class Dummy extends Component {
  render() {
    const dummyWidth = window.innerHeight / 18;
    return (
      <Group draggable>
        <Text
          x={4}
          y={0}
          text={this.props.wrongNumber + 'x'}
          width={dummyWidth}
          align="center"
          fill="red"
          fontSize={24 * this.props.scale}
        />
        <URLImage
          x={0}
          y={20 * this.props.scale}
          offsetX={dummyWidth + 4}
          dontMultiply={true}
          {...this.props}
          onClick={this.props.onClick}
          src={process.env.PUBLIC_URL + '/dummy.png'}
          scale={{
            x: this.props.scale ? this.props.scale : 0.5,
            y: this.props.scale ? this.props.scale : 0.5,
          }}
        />
      </Group>
    );
  }
}

export default Dummy;
