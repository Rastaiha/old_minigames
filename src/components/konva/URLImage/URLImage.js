import React from 'react';
import { Image } from 'react-konva';

export default class URLImage extends React.Component {
  state = {
    image: null,
    width: null,
    height: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  loadImage() {
    this.image = new window.Image();
    this.toDataURL(this.props.src).then((dataUrl) => {
      this.image.src = dataUrl;
      this.image.addEventListener('load', this.handleLoad);
    });
  }
  handleLoad = () => {
    this.image.removeEventListener('load', this.handleLoad);
    this.setState({
      image: this.image,
      width: this.image.naturalWidth,
      height: this.image.naturalHeight,
    });
  };

  render() {
    return (
      <Image
        {...this.props}
        image={this.state.image}
        ref={(node) => {
          this.konvaNode = node;
        }}
        offsetX={
          this.props.offsetX && !this.props.dontMultiply
            ? this.props.offsetX * this.state.width
            : this.props.offsetX
        }
        offsetY={
          this.props.offsetY && !this.props.dontMultiply
            ? this.props.offsetY * this.state.height
            : this.props.offsetY
        }
      />
    );
  }
}
