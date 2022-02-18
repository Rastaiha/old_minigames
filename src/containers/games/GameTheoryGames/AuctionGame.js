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
import {
  createAuction,
  bid,
  getResult,
} from '../../../redux/actions/auction'


class AuctionGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.createAuction = this.createAuction.bind(this)
    this.participateAuction = this.participateAuction.bind(this)
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    })
  }

  createAuction() {
    this.props.createAuction()
  }

  participateAuction() {
    this.props.bid();
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form style={{ direction: 'rtl', textAlign: 'center' }}>
                  <Label size='huge' color='blue'>
                    {'مزایده'}
                  </Label>
                  <br />
                  <br />
                  {times?}
                  <Input>
                    <input
                      disabled
                      type='number'
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    // value={}
                    />
                  </Input>
                  <br />
                  <br />
                  <Input style={{ width: '100%' }}>
                    <input
                      name='bid'
                      type='number'
                      style={{ direction: 'rtl', textAlign: 'center' }}
                      placeholder='قیمت پیشنهادی'
                      onChange={this.handleChange}
                    // value={}
                    />
                  </Input>
                  <Input>
                    <input
                      disabled
                      type='number'
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    // value={}
                    />
                  </Input>
                  <br />
                  <br />
                  <Button
                    color='green'
                    centered
                    style={{ direction: 'rtl' }}
                    onClick={this.createAuction}
                  >
                    درخواست ایجاد مزایده
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

});

export default connect(
  mapStateToProps,
  {
    createAuction,
    bid,
    getResult,
  }
)(AuctionGame)
