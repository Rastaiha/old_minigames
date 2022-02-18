import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class LinkWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  getData = () => ({
    link: this.state.link,
  });
  render() {
    return (
      <div>
        <Form.Input
          label="لینک"
          name="link"
          required
          className="ltr-input rtl-placeholder"
          value={this.state.link}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
