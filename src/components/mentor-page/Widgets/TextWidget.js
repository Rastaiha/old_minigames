import React, { Component } from 'react';
import TinyPreview from '../../editor/tiny_editor/react_tiny/Preview';
import { Segment } from 'semantic-ui-react';

export default class TextWidget extends Component {
  render() {
    return (
      <Segment>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={this.props.text}
        />
      </Segment>
    );
  }
}
