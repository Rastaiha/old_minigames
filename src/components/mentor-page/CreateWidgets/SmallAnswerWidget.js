import React, { Component } from 'react';
import TinyEditorComponent from '../../editor/tiny_editor/react_tiny/TinyEditorComponent';
import { Form } from 'semantic-ui-react';

export default class SmallAnswerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getData = () => ({
    text: this.inputEl.getContent(),
    answer: this.state.answer,
  });
  render() {
    return (
      <div>
        <TinyEditorComponent
          id="edit-text"
          name="edit-text"
          ref={(ref) => (this.inputEl = ref)}
        />
        <Form.Input
          label="پاسخ"
          name="answer"
          required
          className="rtl-input rtl-placeholder"
          value={this.state.answer}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
