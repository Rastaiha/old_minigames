import React, { Component } from 'react';
import { Circle, Group, Line, Rect, Text } from 'react-konva';
import gameTypes from '../../../containers/games/gameTypes.js';
import URLImage from '../URLImage/URLImage.js';

export default class KonvaStreet extends Component {
  points(points) {
    const heightScale = window.innerHeight / 381;

    let res;
    if (!!points) {
      this.firstLine.points(points);
      res = this.secondLine.points(points);
      this.group.setAbsolutePosition({
        x: (points[0] + points[2]) / 2,
        y: (points[1] + points[3]) / 2 - 60 * heightScale,
      });
      let angle = this.calcArrowRotation(points);
      this.arrow.konvaNode.rotation(angle);
      this.arrow.konvaNode.x((this.props.points[0] + this.props.points[2]) / 2);
      this.arrow.konvaNode.y((this.props.points[1] + this.props.points[3]) / 2);
    } else {
      res = this.secondLine.points();
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
          stroke="#333"
          strokeWidth={25 * widthScale}
          ref={(line) => (this.firstLine = line)}
          shadowBlur={this.props.isSelected ? 20 : 0}
        />
        <Line
          {...this.props}
          ref={(line) => (this.secondLine = line)}
          stroke="#ccc"
          dash={[25 * widthScale, 10 * widthScale]}
        />
        <URLImage
          x={(this.props.points[0] + this.props.points[2]) / 2}
          y={(this.props.points[1] + this.props.points[3]) / 2}
          src={process.env.PUBLIC_URL + '/arrow_icon.png'}
          dontMultiply
          offsetX={20 * widthScale}
          offsetY={70 * heightScale}
          width={40 * widthScale}
          height={40 * widthScale}
          shadowBlur={10}
          rotation={this.calcArrowRotation(this.props.points)}
          ref={(node) => {
            this.arrow = node;
          }}
        />
        <Group
          ref={(group) => (this.group = group)}
          x={(this.props.points[0] + this.props.points[2]) / 2}
          y={
            (this.props.points[1] + this.props.points[3]) / 2 - 60 * heightScale
          }
        >
          <Group>
            <Rect
              x={-2}
              y={5}
              width={5 * widthScale}
              height={45 * heightScale}
              fill="#3a3a3a"
            />
            <Circle
              x={0}
              y={0}
              radius={20 * widthScale}
              fill="#eaeaea"
              strokeWidth={5}
              stroke="red"
            />
          </Group>

          <Group
            x={-25 * widthScale}
            y={23 * heightScale}
            ref={(formula) => (this.formula = formula)}
            onClick={(e) => {
              if (this.props.gameType === gameTypes.THIRD_TRAFFIC_GAME.type) {
                this.props.onTextDoubleClick(
                  e,
                  this.props.id,
                  this.props.weight,
                  'traffic'
                );
              }
            }}
            onTouchEnd={(e) => {
              this.props.onTextDoubleClick(
                e,
                this.props.id,
                this.props.weight,
                'traffic'
              );
            }}
          >
            <Rect
              x={0}
              y={0}
              width={50 * widthScale}
              height={20 * heightScale}
              stroke="blue"
              fill="white"
              cornerRadius={widthScale < 0.7 ? 2.5 : 5}
            />
            <Text
              width={50 * widthScale}
              height={20 * heightScale}
              align="center"
              verticalAlign="middle"
              text={
                // this.props.textProps.a +
                (this.props.textProps.a === 0 ? '' : 'x') +
                (this.props.textProps.b >= 0
                  ? this.props.textProps.a === 0
                    ? ''
                    : this.props.textProps.b === 0 ? '' : '+'
                  : '') +
                (this.props.textProps.b === 0
                  ? this.props.textProps.a === 0
                    ? '0'
                    : ''
                  : this.props.textProps.b)
              }
              fill="black"
              fontSize={widthScale < 0.7 ? 10 : 15}
            />
          </Group>

          <Text
            ref={(text) => (this.weightText = text)}
            x={-30 * widthScale}
            y={-8 * heightScale}
            width={60 * widthScale}
            text={this.props.textProps.weight ? this.props.textProps.weight : 0}
            fontSize={widthScale < 0.7 ? 14 : 20}
            fill="black"
            align="center"
            onClick={(e) => {
              this.props.onTextDoubleClick(
                e,
                this.props.id,
                this.props.weight,
                'weight'
              );
            }}
            onTouchEnd={(e) => {
              this.props.onTextDoubleClick(
                e,
                this.props.id,
                this.props.weight,
                'weight'
              );
            }}
          />
        </Group>
      </>
    );
  }
}
