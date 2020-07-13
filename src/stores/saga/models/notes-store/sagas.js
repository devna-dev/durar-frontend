import { takeLatest, put, takeEvery, call } from 'redux-saga/effects';

import {
  CLEAR_NOTES,
  NOTES_FAIL,
  PENDING_DELETE_NOTES,
  PENDING_REQUEST_NOTES,
  SUCCESS_DELETE_NOTES,
  SUCCESS_REQUEST_NOTES,

  PENDING_REQUEST_BOOKS_NOTES,
  SUCCESS_REQUEST_BOOKS_NOTES,
  PENDING_DELETE_BOOKS_NOTES,
  SUCCESS_DELETE_BOOKS_NOTES,

  PENDING_ADD_NOTES,
  FINISH_ADD_NOTES

} from './actions';

import { getUserNotes, getUserBooksNotes, addUserNotes, deleteUserNotes, deleteUserBooksNotes } from '../../../../services/notes';

const handler = function* () {
  yield takeLatest(PENDING_REQUEST_NOTES, get_user_notes);
  yield takeLatest(PENDING_REQUEST_BOOKS_NOTES, get_user_books_notes);
  yield takeLatest(PENDING_ADD_NOTES, add_user_notes);
  yield takeLatest(PENDING_DELETE_NOTES, delete_user_notes);
  yield takeLatest(PENDING_DELETE_BOOKS_NOTES, delete_user_Books_notes);
};
function* get_user_notes() {
  try {
    const notes = yield call(getUserNotes);
    if (notes) {
      yield put({ type: SUCCESS_REQUEST_NOTES, form: notes });
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}


function* get_user_books_notes() {
  try {
    const notes = yield call(getUserBooksNotes);
    if (notes) {
      yield put({ type: SUCCESS_REQUEST_BOOKS_NOTES, form: notes });
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}

function* add_user_notes(payload) {
  try {
    const notes = yield call(addUserNotes, payload.note);
    if (notes) {
      yield put({ type: FINISH_ADD_NOTES, });
      payload?.callback && payload?.callback()
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}

function* delete_user_notes(payload) {
  try {
    const notes = yield call(deleteUserNotes, payload.note);
    if (notes) {
      yield put({ type: SUCCESS_DELETE_NOTES, });
      payload?.callback && payload?.callback()
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}

function* delete_user_Books_notes(payload) {
  try {
    const notes = yield call(deleteUserBooksNotes, payload.note);
    if (notes) {
      yield put({ type: SUCCESS_DELETE_BOOKS_NOTES, });
      payload?.callback && payload?.callback()
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}
export { handler };
