import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {
  login,
  success,
  error,
  forget,
  success_login,
  REGISTER_USER_REQUEST_PENDING,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILURE,
} from './actions';
import {
  user_forget,
  user_login,
  user_register,
  user_info,
} from '../../../../services/auth';
import storage from '../../../../config/storage';

const handler = function* () {
  yield takeLatest(login, loginApi);
  yield takeLatest(forget, forgetApi);
  yield takeLatest(REGISTER_USER_REQUEST_PENDING, registerApi);
};

function* loginApi(action) {
  try {
    let result = yield user_login(action.form);
    if (result.token) {
      yield storage.setItem('token', 'Bearer ' + result.token);
      let user = yield user_info(result.token);
      yield storage.setItem('user', user);
      yield put({type: success_login, form: result});
    } else {
      yield put({type: error, form: result});
    }
  } catch (err) {
    if (err.message === 'Timeout' || err.message === 'Network request failed') {
      yield put({
        type: error,
        form: {network_error: ['Please make sure you are connected']},
      });
    }
    console.log('err', err);
  }
}

function* forgetApi(action) {
  try {
    let result = yield user_forget(action.form);
    if (result.detail) {
      yield put({type: success, form: result});
    } else {
      yield put({type: error, form: result});
    }
  } catch (err) {
    console.log('err', err);
  }
}

function* registerApi(action) {
  try {
    let result = yield user_register(action.form);
    // console.tron.display({
    //   name: 'LOG DATA OF result',
    //   value: result,
    //   preview: 'Click for details: ' + 'result',
    // });
    if (result.token) {
      yield put({type: REGISTER_USER_REQUEST_SUCCESS, form: result});
    } else {
      yield put({type: REGISTER_USER_REQUEST_FAILURE, form: result});
    }
  } catch (err) {
    if (err.message === 'Timeout' || err.message === 'Network request failed') {
      yield put({
        type: REGISTER_USER_REQUEST_FAILURE,
        form: {network_error: [err.message]},
      });
    }
    console.log('err', err);
  }
}
export {handler};
