import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {
  get_books,
  get_books_success,
  get_categories,
  get_categories_success
} from './actions';
import {getBook, getCategories} from '../../../../services/books';

const handler = function* () {
  yield takeLatest(get_books, get_booksApi);
  yield takeLatest(get_categories, get_categoriesApi);
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
    console.log('categories',result)
    yield put({type: get_categories_success, form: result});
  } catch (err) {
  }
}

export {handler};
