import _ from 'lodash';
import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import { Button, Grid, Icon, Table, Image } from 'semantic-ui-react';
import Machine from './Machine';
import * as situations from './situations';
import * as boxesModes from '../../redux/reducers/boxesModes';

class SimulatorView extends Component {
  constructor(props) {
    super(props);

    this.onBoxDragEnd = this.onBoxDragEnd.bind(this);
    this.onFinishButtonClick = this.onFinishButtonClick.bind(this);
    this.onNextRoundClick = this.onNextRoundClick.bind(this);

    this.state = {
      finished: false,
      check: null,
      height:
        (props.stageWidth / 20) *
          (this.props.boxes.length > 8 ? 9 : this.props.boxes.length) +
        30,
      width: props.stageWidth / 20 + 5,
      machines: [
        {
          x: props.stageWidth / 5,
          y: 5,
        },
        {
          x: props.stageWidth / 5 + this.props.stageWidth / 20 + 15,
          y: 5,
        },
        {
          x: props.stageWidth / 5 + (this.props.stageWidth * 2) / 20 + 30,
          y: 5,
        },
      ],
      mostLeftBox: null,
    };
  }

  onBoxDragEnd(id, e) {
    const box = _.find(this.props.boxes, { id: id });

    let machineIndex;

    let x = e.target._lastPos.x;
    let y = e.target._lastPos.y;

    let leastY = this.state.machines[0].y;

    if (leastY < y && y < leastY + this.state.height) {
      if (
        this.state.machines[0].x < x &&
        x < this.state.machines[0].x + this.state.width
      ) {
        machineIndex = 0;
      } else if (
        this.state.machines[1].x < x &&
        x < this.state.machines[1].x + this.state.width
      ) {
        machineIndex = 1;
      } else if (
        this.state.machines[2].x < x &&
        x < this.state.machines[2].x + this.state.width
      ) {
        machineIndex = 2;
      }
    }

    if (machineIndex !== undefined) {
      let boxSituation;
      switch (machineIndex) {
        case 0:
          boxSituation = situations.IN_MACHINE_1;
          break;
        case 1:
          boxSituation = situations.IN_MACHINE_2;
          break;
        case 2:
          boxSituation = situations.IN_MACHINE_3;
          break;
      }
      this.props.updateBox(box.id, {
        situation: boxSituation,
      });

      const nextBox = _.find(this.props.boxes, function (box) {
        return box.props.situation === situations.IN_SHELL;
      });

      if (nextBox) {
        this.setState({ mostLeftBox: nextBox.id });
      }
    } else {
      this.setState({ mostLeftBox: box.id });
      this.props.deleteBox(box.id);
      this.props.createBox(box.id, {
        x: box.props.x,
        y: box.props.y,
        label: box.props.label,
        situation: box.props.situation,
      });
    }
  }

  onFinishButtonClick() {
    var boxes = this.props.boxes.filter((box) => {
      return box.props.situation === situations.IN_MACHINE_1;
    });
    let sum1 = 0;
    boxes.forEach((box) => {
      sum1 += parseInt(box.props.label);
    });

    var boxes = this.props.boxes.filter((box) => {
      return box.props.situation === situations.IN_MACHINE_2;
    });
    let sum2 = 0;
    boxes.forEach((box) => {
      sum2 += parseInt(box.props.label);
    });

    var boxes = this.props.boxes.filter((box) => {
      return box.props.situation === situations.IN_MACHINE_3;
    });
    let sum3 = 0;
    boxes.forEach((box) => {
      sum3 += parseInt(box.props.label);
    });

    let max = Math.max(sum1, sum2, sum3);
    if (max === this.props.optimum) {
      this.props.changeMode(boxesModes.CORRECT_ANSWER);
      this.props.changeTotaltime(max);

      this.props.updateAnswer(boxesModes.CORRECT_ANSWER);
    } else {
      this.props.changeMode(boxesModes.WRONG_ANSWER);
      this.props.changeTotaltime(max);
      this.props.updateAnswer(boxesModes.WRONG_ANSWER);
    }
  }

  onNextRoundClick() {
    if (this.props.round !== 4) {
      this.props.nextRound();

      if (this.props.mode === boxesModes.CORRECT_ANSWER) {
        this.props.nextLevel(2);
      } else if (this.props.mode === boxesModes.WRONG_ANSWER) {
        if (this.props.round === 2) {
          this.props.nextLevel(2);
        }
      }

      this.props.changeBoxes();
    }
  }

  render() {
    let boxWidth = this.props.stageWidth / 20;
    const BoxContainer = this.props.boxContainer;
    let machineIndex = 0;
    let boxX = -1 * boxWidth + 3;
    let boxCounter = 0;
    console.log('round:', this.props.round);

    return (
      <>
        <Grid columns={3}>
          <Grid.Column width={this.props.stageWidth}>
            <Stage
              width={this.props.stageWidth}
              height={window.innerHeight}
              ref={(stage) => (this.stage = stage)}
            >
              <Layer ref={(layer) => (this.layer = layer)}>
                {this.state.machines.map((machine) => {
                  let machineSituation;
                  switch (machineIndex) {
                    case 0:
                      machineSituation = situations.IN_MACHINE_1;
                      break;
                    case 1:
                      machineSituation = situations.IN_MACHINE_2;
                      break;
                    case 2:
                      machineSituation = situations.IN_MACHINE_3;
                      break;
                  }
                  machineIndex++;
                  return (
                    <Machine
                      key={machine.id}
                      x={machine.x}
                      y={machine.y}
                      machineHeight={
                        boxWidth *
                          (this.props.boxes.length > 8
                            ? 9
                            : this.props.boxes.length) +
                        30
                      }
                      // machineHeight={this.state.height}
                      // machineWidth={this.state.width}
                      machineWidth={boxWidth + 5}
                      draggableBox={this.props.level === 1}
                      boxWidth={boxWidth}
                      boxes={this.props.boxes.filter((box) => {
                        return box.props.situation === machineSituation;
                      })}
                      onDragEnd={this.onBoxDragEnd}
                    />
                  );
                })}
                <BoxContainer
                  x={this.state.machines[0].x}
                  y={this.state.machines[0].y + this.state.height + 30}
                  machineWidth={boxWidth + 5}
                  machineHeight={boxWidth * this.props.boxes.length + 30}
                  stageWidth={this.props.stageWidth}
                  boxes={this.props.boxes}
                  boxCounter={boxCounter}
                  boxX={boxX}
                  box={this.props.box}
                  boxWidth={boxWidth}
                  onDragEnd={this.onBoxDragEnd}
                />
              </Layer>
            </Stage>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Button.Group
                style={{
                  display:
                    this.props.boxes.filter((box) => {
                      return box.props.situation === situations.IN_SHELL;
                    }).length === 0
                      ? ''
                      : 'none',
                }}
              >
                <Button
                  onClick={this.onFinishButtonClick}
                  attached="left"
                  textAlign="center"
                  // disabled={}
                >
                  Finish
                </Button>
                <Button
                  onClick={this.onNextRoundClick}
                  attached="right"
                  textAlign="center"
                  disabled={
                    this.props.boxes.filter((box) => {
                      return box.props.situation === situations.IN_SHELL;
                    }).length === 0 && this.props.mode !== boxesModes.PLAYING
                      ? false
                      : true
                  }
                >
                  Next Round
                </Button>
              </Button.Group>
            </Grid.Row>
            <Grid.Row
              style={{
                marginTop: '20px',
              }}
            >
              <Image
                src={
                  this.props.mode === boxesModes.CORRECT_ANSWER
                    ? process.env.PUBLIC_URL + '/greenCheck.png'
                    : process.env.PUBLIC_URL + '/redX.png'
                }
                size="mini"
                style={{
                  display:
                    this.props.boxes.filter((box) => {
                      return box.props.situation === situations.IN_SHELL;
                    }).length === 0 && this.props.mode !== boxesModes.PLAYING
                      ? ''
                      : 'none',
                }}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            {this.props.mode !== boxesModes.PLAYING &&
            this.props.level === 2 ? (
              <Table
                style={{
                  width: 150,
                }}
              >
                <Table.Body>
                  <Table.Row textAlign="center">
                    <Table.Cell>optimum</Table.Cell>
                    <Table.Cell>{this.props.optimum}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign="center">
                    <Table.Cell>total time</Table.Cell>
                    <Table.Cell>{this.props.totalTime}</Table.Cell>
                  </Table.Row>
                  <Table.Row textAlign="center">
                    <Table.Cell>total time/optimum</Table.Cell>
                    <Table.Cell>
                      {Math.round(
                        (this.props.optimum / this.props.totalTime) * 100
                      ) / 100}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            ) : (
              ''
            )}
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default SimulatorView;
