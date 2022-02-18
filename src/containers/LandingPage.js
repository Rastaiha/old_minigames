import '../styles/landing.css';
import React, { Component } from 'react';
import gameTypes from './games/gameTypes';

class LandingPage extends Component {
  render() {
    const games = [];
    for (const item in gameTypes) {
      games.push({
        name: gameTypes[item].name,
        url: gameTypes[item].url,
      })
    }
    return (
      <ol>
        {games.map(game => (
          <li>
            <a href={game.url}>
              {game.name}
            </a>
          </li>
        ))}
      </ol>
    );
  }
}

export default LandingPage
