import React, { Component } from 'react';
import URLImage from '../konva/URLImage/URLImage';
import { Transformer, Group, Rect } from 'react-konva';

class Protractor extends Component {
  constructor(props) {
    super(props);
    this.checkTransform = this.checkTransform.bind(this);
  }

  componentDidUpdate() {
    this.checkTransform();
  }

  checkTransform() {
    if (this.props.isSelected) {
      this.transformer.nodes([this.protractor.konvaNode]);
      this.transformer.getLayer().batchDraw();
    }
  }

  render() {
    return (
      <>
        <Group
          draggable
          onDragEnd={this.props.onDragEnd}
          onDragMove={this.props.onDragMove}
          onTouchEnd={this.props.onTouchEnd}
          offsetX={this.props.offsetX}
          offsetY={this.props.offsetY}
          x={this.props.x}
          y={this.props.y}
        >
          <URLImage
            x={0}
            y={0}
            src={process.env.PUBLIC_URL + '/transparent_protracotr.png'}
            width={this.props.width}
            height={this.props.height}
            dontMultiply={true}
            onClick={this.props.onClick}
            ref={(protractor) => (this.protractor = protractor)}
          />
          {this.props.isSelected && (
            <Transformer
              ref={(transformer) => (this.transformer = transformer)}
            />
          )}
        </Group>
      </>
    );
  }
}

export default Protractor;
