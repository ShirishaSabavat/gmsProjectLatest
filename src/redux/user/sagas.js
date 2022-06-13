/* eslint-disable no-unused-vars */
import {
  call,
  put,
  all,
  takeEvery,
} from 'redux-saga/effects';
import { createHashHistory } from 'history';
import { notification } from 'antd';

import { currentAccountLoad, logout } from 'services/authorization';
import { loginApi } from 'services/axios';
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

  const success = yield call(loginApi, payload);
  if (success.status === 200) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        authorized: true,
      },
    });
    // yield put({
    //   type: 'user/LOAD_CURRENT_ACCOUNT',
    // });
    const temprole = localStorage.getItem('role');
    if (temprole === 'Super Admin') {
      yield history.push('/home/dashboard');
    } else if (temprole === 'Gate Keeper') {
      yield history.push('/gatekeeper/carformpage');
    } else if (temprole === 'Road Test Auditor') {
      yield history.push('/rta/carlistrta');
    } else if (temprole === 'undefined') {
      yield history.push('/home/dashboard');
    } else if (temprole === '60:40 Queue Operator') {
      yield history.push('/sixtyfortyjama/jamacarlist');
    } else if (temprole === 'Leasing Queue Operator') {
      yield history.push('/LeasingAudit/leasingJamaCarlist');
    } else if (temprole === 'Regular Auditor') {
      yield history.push('/RegularAudit/RegularAuditCarlist');
    } else if (temprole === 'Repair Queue Auditor') {
      yield history.push('/RepairAudit/RepairAuditCarlist');
    } else if (temprole === 'Service Queue Auditor') {
      yield history.push('/ServiceAudit/ServiceAuditCarlist');
    } else if (temprole === 'Fleet Managers') {
      yield history.push('/breakdown/breakdownHome');
    } else if (temprole === 'Insurance') {
      yield history.push('/insurance/insuranceHome');
    } else if (temprole === 'Leasing Jama') {
      yield history.push('/LeasingJama/leasingJamaCarlist');
    } else if (temprole === 'Service Completion  Queue Operator') {
      yield history.push('/completion/CarsQueue/4');
    } else if (temprole === 'Repair Completion Queue Operator') {
      yield history.push('/completion/CarsQueue/5');
    } else if (temprole === 'Regular Audit Completion') {
      yield history.push('/completion/CarsQueue/3');
    } else if (temprole === 'Leasing Completion Queue Operator') {
      yield history.push('/completion/CarsQueue/2');
    } else if (temprole === '60: 40 Completion Queue Operator') {
      yield history.push('/completion/CarsQueue/1');
    }
    // notification.success({
    //   message: 'Logged In',
    //   description: 'You have successfully logged in!',
    // });
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
