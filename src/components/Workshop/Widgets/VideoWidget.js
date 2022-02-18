import React, { Component } from 'react';

export default class GameWidget extends Component {
  render() {
    return <video controls src={this.props.link} />;
  }
}
