import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import visibilityFilter from 'redux/reducers/visibilityFilter';
import todos from 'redux/reducers/todo';

export default combineReducers({ routing, todos, visibilityFilter });
