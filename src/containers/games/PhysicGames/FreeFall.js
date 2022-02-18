import React, { Component } from 'react';
import { Stage, Group, Layer, Arrow, Text } from 'react-konva';
import {
  Segment,
  Container,
  Grid,
  Label,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import URLImage from '../../../components/konva/URLImage/URLImage'
import {
  updateState,
  updatePageNumber,
} from '../../../redux/actions/freeFall'

const width = window.innerWidth;
const height = window.innerHeight;
const rotateSpeed = 5;
const ground = height - 30;
const frame = 60;
const buildingWidth = 0.4 * width;
const initial_ball_x = buildingWidth - 20;
const initial_ball_y = 10;
const buildingHeight = ground - initial_ball_y;
const g = (9.8 * buildingHeight) / 100;
const ball_energy_decrement = 0.8;
const ball_scale = { x: 0.01, y: 0.01 };

class FreeFall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: initial_ball_y,
      starting_y: initial_ball_y,
      v: 0,
      tetha: 0,
      passedTime: 0,
      isBallFalling: 1, // gets 1 or -1
      isBallLastFall: false,
      isBallHittedGround: false,
      isBallDragging: false,
    };
    this.restart = this.restart.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.restart();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  restart() {
    this.props.updateState(0);
    clearInterval(this.timer);
    this.setState({
      y: initial_ball_y,
      starting_y: initial_ball_y,
      v: 0,
      tetha: 0,
      passedTime: 0,
      isBallFalling: 1, // gets 1 or -1
      isBallLastFall: false,
      isBallHittedGround: false,
      isBallDragging: false,
    });
  }

  start() {
    this.props.updateState(1);

    this.timer = setInterval(() => {
      const y = Math.min(this.state.y + this.state.v / frame, ground);
      const tetha =
        this.state.tetha +
        rotateSpeed * this.state.isBallFalling * (this.state.v / frame);
      const v = this.state.v + g / frame;
      const passedTime = !this.state.isBallHittedGround
        ? this.state.passedTime + 1000 / frame
        : this.state.passedTime;

      this.setState({
        y,
        tetha,
        v,
        passedTime,
      });

      if (y + v / frame >= ground) {
        this.setState({
          isBallFalling: -this.state.isBallFalling,
          isBallHittedGround: true,
          v: -ball_energy_decrement * v,
        });

        if (this.state.isBallLastFall) {
          this.setState({
            y: ground,
            v: 0,
            tetha: 0,
          });
        }
      }
      if (v < 0 && v + g / frame >= 0 && ground - y < 10) {
        this.setState({
          is‌BallLastFall: true,
        });
      }
    }, 1000 / frame);
  }

  stop() {
    this.props.updateState(2);
    clearInterval(this.timer);
  }

  render() {
    console.log(this.props.pageNumber)
    return (
      < Container textAlign='center' >
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column>
              <Stage width={width / 2} height={height}>
                <Layer>
                  <Group>
                    <URLImage
                      src={process.env.PUBLIC_URL + '/building.png'}
                      height={buildingHeight + 20}
                      width={buildingWidth}
                      x={20}
                    />
                    <Arrow
                      points={[60, this.state.starting_y, 60, ground]}
                      fill='black'
                      stroke='black'
                      strokeWidth={1}
                    />
                    <Arrow
                      points={[60, ground, 60, this.state.starting_y]}
                      fill='black'
                      stroke='black'
                      strokeWidth={1}
                    />
                    <Text
                      x={20}
                      y={(ground + this.state.starting_y) / 2}
                      text={((ground - this.state.starting_y) / buildingHeight * 100).toFixed(2) + 'm'}
                    />
                    <URLImage
                      draggable={this.props.state === 0}
                      dragBoundFunc={(pos) => {
                        let newY = pos.y;
                        if (newY < initial_ball_y) {
                          newY = initial_ball_y;
                        } else if (pos.y > ground) {
                          newY = ground;
                        }
                        this.setState({
                          starting_y: newY,
                          y: newY,
                        })
                        return ({
                          x: initial_ball_x,
                          y: newY,
                        })
                      }}
                      ref={(ball) => (this.ball = ball)}
                      src={process.env.PUBLIC_URL + '/soccerBall.png'}
                      scale={ball_scale}
                      x={initial_ball_x}
                      y={this.state.y}
                      offsetX={0.5}
                      offsetY={0.5}
                      rotation={this.state.tetha}
                    />
                  </Group >
                </Layer>
              </Stage>
            </Grid.Column>
            <Grid.Column>


              <Segment>
                <Container style={{ direction: 'rtl' }}>
                  قبل از پرتاب کردن توپ، می‌تونی مکان اون رو بالا و پایین کنی!
                </Container>
                <Label color='teal'>
                  {this.state.isBallHittedGround
                    ? ((ground - this.state.starting_y) / buildingHeight * 100).toFixed(2)
                    : ((this.state.y - this.state.starting_y) / buildingHeight * 100).toFixed(2)}
                  <Label.Detail style={{ direction: 'rtl' }}>مسافت طی شده از نقطه‌ی پرتاب:</Label.Detail>
                </Label>
                <Label color='teal'>
                  {(this.state.passedTime / 1000).toFixed(2)}
                  <Label.Detail style={{ direction: 'rtl' }}>زمان گذشته از شروع پرتاب:</Label.Detail>
                </Label>

              </Segment>
              {this.props.state === 0 &&
                <Button
                  color='green'
                  onClick={this.start}
                  style={{ direction: 'rtl' }}
                >
                  بپرتاب!
                </Button>
              }
              {this.props.state === 1 && !this.state.isBallHittedGround &&
                <>
                  <Button
                    color='blue'
                    onClick={this.stop}
                    style={{ direction: 'rtl' }}
                  >
                    وایسا!
                  </Button>
                </>
              }
              {(this.props.state === 2 || (this.props.state === 1 && this.state.isBallHittedGround)) &&
                <>
                  <Button
                    color='teal'
                    onClick={this.restart}
                    style={{ direction: 'rtl' }}
                  >
                    دوباره بریم؟
                  </Button>
                </>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.freeFall.state,
  passedTime: state.freeFall.passedTime,
});

export default connect(
  mapStateToProps,
  {
    updateState,
    updatePageNumber,
  }
)(FreeFall)