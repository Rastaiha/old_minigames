import React, { Component } from 'react';
import TinyEditorComponent from '../../editor/tiny_editor/react_tiny/TinyEditorComponent';
import { Form } from 'semantic-ui-react';

export default class BigAnswerWidget extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }

  getData = () => ({
    text: this.inputEl.getContent(),
    answer: this.answerEl.getContent(),
  });
  render() {
    return (
      <div>
        <TinyEditorComponent
          id="edit-text"
          name="edit-text"
          ref={(ref) => (this.inputEl = ref)}
        />
        <label>پاسخ</label>
        <TinyEditorComponent
          id="edit-big-answer"
          name="edit-big-answer"
          ref={(ref) => (this.answerEl = ref)}
        />
      </div>
    );
  }
}
