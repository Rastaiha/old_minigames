import React, { Component } from 'react';
import TinyPreview from '../../editor/tiny_editor/react_tiny/Preview';
import { Segment } from 'semantic-ui-react';

export default class MultiAnswerWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
  }
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
        {this.props.choices.map((option, index) => (
          <Segment
            color={index === this.state.selected ? 'green' : ''}
            onClick={() => {
              this.setState({ selected: index });
            }}
          >
            {option.text}
          </Segment>
        ))}
      </>
    );
  }
}
