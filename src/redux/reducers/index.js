import { combineReducers } from 'redux';
import visibilityFilter from 'redux/reducers/visibilityFilter';
import todos from 'redux/reducers/todo';

export default combineReducers({ todos, visibilityFilter });
