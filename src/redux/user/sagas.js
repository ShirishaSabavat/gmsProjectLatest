import {
  call,
  put,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { createHashHistory } from 'history';
import { notification } from 'antd';

import { login, currentAccountLoad, logout } from 'services/authorization';
import actions from './actionTypes';

const history = createHashHistory();

function* LOGIN(userAction) {
  const { payload } = userAction;
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });

  const success = yield call(login, payload);

  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    });

    yield history.push('/home/dashboard');
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in!',
    });
  }

  if (!success) {
    notification.error({
      message: 'Authentication failed',
      description: 'Unable to login!',
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });

  const success = yield call(currentAccountLoad);

  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        authorized: true,
      },
    });
  }

  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: false,
    },
  });
}

function* LOGOUT() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });

  yield call(logout);

  yield put({
    type: actions.SET_STATE,
    payload: {
      authorized: false,
      loading: false,
    },
  });
}

function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(),
  ]);
}

export default rootSaga;
