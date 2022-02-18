import React, { Component } from 'react';
import {
  Segment,
  Input,
  Container,
  Grid,
  Label,
  Reveal,
  Image,
  Header,
  Button,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import URLImage from '../../../components/konva/URLImage/URLImage';

const width = window.innerWidth;
const height = window.innerHeight;

const pointsNumber = 10000;
const totalPhi = 1000000;
var roomDesirabilityForPlayer = [[,], [,]]; // [room number][player number]

var X_points = Array.from(Array(pointsNumber).keys(), (x) => {
  if (x === 0) return 0;
  if (x === 1) return totalPhi;
  return Math.floor(Math.random() * totalPhi);
}).sort(function (a, b) {
  return a - b;
});

for (var i = 0; i < 4; i++) {
  roomDesirabilityForPlayer[Math.floor(i / 2)][i % 2] = Array.from(
    Array(pointsNumber).keys(),
    (x) => Math.floor(Math.random() * totalPhi)
  )
    .sort(function (a, b) {
      return a - b;
    })
    .reverse();
}

function getDesirability(x1, y1, x2, y2, x) {
  return y1 + ((x - x1) / (x2 - x1)) * (y2 - y1);
}

function getPlayerPreference(room1Phi, room2Phi, playerNumber) {
  var room0Desirability, room1Desirability;
  for (var i = pointsNumber - 1; i >= 0; i--) {
    if (room1Phi >= X_points[i]) {
      room0Desirability = getDesirability(
        X_points[i],
        roomDesirabilityForPlayer[0][playerNumber][i],
        X_points[i + 1],
        roomDesirabilityForPlayer[0][playerNumber][i + 1],
        room1Phi
      );
      break;
    }
  }
  for (var i = pointsNumber - 1; i >= 0; i--) {
    if (room2Phi >= X_points[i]) {
      room1Desirability = getDesirability(
        X_points[i],
        roomDesirabilityForPlayer[1][playerNumber][i],
        X_points[i + 1],
        roomDesirabilityForPlayer[1][playerNumber][i + 1],
        room2Phi
      );
      break;
    }
  }
  if (room0Desirability > room1Desirability) {
    return 1;
  } else {
    return 2;
  }
}

export default class RentRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerAnswer: ['', ''],
      room1Phi: 0,
      buttonActivation: [true, true],
    };
    this.setPlayerAnswer = this.setPlayerAnswer.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  setPlayerAnswer(playerNumber) {
    this.setState({
      buttonActivation: {
        ...this.state.buttonActivation,
        [playerNumber]: false,
      },
    });
    const { room1Phi } = this.state;
    const roomNumber = getPlayerPreference(
      room1Phi,
      totalPhi - room1Phi,
      playerNumber
    );
    this.setState({
      playerAnswer: {
        ...this.state.playerAnswer,
        [playerNumber]: 'وایسا یکم فکر کنم...',
      },
    });
    setTimeout(
      function () {
        this.setState({
          playerAnswer: {
            ...this.state.playerAnswer,
            [playerNumber]:
              'من اتاق شماره ' + roomNumber + ' را انتخاب می‌کنم!',
          },
        });
      }.bind(this),
      2000
    );
    setTimeout(
      function () {
        this.setState({
          buttonActivation: {
            ...this.state.buttonActivation,
            [playerNumber]: true,
          },
          playerAnswer: { ...this.state.playerAnswer, [playerNumber]: '' },
        });
      }.bind(this),
      4000
    );
  }

  render() {
    return (
      <Container id="base" className="gameteory-rentroom-game">
        <Grid columns={2} verticalAlign="middle">
          <Grid.Row id="row1">
            <Grid.Column id="column1">
              <Label size="small" className="label">
                بازیکن شماره یک
              </Label>

              <Image
                centered
                circular
                src={process.env.PUBLIC_URL + '/FarFamily.jpg'}
                size="small"
              />

              <Label size="big" className="label">
                آقای همساده
              </Label>
              <br />
              <header as="h5">{this.state.playerAnswer[0]}</header>
            </Grid.Column>

            <Grid.Column id="column2">
              <Label size="small" className="label">
                بازیکن شماره دو
              </Label>

              <Image
                centered
                circular
                src={process.env.PUBLIC_URL + '/Mr.Neighbour.jpg'}
                size="small"
              />

              <Label size="big" className="label">
                فامیل دور
              </Label>

              <header as="h5">{this.state.playerAnswer[1]}</header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row id="row2">
            <Grid.Column>
              <Input
                style={{
                  direction: 'rtl',
                  textAlign: 'center',
                }}
                size="mini"
                disabled={!this.state.buttonActivation[0]}
                placeholder="قیمت اتاق اول"
                name="room1Phi"
                onChange={this.handleChange}
              />
              <Input
                style={{
                  direction: 'rtl',
                  textAlign: 'center',
                }}
                size="mini"
                disabled={true}
                value={totalPhi - this.state.room1Phi}
                placeholder="قیمت اتاق دوم"
              />
            </Grid.Column>

            <Grid.Column>
              <Button
                size="mini"
                disabled={!this.state.buttonActivation[0]}
                onClick={() => this.setPlayerAnswer(0)}
              >
                از بازیکن شماره یک بپرس
              </Button>

              <Button
                size="mini"
                disabled={!this.state.buttonActivation[1]}
                onClick={() => this.setPlayerAnswer(1)}
              >
                از بازیکن شماره دو بپرس
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  vertices: state.graph.vertices,
  edges: state.graph.edges,
});

connect(mapStateToProps, {})(RentRoom);
