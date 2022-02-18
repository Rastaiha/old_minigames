import { combineReducers } from 'redux';

import whiteboard from './whiteboard';
import graph from './graph';
import pipelineGraph from './pipelineGraph';
import secondPipelineGraph from './secondPipelineGraph';
import codingGame from './codingGame';
import grid from './grid';
import boxesSimulation from './boxesSimulation';
import dummiesGame from './dummiesGame';
import verticalLines from './verticalLines';
import dormGraph from './dormGraph';
import freeFall from './freeFall';
import account from './account';
import blockChain from './blockChain';
import messages from './messages';
import fsm from './fsm';
import socket from './socket';
import notifs from './notifs';
import teams from './teams';
import AI from './AI';
import protractor from './protractor';
import firstTrafficGraph from './firstStreeGraph';
import secondTrafficGraph from './secondStreetGraph';
import thirdTrafficGraph from './thirdStreetGraph';
import x_questions from './x-questions'
import auction from './auction'

const allReducers = combineReducers({
  whiteboard,
  account,
  messages,
  fsm,
  socket,
  graph,
  teams,
  pipelineGraph,
  codingGame,
  grid,
  boxesSimulation,
  dummiesGame,
  verticalLines,
  dormGraph,
  freeFall,
  blockChain,
  notifs,
  AI,
  secondPipelineGraph,
  protractor,
  firstTrafficGraph,
  secondTrafficGraph,
  thirdTrafficGraph,
  x_questions,
  auction,
});

export default allReducers;
