import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(promise));

export default store;