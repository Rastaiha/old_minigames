import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api/api';
import socket from '../middleware/socket/socket';
import rootReducer from '../reducers';

const configureStore = (preloadedState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, api, socket));

export default configureStore;
