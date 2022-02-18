import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class GameWidget extends Component {
  render() {
    return (
      <Segment>
        <img src={this.props.link} style={{ width: '100%' }} />
      </Segment>
    );
  }
}
