import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootreducer';
import { logger } from './middleware/logger';
import { ajax } from './middleware/ajax';


const middleware = [thunk, logger, ajax];

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
