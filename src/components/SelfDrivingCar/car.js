import React, { Component } from 'react';
import { Layer } from 'react-konva';
import { Spring, animated } from 'react-spring/renderprops-konva';

const scale = { x: 0.05, y: 0.05 }

export default class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
      tetha: null,
      image: null,
      dimensions: [2401, 1192], // danger!!!!
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
    this.image.src = process.env.PUBLIC_URL + '/automobile2.png';
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({
      image: this.image,
    });
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
            x: this.state.x,
            y: this.state.y,
            rotation: this.state.tetha,
            scale: scale,
          }}
        >
          {props => (
            <animated.Image
              {...props}
              image={this.state.image}
              offsetY={this.state.dimensions[1] / 2}
            />
          )}
        </Spring>
      </Layer>
    );
  }
}