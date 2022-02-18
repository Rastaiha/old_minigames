import React, { Component } from 'react';
import TinyEditorComponent from '../../editor/tiny_editor/react_tiny/TinyEditorComponent';

export default class TextWidget extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
  }
  getData = () => ({
    text: this.inputEl.getContent(),
  });
  render() {
    return (
      <div>
        <TinyEditorComponent
          id="edit-text"
          name="edit-text"
          ref={(ref) => (this.inputEl = ref)}
        />
      </div>
    );
  }
}
