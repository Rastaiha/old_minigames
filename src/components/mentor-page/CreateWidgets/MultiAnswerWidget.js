import React, { Component } from 'react';
import TinyEditorComponent from '../../editor/tiny_editor/react_tiny/TinyEditorComponent';
import { Form, Icon } from 'semantic-ui-react';

export default class MultiAnswerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['', ''],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getData = () => ({
    text: this.inputEl.getContent(),
    choices: this.state.options.map((option) => ({ text: option })),
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
        <label>گزینه‌ها</label>
        {this.state.options.map((option, index) => (
          <Form.Input
            name="options"
            placeholder={'گزینه ' + (index + 1)}
            index={index}
            className="rtl-input rtl-placeholder"
            value={option}
            required
            onChange={(e, { value }) => {
              const options = this.state.options;
              options[index] = value;
              this.setState({ options });
            }}
          />
        ))}
        <div>
          <Icon
            name="plus square"
            color="green"
            style={{ margin: '0 2px 5px' }}
            onClick={() => {
              const options = this.state.options;
              options.push('');
              this.setState({ options });
            }}
          />
          <Icon
            name="minus square"
            color="red"
            style={{ margin: '0 2px 5px' }}
            disabled={this.state.options.length > 2 ? false : true}
            onClick={() => {
              if (this.state.options.length > 2) {
                const options = this.state.options;
                options.pop();
                this.setState({ options });
              }
            }}
          />
        </div>
        <Form.Select
          name="answer"
          label="جواب"
          className="rtl-input rtl-placeholder"
          options={this.state.options.map((option, index) => ({
            key: index,
            value: index,
            text: option,
          }))}
          value={this.state.answer}
          required
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
