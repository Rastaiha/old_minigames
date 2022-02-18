import React, { Component } from 'react';
import { Embed } from 'semantic-ui-react';

export default class GameWidget extends Component {
  render() {
    return (
      <Embed
        autoplay={true}
        url={this.props.link}
        icon="game"
        placeholder={process.env.PUBLIC_URL + '/gameTheory.png'}
      />
    );
  }
}
