import React, { Component } from 'react';
import { Button, Container, Grid, Input, Label, Segment } from 'semantic-ui-react';
import './style.css';
import { connect } from 'react-redux'
import {
  updateSets,
  updateStateOfSets,
  updateGuessedNumber,
  updateInterviewerAnswer,
  updateQuestionStatus,
} from '../../../redux/actions/x-question'

const _nds = ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم'];
const Q_number = 8;

class XSoali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      XNumber: Array.from(Array(Q_number).keys(), x => 0),
    }
    this.askQuestion = this.askQuestion.bind(this);
    this.validateGuess = this.validateGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  validateGuess() {
    const { XNumber } = this.state;
    const { guessedNumber, interviewerNumber } = this.props;
    if (XNumber[guessedNumber - 1] == XNumber[interviewerNumber - 1]) {
      var flag = false;
      let iInit = Math.floor(Math.random() * 8);
      for (var i = iInit; i < iInit + Q_number; i++) {
        if ((i % Q_number) != guessedNumber - 1 && XNumber[(i % Q_number)] == XNumber[guessedNumber - 1]) {
          flag = true;
          this.props.updateInterviewerAnswer(i % Q_number + 1, 'ای بابا! طوری نیست!')
        }
      }
      if (!flag) {
        this.props.updateInterviewerAnswer(interviewerNumber, 'ایول بابا!')
      }
    } else {
      this.props.updateInterviewerAnswer(interviewerNumber, 'ای بابا! طوری نیست!')
    }
  }


  askQuestion() {
    const { XNumber } = this.state;
    const { sets } = this.props;
    this.props.updateQuestionStatus(true);

    for (let i = 0; i < Q_number; i++) {
      var set_i = sets[i].split(/[,\-_. \\\/+]+/).map(string => parseInt(string));
      for (let j = 0; j < Q_number; j++) {
        if (set_i.includes(j + 1)) {
          this.state.XNumber[j] += (2 * 3 ** (i + 1));
        } else if (sets[i] !== '') {
          this.state.XNumber[j] += (3 ** (i + 1));
        }
      }
    }

    let interviewerNumber, flag = false;
    let iInit = Math.floor(Math.random() * 8)

    for (let i = iInit; i < iInit + Q_number; i++) {
      for (let j = 0; j < Q_number; j++) {
        if (j == (i % Q_number)) continue;
        if (XNumber[i % Q_number] === XNumber[j]) {
          interviewerNumber = i % Q_number + 1;
          this.props.updateInterviewerAnswer(interviewerNumber, '')
          flag = true;
          break;
        }
      }
      if (flag) break;
    }

    if (!flag) {
      let randomNumber = Math.floor(Math.random() * 8) + 1;
      interviewerNumber = randomNumber;
      this.props.updateInterviewerAnswer(randomNumber, '');
      flag = true;
    }

    for (let i = 0; i < Q_number; i++) {
      var set_i = sets[i].split(/[,\-_. \\\/+]+/).map(string => parseInt(string));
      if (set_i.includes(interviewerNumber)) {
        this.props.updateStateOfSets(1, i);
      } else if (sets[i] !== '') {
        this.props.updateStateOfSets(2, i);
      }
    }
  }

  restart() {
    this.props.updateGuessedNumber('');
    this.props.updateInterviewerAnswer('', '');
    this.props.updateQuestionStatus(false);
    for (let i = 0; i < Q_number; i++) {
      this.props.updateSets('', i);
      this.props.updateStateOfSets(0, i);
    }
    this.setState({
      XNumber: Array.from(Array(Q_number).keys(), x => 0),
    })
  }


  handleSetsChange = (event) => {
    const { value, name } = event.target;
    this.props.updateSets(value, name)
  }

  handleGuessedNumberChange = (e, { value }) => {
    this.props.updateGuessedNumber(value)
  }


  render() {
    return (
      <Container id='base'>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column computer={6} tablet={6} mobile={16}>
              <Segment>
                {Array.from(Array(Q_number).keys()).map(index => {
                  return (
                    <>
                      <Input
                        disabled={this.props.isQuestionAsked}
                        placeholder={'مجموعه‌ی ' + _nds[index]}
                        name={index}
                        onChange={this.handleSetsChange}
                        value={this.props.sets[index]}
                      >
                        <input
                          style={{
                            direction: 'rtl',
                            textAlign: 'center'
                          }}
                        />
                      </Input>
                      <Label
                        color={(this.props.stateOfSets[index] === 0) ? 'grey' : (this.props.stateOfSets[index] === 1) ? 'green' : 'red'}
                        textAlign="center"
                        size="large"
                      >
                        {(this.props.stateOfSets[index] === 0) ? '  ؟  ' : (this.props.stateOfSets[index] === 1) ? 'ایول!' : 'نه :('}
                      </Label>
                    </>
                  );
                })}
              </Segment>
            </Grid.Column>

            <Grid.Column computer={6} tablet={6} mobile={16}>
              <Segment>
                {!this.props.isQuestionAsked &&
                  <>
                    <Container>
                      می‌تونی حداکثر ۸ تا مجموعه انتخاب کنی تا از آقای مجری بپرسی...
                    </Container>
                    <br />
                    <Button
                      color='green'
                      onClick={this.askQuestion}
                    >
                      از مجری بپرس
                    </Button>
                    <br />
                    <Button
                      color='green'
                      onClick={this.restart}
                    >
                      از اول
                    </Button>
                  </>
                }
                {this.props.isQuestionAsked && !this.props.interviewerMessage &&
                  <>
                    <Input
                      placeholder="خب حالا عددت رو بگو"
                      name='guessedNumber'
                      onChange={this.handleGuessedNumberChange}
                    >
                      <input
                        style={{
                          direction: 'rtl',
                          textAlign: 'center'
                        }}
                      />
                    </Input>
                    <br />
                    <Button
                      color='green'
                      disabled={this.props.guessedNumber === '' ? true : false}
                      onClick={this.validateGuess}
                    >
                      تایید
                    </Button>
                  </>
                }
                {this.props.interviewerMessage &&
                  <>
                    <Container>
                      {this.props.interviewerMessage}
                      <br />
                      {'جواب ' + this.props.interviewerNumber + ' هست.'}
                    </Container>
                    <br />
                    <Button
                      color='green'
                      onClick={this.restart}
                    >
                      دوباره بریم؟
                    </Button>
                  </>
                }
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  sets: state.x_questions.sets,
  stateOfSets: state.x_questions.stateOfSets,
  guessedNumber: state.x_questions.guessedNumber,
  interviewerNumber: state.x_questions.interviewerNumber,
  interviewerMessage: state.x_questions.interviewerMessage,
  isQuestionAsked: state.x_questions.isQuestionAsked,
})


export default connect(
  mapStateToProps,
  {
    updateSets,
    updateStateOfSets,
    updateGuessedNumber,
    updateInterviewerAnswer,
    updateQuestionStatus,
  }
)(XSoali)