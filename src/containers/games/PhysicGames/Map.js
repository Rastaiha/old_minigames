import React, { Component } from 'react';
import Protractor from '../../../components/physics/protractor';
import { Stage, Layer, Circle, Line } from 'react-konva';
import URLImage from '../../../components/konva/URLImage/URLImage';
import _ from 'lodash';
import {
  updateProtractor,
  addDot,
  resetMap,
  updateLittleDots,
  drawLine,
} from '../../../redux/actions/protractor';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.drawLine = this.drawLine.bind(this);

    this.state = {
      widthScale: window.innerWidth / 671,
      heightScale: window.innerHeight / 381,
      protractorIsSelected: false,

      dots: [
        {
          x: 550,
          y: 286,
        },
      ],
    };
  }

  onProtractorClick() {
    this.setState({ protractorIsSelected: !this.state.protractorIsSelected });
  }

  onStageClicked(e) {
    if (this.target === e.target.getStage()) {
      this.setState({ protractorIsSelected: false });
    }
  }

  onProtractorDragEnd(e) {
    this.props.updateProtractor({
      x: e.target.attrs.x / this.state.widthScale,
      y: e.target.attrs.y / this.state.heightScale,
    });
  }

  onMapClick(e) {
    let dotX = this.stage.getPointerPosition().x;
    let dotY = this.stage.getPointerPosition().y;

    console.log('????', e);

    if (
      e.target.attrs.src === '/map.jpeg'
    ) {
      this.props.addDot({
        x: dotX / this.state.widthScale,
        y: dotY / this.state.heightScale,
      });
    }
  }

  reset() {
    this.props.resetMap();
  }

  drawLine(id) {
    const dot = _.find(this.props.dots, { id: id });
    let index = 0;
    this.props.littleDots.forEach((littleDot) => {
      if (littleDot.isSelected) {
        this.props.drawLine(dot, littleDot);
        this.props.updateLittleDots(index, {
          isSelected: false,
        });
      }
      index++;
    });
  }

  render() {
    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={(stage) => (this.stage = stage)}
        >
          <Layer>
            <URLImage
              src={process.env.PUBLIC_URL + '/map.jpeg'}
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              onClick={this.onMapClick.bind(this)}
              onTouchStart={this.onMapClick.bind(this)}
            />
            {this.props.lines.map((line) => {
              return (
                <Line
                  x={line.from.x * this.state.widthScale}
                  y={line.from.y * this.state.heightScale}
                  points={[
                    0,
                    0,
                    (line.to.x - line.from.x) * this.state.widthScale,
                    (line.to.y - line.from.y) * this.state.heightScale,
                  ]}
                  stroke="red"
                  strokeWidth={2}
                />
              );
            })}
            <Circle
              draggable
              x={this.state.dots[0].x * this.state.widthScale}
              y={this.state.dots[0].y * this.state.heightScale}
              radius={4}
              stroke="black"
              strokeWidth={1}
              fill={this.props.littleDots[0].isSelected ? '#e0c7c3' : 'red'}
              shadowBlur={this.props.littleDots[0].isSelected ? 10 : 0}
              onClick={() => {
                this.props.updateLittleDots(0, {
                  isSelected: !this.props.littleDots[0].isSelected,
                });
              }}
              onTouchStart={() => {
                this.props.updateLittleDots(0, {
                  isSelected: !this.props.littleDots[0].isSelected,
                });
              }}
            />
            {this.props.dots.map((dot) => {
              return (
                <Circle
                  key={dot.id}
                  x={dot.x * this.state.widthScale}
                  y={dot.y * this.state.heightScale}
                  radius={5}
                  strokeWidth={2}
                  stroke="black"
                  fill="red"
                  onClick={() => {
                    this.drawLine(dot.id);
                  }}
                  onTouchStart={() => {
                    this.drawLine(dot.id);
                  }}
                />
              );
            })}

            <Protractor
              id="myNode"
              ref={(node) => (this.node = node)}
              x={this.props.protractor.x * this.state.widthScale}
              y={this.props.protractor.y * this.state.heightScale}
              width={300 * this.state.widthScale}
              height={150 * this.state.heightScale}
              isSelected={this.state.protractorIsSelected}
              onClick={this.onProtractorClick.bind(this)}
              onDragEnd={this.onProtractorDragEnd.bind(this)}
              onTouchEnd={this.onProtractorClick.bind(this)}
            />
          </Layer>
        </Stage>
        <Icon
          name="undo"
          onClick={this.reset.bind(this)}
          style={{
            top: '10px',
            left: '10px',
            position: 'absolute',
            cursor: 'pointer',
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  protractor: state.protractor.protractor,
  dots: state.protractor.dots,
  littleDots: state.protractor.littleDots,
  lines: state.protractor.lines,
});

export default connect(mapStateToProps, {
  updateProtractor,
  resetMap,
  addDot,
  updateLittleDots,
  drawLine,
})(Map);
