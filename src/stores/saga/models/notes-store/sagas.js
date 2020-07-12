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

} from './actions';

import { getUserNotes, getUserBooksNotes } from '../../../../services/notes';

const handler = function* () {
  yield takeLatest(PENDING_REQUEST_NOTES, get_user_notes);
  yield takeLatest(PENDING_REQUEST_BOOKS_NOTES, get_user_books_notes);
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
      yield put({ type: SUCCESS_REQUEST_NOTES, form: notes });
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}
export { handler };
