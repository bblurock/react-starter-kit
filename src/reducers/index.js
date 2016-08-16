import { combineReducers } from 'redux';
import runtime from './runtime';
import hacker from './hacker';

export default combineReducers({
  runtime,
  hacker,
});
