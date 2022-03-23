import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from './rootSaga';
import globalReducer from './reducers';

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middleware = [sagaMiddleware, routeMiddleware];

if (process.env.REACT_APP_NODE_ENV === 'development') middleware.push(logger);

export const store = createStore(
  globalReducer(history),
  compose(
    applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
      ? (a) => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);
