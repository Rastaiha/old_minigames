import React, { Component } from 'react';

import NavBar from '../components/NavBar/NavBar';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';

import '../styles/landing.css';
import FAQ from '../components/FAQ/FAQ';
import { Link } from 'react-router-dom';
import TeamMember from '../components/Cards/TeamMember';
import Footer from '../components/footer/Footer';
import WorkshopCard from '../components/Cards/WorkshopCard';
import _ from 'lodash';
import getLandinData from '../utils/getLandingData';
import Timeline from '../components/Timeline/Timeline';
import { checkPayment, getUserInfo } from '../redux/actions/account';
import { connect } from 'react-redux';

import gameTypes from './games/gameTypes';

class LandingPage extends Component {
  state = {};
  componentDidMount() {
    document.title = 'رستایی‌ها';
    getLandinData().then((response) => {
      this.setState({ ...response });
    });
    this.props.getUserInfo();
  }
  render() {
    const games = [];
    for (const item in gameTypes) {
      console.log(gameTypes[item])
      games.push({
        name: gameTypes[item].name,
        url: gameTypes[item].url,
      })
    }
    return (
      <>
        <ol>
          {games.map(game => (
            <li>
              <a href={game.url}>
                {game.name}
              </a>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { checkPayment, getUserInfo })(
  LandingPage
);
