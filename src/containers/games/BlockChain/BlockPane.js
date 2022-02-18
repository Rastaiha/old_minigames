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
import {
  updateBlockData,
  updateBlockNonce,
  updateBlockMining,
} from '../../../redux/actions/blockChain'

const MAXIMUM_ITERATION = 10000;

class HashPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMining: false,
    };
    this.mine = this.mine.bind(this)
  }

  mine() {
    for (let i = 0; i < MAXIMUM_ITERATION; i++) {
      if (isHashValid(sha256.hex(this.props.blockData + i))) {
        this.props.updateBlockNonce(i);
        break;
      }
    }
    return -1;
  }

  getColor() {
    return isHashValid(sha256.hex(this.props.blockData + this.props.blockNonce)) ?
      'green' : 'red'
  }

  handleDataChange = (event) => {
    const { value } = event.target;
    this.props.updateBlockData(value)
  }

  handleNonceChange = (event) => {
    const { value } = event.target;
    this.props.updateBlockNonce(value);
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color={this.getColor()}>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  <Label size='big' color='blue'>
                    {'بلوک'}
                  </Label>
                  <br />
                  <Label size='medium' color='blue' >
                    عدد:
                  </Label>
                  <Input>
                    <input
                      type='number'
                      style={{ direction: 'rtl', textAlign: 'right' }}
                      placeholder='یه عدد وارد کن!'
                      onChange={this.handleNonceChange}
                      value={this.props.blockNonce}
                    />
                  </Input>
                  <br />
                  <TextArea
                    style={{ direction: 'rtl' }}
                    placeholder='نوشتن از شما، هش‌کردن از ما :)'
                    onChange={this.handleDataChange}
                  />
                  <br />
                  <br />
                  <Input style={{ width: '100%' }}>
                    <input
                      disabled
                      style={{ textAlign: 'center' }}
                      value={sha256.hex(this.props.blockData + this.props.blockNonce)}
                    />
                  </Input>
                  <br />
                  <br />
                  {/* <Button
                    color='blue'
                    centered
                    style={{ direction: 'rtl' }}
                    onClick={this.mine}
                  >
                    استخراج کن!
                  </Button> */}
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
  blockData: state.blockChain.blockData,
  blockNonce: state.blockChain.blockNonce,
  isBlockMining: state.blockChain.isBlockMining,
});

export default connect(
  mapStateToProps,
  {
    updateBlockData,
    updateBlockNonce,
    updateBlockMining,
  }
)(HashPane)
