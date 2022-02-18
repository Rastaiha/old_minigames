/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import sinaVideo from './styles/videos/sina.mp4';
import { Segment, Table, Header, TextArea, Embed } from 'semantic-ui-react';
import gameTypes from './containers/games/gameTypes';

class Machine {
  constructor(config) {
    this.states = config.states;
    this.currentState = this.states[config.initialState];
    this.onStateChange = this.onStateChange.bind(this);
    this.transition = this.transition.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.stateChangeListeners = [];
    this.stateUpdateListeners = [];
  }
  onStateChange = (cb) => {
    this.stateChangeListeners.push(cb);
  };
  onStateUpdate = (cb) => {
    this.stateUpdateListeners.push(cb);
  };
  updateState = () => {
    for (let cb in this.stateUpdateListeners) {
      this.stateUpdateListeners[cb](this.currentState);
    }
  };
  changeState = () => {
    for (let cb in this.stateChangeListeners) {
      this.stateChangeListeners[cb](this.currentState);
    }
  };
  transition = (transition) => {
    this.currentState = this.states[
      this.currentState.transitions[transition].target
    ];
  };
  handelSubmit = (e) => {
    for (let qid in this.currentState.answer) {
      if (
        +document.querySelector('#' + qid).value !==
        +this.currentState.answer[qid]
      ) {
        this.currentState.errors = [
          {
            title: 'پاسخ نادرست',
            message: 'بازم تلاش کنید! حتماً می‌تونید.',
          },
        ];
        this.updateState();
        return false;
      }
    }
    for (let qid in this.currentState.answer) {
      document.querySelector('#' + qid).value = '';
    }
    this.transition('onSuccess');

    this.changeState();
    return true;
  };
}

const gameTheory = new Machine({
  initialState: 'state1',
  title: 'کارگاه بازی',
  states: {
    state1: {
      type: 'Question',
      name: 'بیشترین حداقل',
      transitions: {
        onSuccess: {
          target: 'state2',
        },
      },
      config: {
        mentor: {
          HAVE_MENTOR: true,
          enableAfter: 60,
        },
      },
      content: (
        <div>
          <video controls src={sinaVideo} />
          <Embed
            autoplay={true}
            url={gameTypes.X_QUESTIONS.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.AUCTION_GAME1.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.AUCTION_GAME2.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.AUCTION_GAME3.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.AUCTION_GAME4.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FREE_FALL.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SPACE_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.X_QUESTIONS.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.MAP_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            url={gameTypes.FIRST_DRIVIING_CAR.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SECOND_DRIVIING_CAR.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.MESSAGE_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.BLOCKCHAIN.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url="https://azu.github.io/slide-pdf.js/?slide=test/fixtures/sourcemap.pdf"
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.BLOCK.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.HASH.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.DORM_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.DUMMIES_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'algorithm.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.VERTICAL_LINES.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FREE_FALL.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'algorithm.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FIRST_BOX_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'algorithm.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SECOND_DRIVIING_CAR.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FIRST_DRIVIING_CAR.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.GRID.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.RENT_ROOM.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SECOND_CODING_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FIRST_CODING_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SECOND_PIPELINE_GRAPH.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'algorithm.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.PIPELINE_GRAPH.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'algorithm.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.GEOGEBRA.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'topology.jpg'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.THIRD_TRAFFIC_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.SECOND_TRAFFIC_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          <Embed
            autoplay={true}
            url={gameTypes.FIRST_TRAFFIC_GAME.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          />
          {/* <Embed
            autoplay={true}
            url={gameTypes.STREET_GRAPH.url}
            icon="game"
            placeholder={process.env.PUBLIC_URL + 'gameTheory.png'}
          /> */}
          <Segment>
            در جدول زیر دو نفر با هم بازی میکنند. نفر اول یک سطر رو انتخاب میکنه
            و نفر دوم یک ستون و نفر اول به اندازه تقاطع اون سطر و ستون به نفر
            دوم پول میده.
          </Segment>
          <Table unstackable celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>۲</Table.Cell>
                <Table.Cell>۱۰</Table.Cell>
                <Table.Cell>۲</Table.Cell>
                <Table.Cell>۲۲</Table.Cell>
                <Table.Cell>۱</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۳</Table.Cell>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۸</Table.Cell>
                <Table.Cell>۵</Table.Cell>
                <Table.Cell>۷</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۹</Table.Cell>
                <Table.Cell>۱۱</Table.Cell>
                <Table.Cell>۶</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۷</Table.Cell>
                <Table.Cell>۱۱</Table.Cell>
                <Table.Cell>۷</Table.Cell>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۳</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۸</Table.Cell>
                <Table.Cell>۹</Table.Cell>
                <Table.Cell>۶</Table.Cell>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۲</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ),
      submitForm: (
        <div>
          <Header
            as="h4"
            content="با توجه به فیلم و اطلاعات داده شده، به سوالات زیر پاسخ دهید."
          />
          <div>
            <div>
              ۱) اگر شما نفر اول باشید و نفر دوم رو نشناسید مطمئن ترین انتخابتون
              چیه؟
            </div>
            <input
              id="q1"
              min="1"
              max="5"
              type="number"
              placeholder="شماره سطر"
              required
            />
            <div>چرا؟</div>
            <TextArea placeholder="دلیلتون رو توضیح بدید."></TextArea>
          </div>
          <div>
            <div>۲) اگر شما نفر دوم باشید چی؟ کدوم ستون بهتره؟</div>
            <input
              id="q2"
              min="1"
              max="5"
              type="number"
              placeholder="شماره ستون"
              required
            />
          </div>
        </div>
      ),
      errors: [],
      answer: {
        q1: 2,
        q2: 3,
      },
    },
    state2: {
      type: 'Question',
      name: 'تعادل اینجاست',
      transitions: {
        onSuccess: {
          target: 'state1',
        },
      },
      config: {
        mentor: {
          HAVE_MENTOR: false,
        },
      },
      content: (
        <div>
          <Segment>
            در جدول زیر دو نفر با هم بازی میکنند. نفر اول یک سطر رو انتخاب میکنه
            و نفر دوم یک ستون و نفر اول به اندازه تقاطع اون سطر و ستون به نفر
            دوم پول میده.
          </Segment>
          <Table unstackable celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۳</Table.Cell>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۲۰</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۴</Table.Cell>
                <Table.Cell>۸</Table.Cell>
                <Table.Cell>۳</Table.Cell>
                <Table.Cell>۲</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۹</Table.Cell>
                <Table.Cell>۶</Table.Cell>
                <Table.Cell>۷</Table.Cell>
                <Table.Cell>۸</Table.Cell>
                <Table.Cell>۱۰</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۲</Table.Cell>
                <Table.Cell>۲</Table.Cell>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۶</Table.Cell>
                <Table.Cell>۵</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>۵</Table.Cell>
                <Table.Cell>۱</Table.Cell>
                <Table.Cell>۹</Table.Cell>
                <Table.Cell>۷</Table.Cell>
                <Table.Cell>۳</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ),
      submitForm: (
        <div>
          <Header as="h4" content="بازی مثل قبلیه. بهترین انتخاب هر کسی چیه؟" />
          <div>
            <div>
              ۱) اگر شما نفر اول باشید و نفر دوم رو نشناسید مطمئن ترین انتخابتون
              چیه؟
            </div>
            <input
              id="q3"
              min="1"
              max="5"
              type="number"
              placeholder="شماره سطر"
              required
            />
          </div>
          <div>
            <div>۲) اگر شما نفر دوم باشید چی؟ کدوم ستون بهتره؟</div>
            <input
              id="q4"
              min="1"
              max="5"
              type="number"
              placeholder="شماره ستون"
              required
            />
          </div>
        </div>
      ),
      errors: [],
      answer: {
        q3: 1,
        q4: 5,
      },
    },
  },
});

export default gameTheory;
