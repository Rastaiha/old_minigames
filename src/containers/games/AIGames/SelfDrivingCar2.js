import React, { Component } from 'react';
import { Stage, } from 'react-konva';
import Car from '../../../components/SelfDrivingCar/car'
import Road from '../../../components/SelfDrivingCar/road'
import { connect } from 'react-redux';
import { Button, Input, Label, Container, Grid, Segment } from 'semantic-ui-react';
import {
  updateKValue_secondGame,
  updateRoad_secondGame,
  updateState_secondGame,
} from '../../../redux/actions/AI'

const width = window.innerWidth;
const height = window.innerHeight;
const initial_car_x = width / 2;
const initial_car_y = height * 0.8;
const initial_road_x = width / 2;
const initial_road_y = height * 0.8;
const initial_tetha = -90;
const margin_of_road = 300;
const roadLength = 200;
const speed = 5;

class SelfDrivingCar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: initial_car_x,
      y: initial_car_y,
      tetha: initial_tetha,
      road: this.props.road,
      isKValueValid: false,
      KValueErrorMessage: null,
    }
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
    this.resume = this.resume.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.updateRoad = this.updateRoad.bind(this);
    this.setInitialRoad = this.setInitialRoad.bind(this);
    this.getCarNewTetha = this.getCarNewTetha.bind(this);
  }

  componentDidMount() {
    this.restart();
  }

  setInitialRoad() {
    var initialRoad = [initial_road_x, initial_road_y + roadLength, initial_road_x, initial_road_y, initial_road_x, initial_road_y - roadLength];
    for (var i = 2; i < 1000; i++) {
      initialRoad.push(Math.floor(Math.random() * ((width - margin_of_road) - margin_of_road + 1)) + margin_of_road);
      initialRoad.push(initial_road_y - i * roadLength);
    }
    this.updateRoad(initialRoad);
    this.props.updateRoad_secondGame(initialRoad)
    this.setState({
      road: initialRoad,
    })
  }

  start() {
    this.props.updateState_secondGame(1);

    this.timer = setInterval(() => {
      var newRoad = [];
      this.state.road.forEach((y, i) => {
        if (i % 2 === 1) {
          y = y - speed * Math.sin(this.state.tetha / 180 * Math.PI);
        }
        newRoad.push(y);
      });

      newRoad = this.getUpdatedRoad(newRoad);
      let newTetha = this.getCarNewTetha(newRoad);
      this.setState({
        road: newRoad,
        x: this.state.x + speed * Math.cos(this.state.tetha / 180 * Math.PI),
        y: initial_car_y,
        tetha: newTetha,
      })
      this.updateRoad(newRoad);
      this.updateCar(this.state.x, initial_car_y, newTetha);

    }, 1000 / 30);
  }

  getUpdatedRoad(road) {
    if (road[1] >= initial_road_y + 2 * roadLength) {
      road.shift();
      road.shift();
      const newX = Math.floor(Math.random() * ((width - margin_of_road) - margin_of_road + 1)) + margin_of_road;
      const newY = road[road.length - 1] - roadLength;
      road.push(newX);
      road.push(newY);
    }
    return road;
  }

  getCarNewTetha(road) {
    const { KValue } = this.props;
    let road_x = road[2] + (road[3] - initial_road_y) * (road[4] - road[2]) / (road[3] - road[5]);
    let newTetha;
    newTetha = this.state.tetha - (this.state.x - road_x) * KValue;
    newTetha = Math.max(newTetha, -135)
    newTetha = Math.min(newTetha, -45)
    return newTetha;
  }

  updateCar(x, y, tetha) {
    this.car.updateSpring(x, y, tetha);
  }

  updateRoad(road) {
    this.road.updateRoad(road);
  }

  stop() {
    this.props.updateState_secondGame(2)
    clearInterval(this.timer);
  }

  resume() {
    this.props.updateState_secondGame(0)
    this.start();
  }

  restart() {
    this.props.updateState_secondGame(0)
    this.setState({
      isKValueValid: false,
      x: initial_car_x,
      y: initial_car_y,
      tetha: initial_tetha,
    });
    this.updateCar(initial_car_x, initial_car_y, initial_tetha);
    this.setInitialRoad();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.state !== this.props.state || this.props.state === 0) {
      return true;
    } else {
      return false;
    }
  }

  handleChange = (e, { value }) => {
    if (value > 1 || value < 0) {
      this.setState({
        isKValueValid: false,
        KValueErrorMessage: 'یک عدد بین ۰ و ۱ وارد کن'
      })
    } else if (value === '') {
      this.setState({
        isKValueValid: false,
        KValueErrorMessage: null,
      })
    }
    else {
      this.setState({
        isKValueValid: true,
        KValueErrorMessage: null,
      })
      this.props.updateKValue_secondGame(value)
    }
  }

  render() {
    return (
      <Container text>
        <Grid columns={1} verticalAlign='middle' centered>
          <Grid.Row style={{ paddingBottom: '0' }} >
            <Stage width={width} height={height * 0.8} scaleX={width / 680} scaleY={height / 380}>
              <Road ref={(road) => (this.road = road)} />
              <Car ref={(car) => (this.car = car)} />
            </Stage>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0' }}>
            <Grid.Column textAlign='center'>
              <Segment inverted color='green'>
                {this.props.state === 0 &&
                  <>
                    <Button
                      disabled={!this.state.isKValueValid}
                      onClick={this.start}
                      color='blue'
                    >
                      شروع
                    </Button>
                    <Input
                      id='input1'
                      size='mini'
                      type='number'
                      className='ltr-input'
                      label={
                        this.state.KValueErrorMessage &&
                        <Label color='red'>
                          یک عدد بین ۰ و ۱ وارد کن
                        </Label>
                      }
                      labelPosition='right'
                      placeholder="مقدار k رو وارد کن"
                      name='KValue'
                      onChange={this.handleChange}
                    />

                  </>
                }
                {this.props.state === 1 &&
                  <Button onClick={this.stop} color='blue'>
                    توقف
                  </Button>
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
  road: state.AI.road2,
  KValue: state.AI.KValue,
  state: state.AI.state2,
})

export default connect(
  mapStateToProps,
  {
    updateKValue_secondGame,
    updateRoad_secondGame,
    updateState_secondGame,
  }
)(SelfDrivingCar2)