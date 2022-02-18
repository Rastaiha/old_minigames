import React, { Component } from 'react';
import { Group, Layer, Stage, Label, Tag, Text } from 'react-konva';

import { Button, Container, Dropdown, Grid, Segment } from 'semantic-ui-react';
import * as gameModes from '../../redux/reducers/dummiesGameModes';
import Dummy from './Dummy';
import * as situations from './situations';
import './style.css';

class DummiesGameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finalAnswer: '',
      inputValue: '',
    };

    this.start = this.start.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onGuess = this.onGuess.bind(this);
    this.viewResault = this.viewResault.bind(this);
    this.resetDummies = this.resetDummies.bind(this);
  }

  onInputChange(e) {
    this.setState({ inputValue: e.target.innerText });
  }

  onGuess() {
    this.props.changeMode(gameModes.SEE_RESAULT);
  }

  start() {
    let randomNumber;
    //Right : Up  -  Left: Down
    let finalAnswer =
      Math.round(Math.random()) === 0 ? situations.LEFT : situations.RIGHT;
    this.setState({ finalAnswer: finalAnswer });

    let index = 0;
    this.props.dummies.forEach((dummy, myIndex) => {
      if (this.props.level === 1) {
        if (index === 0) {
          randomNumber = finalAnswer === situations.LEFT ? 0 : 1;
          index++;
        } else {
          randomNumber = Math.round(Math.random());
        }
      } else {
        if (myIndex === 0 && dummy.props.wrongNumber === 0) {
          randomNumber = finalAnswer === situations.LEFT ? 1 : 0;
        } else {
          if (myIndex === 0) {
            randomNumber = finalAnswer === situations.LEFT ? 0 : 1;
          } else {
            if (
              this.props.round === this.props.totalRounds &&
              dummy.props.wrongNumber === 0
            ) {
              randomNumber = finalAnswer === situations.LEFT ? 1 : 0;
            } else {
              randomNumber = Math.round(Math.random());
            }
          }
        }
      }

      this.props.updateDummy(dummy.id, {
        situation: randomNumber === 0 ? situations.LEFT : situations.RIGHT,
      });
    });
    this.props.changeMode(gameModes.GUESSING);
  }

  resetDummies(level) {
    this.props.dummies.forEach((dummy) => {
      let preNumber = dummy.props.wrongNumber;
      let wrongNumber =
        level === 2
          ? 0
          : dummy.props.situation === this.state.finalAnswer
          ? preNumber
          : preNumber + 1;
      this.props.updateDummy(dummy.id, {
        situation: situations.MIDDLE,
        wrongNumber: wrongNumber,
      });
    });
  }

  viewResault() {
    alert(this.state.finalAnswer === situations.RIGHT ? 'بالا' : 'پایین');

    let userSituation =
      this.state.inputValue === 'بالا' ? situations.RIGHT : situations.LEFT;

    if (userSituation !== this.state.finalAnswer) {
      this.props.wrongAnswered();
    }

    if (this.props.round === this.props.totalRounds) {
      if (this.props.level === 2) {
        this.resetDummies(2);
        this.props.resetGame();
      } else {
        this.props.nextLevel();
        this.resetDummies(2);
      }
    } else {
      this.props.nextRound();
      this.resetDummies(1);
    }

    this.props.changeMode(gameModes.START);
  }

  render() {
    const widthScale = window.innerWidth / 671;
    const heightScale = window.innerHeight / 381;
    const inputOptions = [
      { key: 1, text: 'بالا', value: 1 },
      { key: 2, text: 'پایین', value: 2 },
    ];
    let leftX = -30,
      leftY = 0,
      leftCounter = 0;
    let rightX = -30,
      rightY = 0,
      rightCounter = 0;

    const dummyWidth = window.innerWidth / 18;
    const dummyScale = window.innerWidth / 18 / 70;

    return (
      <>
        <Grid style={{ maxHeight: window.innerHeight, overflow: 'auto' }}>
          <Grid.Row>
            <Stage
              width={window.innerWidth}
              height={(2 * window.innerHeight) / 3}
              style={{
                y: 5,
                x: 60,
                alignContent: 'center',
                verticalAlign: 'middle',
              }}
            >
              <Layer>
                {this.props.mode !== gameModes.START ? (
                  <Group x={window.innerWidth / 2 - 5} y={50 * heightScale}>
                    <Label
                      x={0}
                      y={0}
                      opacity={0.75}
                      width={100 * widthScale}
                      offsetX={60 * widthScale}
                    >
                      <Tag
                        fill="#408be6"
                        pointerDirection="left"
                        pointerWidth={10}
                        pointerHeight={22}
                        lineJoin="round"
                      />
                      <Text
                        x={0}
                        y={0}
                        text="پایین"
                        padding={widthScale > 0.8 ? 4 : 2}
                        fontSize={widthScale > 0.8 ? 15 : 10}
                        fontStyle="bold"
                        width={40 * widthScale}
                        align="center"
                      />
                    </Label>
                    <Label x={0} y={30} opacity={0.75} width={100 * widthScale}>
                      <Tag
                        fill="#408be6"
                        pointerDirection="right"
                        pointerWidth={10}
                        pointerHeight={22}
                        lineJoin="round"
                      />
                      <Text
                        x={0}
                        y={0}
                        text="بالا"
                        padding={widthScale > 0.8 ? 4 : 2}
                        fontSize={widthScale > 0.8 ? 15 : 10}
                        fontStyle="bold"
                        width={40 * widthScale}
                        align="center"
                      />
                    </Label>
                  </Group>
                ) : (
                  <></>
                )}

                <Group
                  x={(2 * window.innerWidth) / 18}
                  y={20}
                  ref={(leftGroup) => (this.leftGroup = leftGroup)}
                >
                  {this.props.dummies
                    .filter((dummy) => {
                      return dummy.props.situation === situations.LEFT;
                    })
                    .map((dummy) => {
                      leftX += 30;
                      if (leftCounter === 4) {
                        leftX = 0;
                        leftY += (65 * dummyWidth) / 35;
                        leftCounter = 0;
                      }
                      leftCounter++;

                      return (
                        <Group key={dummy.id} x={leftX} y={leftY} offsetX={10}>
                          <Dummy {...dummy.props} scale={dummyScale} />
                        </Group>
                      );
                    })}
                </Group>

                {this.props.mode === gameModes.START ? (
                  <Group
                    x={window.innerWidth / 2}
                    y={window.innerHeight / 3 - 50}
                    ref={(middleGroup) => (this.middleGroup = middleGroup)}
                  >
                    <Group x={0} y={0} offsetX={10}>
                      <Dummy wrongNumber="?" scale={dummyScale} />
                    </Group>
                  </Group>
                ) : (
                  <></>
                )}

                <Group
                  x={(12 * window.innerWidth) / 18}
                  y={20}
                  ref={(rightGroup) => (this.rightGroup = rightGroup)}
                >
                  {this.props.dummies
                    .filter((dummy) => {
                      return dummy.props.situation === situations.RIGHT;
                    })
                    .map((dummy) => {
                      rightX += 30;
                      if (rightCounter === 4) {
                        rightX = 0;
                        rightY += (65 * dummyWidth) / 35;
                        rightCounter = 0;
                      }
                      rightCounter++;
                      return (
                        <Group
                          key={dummy.id}
                          x={rightX}
                          y={rightY}
                          offsetX={10}
                        >
                          <Dummy {...dummy.props} scale={dummyScale} />
                        </Group>
                      );
                    })}
                </Group>
              </Layer>
            </Stage>
          </Grid.Row>
          <Grid.Row
            id="secondRow"
            style={{ overflow: 'auto', maxHeight: '100px' }}
          >
            <Segment color="blue">
              دور {this.props.round} از {this.props.totalRounds}
            </Segment>

            <Container> حدس اشتباه : {this.props.userWrongNumber}</Container>

            <Button
              content="شروع"
              onClick={this.start}
              disabled={this.props.mode !== gameModes.START}
            />

            {this.props.mode === gameModes.GUESSING ? (
              <Dropdown
                placeholder="انتخاب کنید"
                // width="60px"
                search
                selection
                options={inputOptions}
                onChange={this.onInputChange}
                style={{
                  width: '60px',
                  marginRight: '5px',
                  marginLeft: '5px',
                }}
              />
            ) : (
              ''
            )}

            {this.props.mode === gameModes.GUESSING ? (
              <Button content="ثبت نظر" onClick={this.onGuess} />
            ) : (
              ''
            )}

            {this.props.mode === gameModes.SEE_RESAULT ? (
              <Button
                content="دیدن نتیجه واقعی"
                onClick={this.viewResault}
                style={{
                  marginLeft: '5px',
                }}
              />
            ) : (
              ''
            )}
          </Grid.Row>
        </Grid>
      </>
    );
  }
}

export default DummiesGameView;
