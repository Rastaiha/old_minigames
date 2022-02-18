import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import {
  Input,
  Container,
  Grid,
  Form,
  TextArea,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import {
  updateHashData,
} from '../../../redux/actions/blockChain'

class HashPane extends Component {
  handleChange = (event) => {
    const { value } = event.target;
    this.props.updateHashData(value)
  }

  render() {
    return (
      <Container text>

        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Form style={{ width: '100%' }}>
                <TextArea
                  style={{ direction: 'rtl' }}
                  placeholder='نوشتن از شما، هش‌کردن از ما :)'
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Input style={{ width: '100%' }}>
                  <input
                    disabled
                    style={{ textAlign: 'center' }}
                    value={this.props.hashData ? sha256.hex(this.props.hashData) : 'یه چیزی بده هش کنم دیگه!'}
                  />
                </Input>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  hashData: state.blockChain.hashData,
});

export default connect(
  mapStateToProps,
  {
    updateHashData,
  }
)(HashPane)
