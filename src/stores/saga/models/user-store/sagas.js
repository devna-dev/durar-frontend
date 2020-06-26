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
  logout,
  clear,
  GET_user_books,
  GET_user_books_SUCCESS
} from './actions';
import {
  user_forget,
  user_login,
  user_register,
  user_info, user_logout, get_user_books,
} from '../../../../services/auth';
import storage from '../../../../config/storage';
import {GET_BOOK_DETAIL_SUCCESS} from '../book-store/actions';

const handler = function* () {
  yield takeLatest(login, loginApi);
  yield takeLatest(forget, forgetApi);
  yield takeLatest(REGISTER_USER_REQUEST_PENDING, registerApi);
  yield takeLatest(logout, logoutApi);
  yield takeLatest(GET_user_books, user_books);
};

function* loginApi(action) {
  try {
    let result = yield user_login(action.form);
    if (result.token) {
      yield storage.setItem('token', 'Bearer ' + result.token);
      let user = yield user_info(result.token);
      console.log(user)
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
    console.log('err', JSON.stringify(err));
  }
}

function* logoutApi(action) {
  try {
    let result = yield user_logout(action.form);
    if (result.token) {
      yield put({type: clear});
    }
  } catch (err) {
    if (err.message === 'Timeout' || err.message === 'Network request failed') {
      yield put({
        type: REGISTER_USER_REQUEST_FAILURE,
        form: {network_error: [err.message]},
      });
    }
    console.log('err', JSON.stringify(err));
  }
}


function* user_books() {
  try {
    const books = yield get_user_books();
    console.tron.display({
      name: 'LOG DATA OF books',
      value: books,
      preview: 'Click for books: ' + 'books',
    });
    console.log('book for user', books);
    yield put({type: GET_user_books_SUCCESS, form: books});
  } catch (err) {
    console.log(err, 'err user books');
  }
}
export {handler};
