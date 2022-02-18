import React, { Component } from 'react';
import { Container, Grid, Label, Button } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range';
import { connect } from 'react-redux';
import { correlation } from './Stat'
import {
  updateData,
  updatePower,
  updateState,
  updatePageNumber,
} from '../../../redux/actions/freeFall'
import Chart from './Plot'

const width = window.innerWidth;
const height = window.innerHeight;
const data_number = 10;


class PlotPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      correlation: 0,
    }
  }

  handleDataXChange = (event) => {
    const { name, value } = event.target;
    var newDataX = this.props.dataX;
    newDataX[name] = value;
    this.props.updateData(newDataX, this.props.dataY)
    this.setState({
      correlation:
        correlation(
          this.props.dataX.map(x =>
            (x ** this.props.power)
          ),
          this.props.dataY
        )
    })
  }

  handleDataYChange = (event) => {
    const { name, value } = event.target;
    var newDataY = this.props.dataY;
    newDataY[name] = value;
    this.props.updateData(this.props.dataX, newDataY)
    this.setState({
      correlation:
        correlation(
          this.props.dataX.map(x =>
            (x ** this.props.power)
          ),
          this.props.dataY
        )
    })
  }

  slider_settings = {
    start: this.props.power,
    min: 0.05,
    max: 3,
    step: 0.05,
    onChange: power => {
      this.props.updatePower(power)
      this.setState({
        correlation:
          correlation(
            this.props.dataX.map(x =>
              (x ** power)
            ),
            this.props.dataY
          )
      })
    }
  };

  render() {
    return (
      <Container textAlign='center'>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={4} textAlign='center'>
              <div style={{ width: '100%' }}>
                <br />
                <Label color='teal' size='tiny'>
                  {this.props.Xlabel}
                </Label>
                <Label color='teal' size='tiny'>
                  {this.props.Ylabel}
                </Label>
              </div>
              {Array.from(Array(data_number).keys()).map(index => {
                return (
                  <div>
                    <input
                      type='number'
                      placeholder={this.props.XlabelChar}
                      onChange={this.handleDataXChange}
                      name={index}
                      style={{
                        textAlign: 'center',
                        width: '40%',
                        margin: '1px -1px 1px 0px'
                      }}
                      value={this.props.dataX[index]}
                    />
                    <input
                      type='number'
                      placeholder={this.props.YlabelChar}
                      onChange={this.handleDataYChange}
                      name={index}
                      style={{
                        textAlign: 'center',
                        width: '40%',
                        margin: '1px 0px 1px 0px'
                      }}
                      value={this.props.dataY[index]}
                    />
                  </div>
                );
              })}
              <Label color='blue'>
                جدول داده‌ها
              </Label>
            </Grid.Column>

            <Grid.Column width={12} textAlign='center'>
              <Chart
                dataX={this.props.dataX.map(x =>
                  (x ** this.props.power)
                )}
                dataY={this.props.dataY}
              />
              <br />
              <Slider
                color='green'
                settings={this.slider_settings}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label color='green'>
                  {(this.props.power).toFixed(2)}
                  <Label.Detail style={{ direction: 'rtl' }}>پارامتر توان:</Label.Detail>
                </Label>
                <Label color='green'>
                  {isNaN(this.state.correlation) ? 'خطا' : ((this.state.correlation ** 4) * 100).toFixed(3)}
                  <Label.Detail style={{ direction: 'rtl' }}>امتیاز:</Label.Detail>
                </Label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container >
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataX: state.freeFall.dataX,
  dataY: state.freeFall.dataY,
  power: state.freeFall.power,
  Xlabel: ownProps.Xlabel,
  Ylabel: ownProps.Ylabel,
  XlabelChar: ownProps.XlabelChar,
  YlabelChar: ownProps.YlabelChar,
})

export default connect(
  mapStateToProps,
  {
    updateData,
    updatePower,
    updateState,
    updatePageNumber,
  }
)(PlotPage)


