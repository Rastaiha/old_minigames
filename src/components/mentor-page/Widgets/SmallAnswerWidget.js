import React, { Component } from 'react';
import TinyPreview from '../../editor/tiny_editor/react_tiny/Preview';

export default class SmallAnswerWidget extends Component {
  render() {
    return (
      <>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={this.props.text}
        />
        <input disabled value={this.props.answer.text} />
      </>
    );
  }
}
