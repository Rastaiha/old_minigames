import React, { Component } from 'react';
import { Group, Circle, Transformer, Text } from 'react-konva';

class Handler extends React.Component {
  componentDidMount() {
    // not really "react-way". But it works.
    const stage = this.transformer.getStage();
    const rectangle = stage.findOne('.rectange-container');
    this.transformer.attachTo(rectangle);
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={(node) => {
          this.transformer = node;
        }}
        enabledHandlers={['bottom-right']}
        rotateEnabled={false}
        lineEnabled={false}
      />
    );
  }
}

class GameNode extends Component {
  state = {
    isSelected: false,
  };

  onClick() {
    this.setState({ isSelected: !this.state.isSelected });
  }

  checkTransform() {
    if (this.state.isSelected) {
      this.transformer.nodes([this.circle]);
      this.transformer.getLayer().batchDraw();
    } else {
      // this.circle.draggable(false);
    }
  }

  componentDidUpdate() {
    this.checkTransform();
  }

  render() {
    return (
      <>
        <Group
          x={this.props.x}
          y={this.props.y}
          draggable
          ref={(circle) => (this.circle = circle)}
          onClick={this.onClick.bind(this)}
        >
          <Group x={-20} y={0} verticalAlign="middle">
            <Circle x={0} y={0} radius={20} fill="red" />
            <Text x={-20} y={-5} text="param1" fontSize={8} align="center" width={40} />
          </Group>
          <Group x={20} y={0} verticalAlign="middle">
            <Circle x={0} y={0} radius={20} fill="blue" />
            <Text x={-20} y={-5} text="param2" fontSize={8} align="center" width={40} />
          </Group>
        </Group>
        {this.state.isSelected ? (
          <Transformer
            ref={(transformer) => (this.transformer = transformer)}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default GameNode;
