import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

export type UserState = {
    currentUser: any
}

export type AppState = {
    user: UserState
}

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;