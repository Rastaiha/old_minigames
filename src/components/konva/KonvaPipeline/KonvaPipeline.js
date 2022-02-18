import React, { Component } from 'react';
import { Line, Text, Group } from 'react-konva';
import URLImage from '../URLImage/URLImage.js';

export default class KonvaPipeline extends Component {
  points(points) {
    let res;
    if (!!points) {
      this.firstLine.points(points);
      res = this.firstLine.points(points);

      let newX = (points[0] + points[2]) / 2;
      let newY = (points[1] + points[3]) / 2;

      this.capacity.x(newX);
      this.capacity.y(newY);
      this.signs.x(newX);
      this.signs.y(newY);

      let angle = this.calcArrowRotation(points);
      this.arrow.konvaNode.rotation(angle);
      this.signs.rotation(angle);
      this.arrow.konvaNode.x((this.props.points[0] + this.props.points[2]) / 2);
      this.arrow.konvaNode.y((this.props.points[1] + this.props.points[3]) / 2);
    } else {
      res = this.firstLine.points();
    }
    this.firstLine.getLayer().batchDraw();
    return res;
  }

  calcArrowRotation(points) {
    let deltaX = points[1] - points[3];
    let deltaY = points[0] - points[2];

    var angle = (Math.atan(Math.abs(deltaX / deltaY)) * 180) / Math.PI;
    if (deltaX <= 0 && deltaY <= 0) {
      angle += 90;
    } else if (deltaX < 0 && deltaY > 0) {
      angle = -1 * angle - 90;
    } else if (deltaX > 0 && deltaY < 0) {
      angle = 90 - angle;
    } else if (deltaX >= 0 && deltaY >= 0) {
      angle = angle - 90;
    }
    return angle;
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    return (
      <>
        <Line
          {...this.props}
          stroke={
            this.props.isSelected
              ? '#6a6d73'
              : !this.props.canBeSelected
              ? this.props.hasChanged
                ? this.props.lastMovPos
                  ? 'green'
                  : 'pink'
                : '#333'
              : this.props.isInput
              ? 'blue'
              : !this.props.isInput
              ? 'yellow'
              : '#333'
          }
          strokeWidth={25 * widthScale}
          ref={(line) => (this.firstLine = line)}
          shadowBlur={this.props.isSelected ? 10 : 0}
        />
        <URLImage
          x={(this.props.points[0] + this.props.points[2]) / 2}
          y={(this.props.points[1] + this.props.points[3]) / 2}
          src={process.env.PUBLIC_URL + '/arrow_icon.png'}
          offsetX={20 * widthScale}
          offsetY={-20 * heightScale}
          width={40 * widthScale}
          height={40 * heightScale}
          shadowBlur={10}
          dontMultiply={true}
          rotation={this.calcArrowRotation(this.props.points)}
          ref={(node) => {
            this.arrow = node;
          }}
        />
        <Group
          x={(this.props.points[0] + this.props.points[2]) / 2}
          y={(this.props.points[1] + this.props.points[3]) / 2}
          ref={(signs) => (this.signs = signs)}
          offsetX={9 * widthScale}
          offsetY={55 * heightScale}
          rotation={this.calcArrowRotation(this.props.points)}
        >
          <URLImage
            src={
              this.props.canBeSelected
                ? process.env.PUBLIC_URL + '/plus.png'
                : process.env.PUBLIC_URL + '/non-active-plus.png'
            }
            width={20 * widthScale}
            height={20 * heightScale}
            shadowBlur={10}
            onClick={() => {
              this.props.onPositiveClick(
                this.props.id,
                this.props.canBeSelected
              );
            }}
            onTouchStart={() => {
              this.props.onPositiveClick(
                  this.props.id,
                  this.props.canBeSelected
              );
            }}
          />

          <URLImage
            src={
              this.props.canBeSelected
                ? process.env.PUBLIC_URL + '/minus.png'
                : process.env.PUBLIC_URL + '/non-active-minus.png'
            }
            x={0}
            y={22 * heightScale}
            width={20 * widthScale}
            height={20 * heightScale}
            shadowBlur={10}
            onClick={() => {
              this.props.onNegativeClick(
                this.props.id,
                this.props.canBeSelected
              );
            }}
            onTouchStart={() => {
              this.props.onNegativeClick(
                  this.props.id,
                  this.props.canBeSelected
              );
            }}
          />
        </Group>
        <Group
          x={(this.props.points[0] + this.props.points[2]) / 2}
          y={(this.props.points[1] + this.props.points[3]) / 2}
          ref={(capacity) => (this.capacity = capacity)}
        >
          <Text
            stroke="red"
            fontSize={widthScale > 0.8 ? 20 : 15}
            offsetX={10 * widthScale}
            offsetY={10 * heightScale}
            x={0}
            y={0}
            text={`${this.props.textProps.filled}/${this.props.textProps.capacity}`}
          />
        </Group>
      </>
    );
  }
}
