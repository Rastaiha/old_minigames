import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './root';
import configureStore from './redux/store/configureStore';
import Messages from './Messages';

const persistedState = localStorage.getItem('rastaReactState')
  ? JSON.parse(localStorage.getItem('rastaReactState'))
  : {};
const store = configureStore(persistedState);
store.subscribe(() => {
  localStorage.setItem(
    'rastaReactState',
    JSON.stringify({
      account: { ...store.getState().account },
      fsm: { ...store.getState().fsm },
    })
  );
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Messages />
      <Root />
    </Provider>
  </Router>,
  document.getElementById('root')
);
