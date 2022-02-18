import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import {
  Input,
  Container,
  Grid,
  Form,
  TextArea,
  Segment,
  Label,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { isHashValid } from './utilities'
import { Crypt, RSA } from 'hybrid-crypto-js';
import {
  updateMessage,
  updateMessageSignature,
  updateLoading,
} from '../../../redux/actions/blockChain'

var crypt = new Crypt();

class PublicPrivateKeyPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMining: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.sign = this.sign.bind(this)
  }

  sign() {
    this.props.updateLoading(true)
    var signature = crypt.signature(this.props.privateKey, this.props.message);
    this.props.updateMessageSignature(signature)
    this.props.updateLoading(false)
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.props.updateMessage(value)
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'امضا'}
                  </Label>
                  <br />
                  <TextArea
                    value={this.props.message}
                    style={{ direction: 'rtl' }}
                    placeholder='پیغامتو بنویس :)'
                    onChange={this.handleChange}
                  />
                  <Label size='medium' color='blue'>
                    کلید خصوصی:
                  </Label>
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={this.props.privateKey ? sha256(this.props.privateKey) : 'محل کلید خصوصی شما...'}
                    />
                  </Input>
                  <br />
                  <br />
                  <Button
                    disabled={this.props.isLoading || !this.props.privateKey}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.sign}
                  >
                    امضاش کن!
                  </Button>
                  <br />
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={this.props.messageSignature ? sha256(this.props.messageSignature) : 'محل امضای پیغام شما...'}
                    />
                  </Input>
                </Form>

              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  privateKey: state.blockChain.privateKey,
  message: state.blockChain.message,
  messageSignature: state.blockChain.messageSignature,
  isLoading: state.blockChain.isLoading,
});

export default connect(
  mapStateToProps,
  {
    updateMessage,
    updateMessageSignature,
    updateLoading,
  }
)(PublicPrivateKeyPane)
