import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {
  get_books,
  get_books_success,
  get_categories,
  get_categories_success,
  get_authors,
  get_authors_success,
} from './actions';
import {getAuthors, getBook, getCategories} from '../../../../services/books';

const handler = function* () {
  yield takeLatest(get_books, get_booksApi);
  yield takeLatest(get_categories, get_categoriesApi);
  yield takeLatest(get_authors, get_categoriesApi);
};

function* get_booksApi(action) {
  try {
    let result = yield getBook();
    yield put({type: get_books_success, form: result});
  } catch (err) {}
}

function* get_categoriesApi(action) {
  try {
    let result = yield getCategories();
    console.log('categories', result);
    yield put({type: get_categories_success, form: result});
  } catch (err) {}
}

function* get_authorsApi(action) {
  try {
    let result = yield getAuthors();
    console.log('authors', result);
    yield put({type: get_authors_success, form: result});
  } catch (err) {}
}

export {handler};
