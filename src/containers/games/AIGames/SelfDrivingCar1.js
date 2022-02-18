import React, { Component } from 'react';
import { Stage, } from 'react-konva';
import Car from '../../../components/SelfDrivingCar/car'
import Road from '../../../components/SelfDrivingCar/road'
import { Button, Container, Grid, Segment } from 'semantic-ui-react';
import {
  updateRoad_firstGame,
  updateState_firstGame,
} from '../../../redux/actions/AI'
import { connect } from 'react-redux';

const width = window.innerWidth;
const height = window.innerHeight;
const initial_car_x = width / 2;
const initial_car_y = height * 0.8;
const initial_road_x = width / 2;
const initial_road_y = height;
const initial_tetha = -90;
const margin_of_road = 300;
const roadLength = 200;
const speed = 5;
const deltaTetha = 1;

class SelfDrivingCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: initial_car_x,
      y: initial_car_y,
      tetha: initial_tetha,
      road: [],
      state: 0,
      firstRotate: true,
    }
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
    this.resume = this.resume.bind(this);
    this.setInitialRoad = this.setInitialRoad.bind(this);
    this.updateCarRotation = this.updateCarRotation.bind(this);
  }

  componentDidMount() {
    this.restart();
  }

  setInitialRoad() {
    var initialRoad = [initial_road_x, initial_road_y, initial_road_x, initial_road_y - roadLength];
    for (var i = 2; i < 1000; i++) {
      initialRoad.push(Math.floor(Math.random() * ((width - margin_of_road) - margin_of_road + 1)) + margin_of_road);
      initialRoad.push(initial_road_y - i * roadLength);
    }
    this.updateRoad(initialRoad);
    this.props.updateRoad_firstGame(initialRoad)
    this.setState({
      road: initialRoad
    })
  }

  start() {
    this.props.updateState_firstGame(1);

    this.timer = setInterval(() => {
      var newRoad = [];
      this.state.road.forEach((y, i) => {
        if (i % 2 === 1) {
          y = y - speed * Math.sin(this.state.tetha / 180 * Math.PI);
        }
        newRoad.push(y);
      });

      this.updateCarRotation(newRoad);
      this.updateCar(this.state.x, this.state.y, this.state.tetha);
      this.updateRoad(newRoad);
      newRoad = this.deleteLastRoad(newRoad);

      this.setState({
        x: this.state.x + speed * Math.cos(this.state.tetha / 180 * Math.PI),
        road: newRoad,
      });
    }, 1000 / 30);
  }

  deleteLastRoad(newRoad) {
    if (newRoad[1] > initial_car_y + roadLength) {
      newRoad.shift();
      newRoad.shift();
      const newX = Math.floor(Math.random() * ((width - margin_of_road) - margin_of_road + 1)) + margin_of_road;
      const newY = newRoad[newRoad.length - 1] - roadLength;
      newRoad.push(newX);
      newRoad.push(newY);
    }
    return newRoad;
  }

  updateCarRotation(newRoad) {
    var deltaX = newRoad[2] - this.state.x;
    var flag = 0;
    if (deltaX > 0) flag = 1
    else if (deltaX < 0) flag = -1

    var rotateValue = deltaTetha;
    if (!this.state.firstRotate) {
      rotateValue /= 2;
      this.setState({ firstRotate: true })
    }

    if (this.state.tetha + flag * rotateValue > -180 &&
      this.state.tetha + flag * rotateValue < 0) {
      this.setState({
        tetha: this.state.tetha + flag * rotateValue,
      });
    }
  }


  updateCar(x, y, tetha) {
    this.car.updateSpring(x, y, tetha);
  }

  updateRoad(newRoad) {
    this.road.updateRoad(newRoad);
  }

  stop() {
    this.props.updateState_firstGame(2)
    clearInterval(this.timer);
  }

  resume() {
    this.props.updateState_firstGame(0)
    this.start();
  }

  restart() {
    this.props.updateState_firstGame(0)
    this.setState({
      x: initial_car_x,
      y: initial_car_y,
      tetha: initial_tetha,
      firstRotate: false,
    });
    this.updateCar(initial_car_x, initial_car_y, initial_tetha);
    this.setInitialRoad();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.state !== this.state.state || this.state.state === 0) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row style={{ paddingBottom: '0' }}>
            <Stage width={width} height={height * 0.8} scaleX={width / 680} scaleY={height / 380}>
              <Road ref={(road) => (this.road = road)} />
              <Car ref={(car) => (this.car = car)} />
            </Stage>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0' }}>
            <Grid.Column textAlign='center'>
              <Segment inverted color='green'>
                {this.props.state === 0 &&
                  <Button
                    style={{ direction: 'rtl' }}
                    onClick={this.start}
                    color='blue'
                  >
                    شروع!
                  </Button>
                }
                {this.props.state === 1 &&
                  <Button onClick={this.stop} color='blue'>
                    توقف
                q</Button>
                }
                {this.props.state === 2 &&
                  <div>
                    <Button onClick={this.resume} color='blue'>
                      ادامه
                    </Button>
                    <Button onClick={this.restart} color='red'>
                      از اول
                    </Button>
                  </div>
                }
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    );
  }
}


const mapStateToProps = (state) => ({
  road: state.AI.road1,
  state: state.AI.state1,
})

export default connect(
  mapStateToProps,
  {
    updateRoad_firstGame,
    updateState_firstGame,
  }
)(SelfDrivingCar)