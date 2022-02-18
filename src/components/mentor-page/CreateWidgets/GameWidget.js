import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import gameTypes from '../../../containers/games/gameTypes';

export default class GameWidget extends Component {
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
        <Form.Select
          label="بازی"
          name="link"
          required
          className="ltr-input rtl-placeholder"
          value={this.state.link}
          options={Object.keys(gameTypes).map((gametype) => ({
            key: gametype,
            value: gameTypes[gametype].url,
            text: gameTypes[gametype].name,
          }))}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
