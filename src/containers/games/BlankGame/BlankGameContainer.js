import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Button, Grid, Segment } from 'semantic-ui-react';
import AnswerBox from '../../../components/BlankGame/AnswerBox';
import CodeLine from '../../../components/BlankGame/CodeLine';
import * as blankSituations from '../../../components/BlankGame/blanksSituation';

class BlankGame extends Component {
  constructor(props) {
    super(props);

    this.checkAnswers = this.checkAnswers.bind(this);
  }
  state = {
    round: 1,
  };

  checkAnswers() {
    let check = true;
    this.props.answers.forEach((answer, index) => {
      if (this.props.blanks[index] !== answer) {
        check = false;
      }
    });
    return check;
  }

  showCorrectAnswers() {
    this.props.answers.forEach((answer, index) => {
      if (
        this.props.gameIndex === 2 &&
        index === 5 &&
        this.props.blanks[index] === '{1,2,3,4,5,6,7,8,9}'
      ) {
        this.props.updateBlankSituation(
          blankSituations.CORRECT,
          index,
          this.props.gameIndex
        );
      } else {
        if (this.props.blanks[index] !== answer) {
          this.props.updateBlankSituation(
            blankSituations.WRONG,
            index,
            this.props.gameIndex
          );
        } else {
          this.props.updateBlankSituation(
            blankSituations.CORRECT,
            index,
            this.props.gameIndex
          );
        }
      }
    });
  }

  onButtonClick() {
    if (this.state.round < 3) {
      let check = this.checkAnswers();
      if (this.state.round === 1 && !check) {
        alert('فقط یه فرصت دیگه داری');
      } else {
        this.showCorrectAnswers();
      }

      this.setState({ round: this.state.round + 1 });
    }
  }

  onDrop(newText, blankIndex) {
    this.props.updateBlank(newText, blankIndex, this.props.gameIndex);
  }

  isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = 'ontouchstart' in document.createElement('div');

    if (msTouchEnabled || generalTouchEnabled) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <DndProvider
        backend={this.isTouchSupported() ? TouchBackend : HTML5Backend}
      >
        <Grid
          id="grid"
          style={{
            overflow: 'auto',
            maxWidth: window.innerWidth + 'px',
            maxHeight: window.innerHeight + 'px',
          }}
        >
          <Grid.Row>
            <Grid.Column width="50%">
              <Segment>
                <Grid>
                  {this.props.code.map((line, lineIndex) => {
                    return (
                      <Grid.Row
                        width={window.innerWidth}
                        style={{
                          padding: '2px',
                        }}
                      >
                        <CodeLine
                          blanks={this.props.blanks}
                          lineData={line}
                          lineIndex={lineIndex}
                          onDrop={this.onDrop.bind(this)}
                          help={this.props.helps[lineIndex].help}
                          situations={this.props.situations}
                          answers={this.props.answers}
                        />
                      </Grid.Row>
                    );
                  })}
                </Grid>
              </Segment>
              <Button
                style={{
                  margin: '3px',
                }}
                color="blue"
                onClick={this.onButtonClick.bind(this)}
              >
                Check Answers
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="50%">
              <Segment>
                {this.props.answerOptions.map((option) => {
                  return <AnswerBox text={option} />;
                })}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DndProvider>
    );
  }
}

export default BlankGame;
