import {takeLatest, put, takeEvery, call} from 'redux-saga/effects';

import {
  CLEAR_NOTES,
  NOTES_FAIL,
  PENDING_DELETE_NOTES,
  PENDING_REQUEST_NOTES,
  SUCCESS_DELETE_NOTES,
  SUCCESS_REQUEST_NOTES,
} from './actions';

import {getUserNotes} from '../../../../services/notes';

const handler = function* () {
  yield takeLatest(PENDING_REQUEST_NOTES, get_user_notes);
};
function* get_user_notes() {
  try {
    const notes = yield call(getUserNotes);
    if (notes) {
      yield put({type: SUCCESS_REQUEST_NOTES, form: notes});
    }
  } catch (err) {
    console.log(err, 'err notes');
  }
}
export {handler};
