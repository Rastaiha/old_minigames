import React, { Component } from 'react';
import { sha256 } from 'js-sha256';
import {
  Input,
  Container,
  Grid,
  Form,
  Segment,
  Label,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { Crypt, RSA } from 'hybrid-crypto-js';
import {
  updatePrivateKey,
  updatePublicKey,
  updateLoading,
} from '../../../redux/actions/blockChain'

var rsa = new RSA()

class PublicPrivateKeyPane extends Component {
  constructor(props) {
    super(props);
    this.generateNewKey = this.generateNewKey.bind(this)
  }

  generateNewKey() {
    this.props.updateLoading(true)
    rsa.generateKeyPairAsync().then(keyPair => {
      this.props.updatePrivateKey(keyPair.privateKey)
      this.props.updatePublicKey(keyPair.publicKey)
      this.props.updateLoading(false)
    });
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
                    {'کلید‌های خصوصی و عمومی'}
                  </Label>
                  <br />
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
                  <Label size='medium' color='blue' >
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
                  <br />
                  <Button
                    disabled={this.props.isLoading}
                    color='green'
                    style={{ direction: 'rtl' }}
                    onClick={this.generateNewKey}
                  >
                    یه جفت کلید جدید بساز!
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
  privateKey: state.blockChain.privateKey,
  publicKey: state.blockChain.publicKey,
  isLoading: state.blockChain.isLoading,
});

export default connect(
  mapStateToProps,
  {
    updatePrivateKey,
    updatePublicKey,
    updateLoading,
  }
)(PublicPrivateKeyPane)
