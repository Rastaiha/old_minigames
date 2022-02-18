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
  updateNewMessage,
  updateLoading,
  updateVerificationStatus,
  updateFirstAttemp,
} from '../../../redux/actions/blockChain'

var crypt = new Crypt();

class VerifyPane extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.verify = this.verify.bind(this)
  }

  verify() {
    this.props.updateLoading(true);
    this.props.updateFirstAttemp(false)

    var verify = crypt.verify(
      this.props.publicKey,
      this.props.messageSignature,
      this.props.newMessage,
    )
    this.props.updateVerificationStatus(verify);
    this.props.updateLoading(false)
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.props.updateNewMessage(value)
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment
                inverted={!this.props.isFirstAttemp}
                color={!this.props.isFirstAttemp ? this.props.isVerified ? 'green' : 'red' : null}
              >
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'تایید امضا'}
                  </Label>
                  <br />
                  <TextArea
                    value={this.props.newMessage}
                    style={{ direction: 'rtl' }}
                    placeholder='پیغامی که میخوای امضاشو چک کنی وارد کن :)'
                    onChange={this.handleChange}
                  />
                  <Label size='medium' color='blue'>
                    کلید عمومی:
                  </Label>
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={this.props.publicKey ? sha256(this.props.publicKey) : 'محل کلید عمومی شما...'}
                    />
                  </Input>
                  <br />
                  <Label size='medium' color='blue'>
                    امضای پیغام:
                  </Label>
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={this.props.messageSignature ? sha256(this.props.messageSignature) : 'محل امضای پیغام شما...'}
                    />
                  </Input>
                  <br />
                  <br />
                  <Button
                    disabled={this.props.isLoading || !this.props.publicKey || !this.props.messageSignature}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.verify}
                  >
                    معتبره؟
                  </Button>
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
  isFirstAttemp: state.blockChain.isFirstAttemp,
  isVerified: state.blockChain.isVerified,
  publicKey: state.blockChain.publicKey,
  newMessage: state.blockChain.newMessage,
  messageSignature: state.blockChain.messageSignature,
  isLoading: state.blockChain.isLoading,
});

export default connect(
  mapStateToProps,
  {
    updateVerificationStatus,
    updateNewMessage,
    updateLoading,
    updateFirstAttemp,
  }
)(VerifyPane)
