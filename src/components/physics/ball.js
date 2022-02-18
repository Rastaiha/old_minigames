import React, { Component } from 'react';
import { Layer } from 'react-konva';
import { Spring, animated } from 'react-spring/renderprops-konva';

const scale = { x: 0.01, y: 0.01 }

export default class Ball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
      tetha: 0,
      image: null,
      dimensions: [null, null],
    }
  }

  componentDidMount() {
    this.loadImage();
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    this.image = new window.Image();
    this.image.src = process.env.PUBLIC_URL + '/soccerBall.png';
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({
      image: this.image,
    });
    this.state.dimensions[0] = this.image.naturalWidth;
    this.state.dimensions[1] = this.image.naturalHeight;
  };

  updateSpring(x, y, tetha) {
    this.setState({
      x: x,
      y: y,
      tetha: tetha,
    })
  }

  render() {
    return (
      <Layer>
        <Spring
          native
          to={{
            x: this.state.x || this.props.x,
            y: this.state.y || this.props.y,
            rotation: this.state.tetha,
            scale: scale,
          }}
        >
          {props => (
            <animated.Image
              {...props}
              image={this.state.image}
              offsetX={this.state.dimensions[0] / 2}
              offsetY={this.state.dimensions[1] / 2}
            />
          )}
        </Spring>
      </Layer>
    );
  }
}