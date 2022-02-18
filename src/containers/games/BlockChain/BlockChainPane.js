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
  updateBlockChainData,
  updateBlockChainNonce,
  updateBlockChainMining,
} from '../../../redux/actions/blockChain'

const MAXIMUM_ITERATION = 100000;
const NUMBER_OF_BLOCKS = 5;
const _nds = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم'];
const width = window.innerWidth;
const height = window.innerHeight;

class HashPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMining: false,
    };
    this.mine = this.mine.bind(this)
    this.getOutput = this.getHash.bind(this)
  }

  handleDataChange = (event) => {
    const { value, name } = event.target;
    this.props.updateBlockChainData(value, name)
  }

  handleNonceChange = (event) => {
    const { value, name } = event.target;
    this.props.updateBlockChainNonce(value, name);
  }

  mine(index) {
    this.props.updateBlockChainMining(true, index)
    for (let i = 0; i < MAXIMUM_ITERATION; i++) {
      console.log(i)
      if (isHashValid(sha256.hex(this.props.blockChainData[index] + this.getHash(index - 1) + i))) {
        setTimeout(
          () => {
            this.props.updateBlockChainNonce(i, index);
            this.props.updateBlockChainMining(false, index)
            this.forceUpdate()
          }
          , 2000
        )
        break;
      }
    }
    return -1;
  }

  getHash(index) {
    if (index == -1) return '0000000000000000000000000000000000000000000000000000000000000000';
    const { blockChainData, blockChainNonce } = this.props;
    return sha256.hex(blockChainData[index] + this.getHash(index - 1) + blockChainNonce[index])
  }


  getColor(index) {
    if (isHashValid(this.getHash(index))) {
      return 'green'
    } else {
      return 'red'
    }
  }

  getNonce(index) {
    return this.props.blockChainNonce[index]
  }

  render() {
    return (
      <div style={{ maxHeight: height, overflow: 'auto' }}>
        <Container text>
          <Grid columns={1} verticalAlign='middle' centered>
            <Grid.Row>
              <Grid.Column>
                <Form style={{ direction: 'rtl', textAlign: 'right' }}>
                  {Array.from(Array(NUMBER_OF_BLOCKS).keys()).map(index => {
                    return (
                      <Segment inverted key={index} color={this.getColor(index)}>
                        <Label size='big' color='blue'>
                          {'بلوک ' + _nds[index]}
                        </Label>
                        <br />
                        <Label size='medium' color='blue' >
                          عدد:
                        </Label>
                        <Input>
                          <input
                            type='number'
                            name={index}
                            style={{ direction: 'rtl', textAlign: 'right' }}
                            placeholder='یه عدد وارد کن!'
                            onChange={this.handleNonceChange}
                            value={this.props.blockChainNonce[index]}
                          />
                        </Input>
                        <br />
                        <TextArea
                          name={index}
                          style={{ direction: 'rtl' }}
                          placeholder='نوشتن از شما، هش‌کردن از ما :)'
                          onChange={this.handleDataChange}
                        />
                        <br />
                        <Label size='medium' color='blue'>
                          هش نفر قبل:
                        </Label>
                        <Input style={{ width: '100%' }}>
                          <input
                            disabled
                            style={{ textAlign: 'center' }}
                            value={this.getHash(index - 1)}
                          />
                        </Input>
                        <br />
                        <br />
                        <Input style={{ width: '100%' }}>
                          <input
                            disabled
                            style={{ textAlign: 'center' }}
                            value={this.getHash(index)}
                          />
                        </Input>
                        <br />
                        <br />
                        <Button
                          disabled={this.props.isBlockChainMining[index]}
                          color='blue'
                          style={{ direction: 'rtl' }}
                          onClick={() => this.mine(index)}
                        >
                          استخراج کن!
                        </Button>
                      </Segment>
                    );
                  })}
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container >
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  blockChainData: state.blockChain.blockChainData,
  blockChainNonce: state.blockChain.blockChainNonce,
  isBlockChainMining: state.blockChain.isBlockChainMining,
});

export default connect(
  mapStateToProps,
  {
    updateBlockChainData,
    updateBlockChainNonce,
    updateBlockChainMining,
  }
)(HashPane)


