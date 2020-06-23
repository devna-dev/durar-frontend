import {takeLatest, put, takeEvery, all, call} from 'redux-saga/effects';

import {
  get_books,
  get_books_success,
  get_categories,
  get_categories_success,
  GET_BOOK_DETAIL_PENDING,
  GET_BOOK_DETAIL_SUCCESS,
} from './actions';
import {
  getBook,
  getCategories,
  getBookDetailApi,
  getBookCommentsApi,
} from '../../../../services/books';

const handler = function* () {
  yield takeLatest(get_books, get_booksApi);
  yield takeLatest(get_categories, get_categoriesApi);
  yield takeEvery(GET_BOOK_DETAIL_PENDING, getBookDetail);
};

function* get_booksApi(action) {
  try {
    let result = yield getBook();
    yield put({type: get_books_success, form: result});
  } catch (err) {
  }
}

function* get_categoriesApi(action) {
  try {
    let result = yield getCategories();
    // console.log('categories',result)
    yield put({type: get_categories_success, form: result});
  } catch (err) {
  }
}

function* getBookDetail(form) {
  try {
    const [books, repos] = yield all([
      call(getBookDetailApi, form.form.lookupId),
      call(getBookCommentsApi, form.form.lookupId),
    ]);
    // let result = yield getBookDetailApi(form.form.lookupId);
    console.tron.display({
      name: 'LOG DATA OF books',
      value: books,
      preview: 'Click for details: ' + 'books',
    });
    console.tron.display({
      name: 'LOG DATA OF repos',
      value: repos,
      preview: 'Click for details: ' + 'repos',
    });
    console.log('book detail', books);
    yield put({type: GET_BOOK_DETAIL_SUCCESS, form: books});
  } catch (err) {
    console.log(err, 'err getBookDetail');
  }
}

export {handler};
