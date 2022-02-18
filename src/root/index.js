import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Game from '../containers/game';
import LandingPage from '../containers/LandingPage'
import '../styles/App.css';

const Root = () => (
  <>
    <Switch>
      <Route path="/games/:id/" component={Game} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </>
);
export default Root;
