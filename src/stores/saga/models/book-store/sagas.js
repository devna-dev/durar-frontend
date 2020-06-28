import {takeLatest, put, takeEvery, all, call} from 'redux-saga/effects';

import {
  get_books,
  get_books_success,
  get_categories,
  get_categories_success,
  GET_BOOK_DETAIL_PENDING,
  GET_BOOK_DETAIL_SUCCESS,
  get_authors_success,
  get_authors,
  search_result,
  GET_Search_Result_SUCCESS,
  get_popular_books,
  get_popular_books_success,
  get_current_read,
  get_current_read_success,
  suggest,
  suggest_success,
} from './actions';
import {
  getBook,
  getCategories,
  getBookDetailApi,
  getBookCommentsApi,
  getAuthors,
  search_resultApi,
  popular_booksApi,
  get_current_readApi,
  suggest_to_api,
} from '../../../../services/books';
import {support_api} from '../../../../services/auth';
import {REGISTER_USER_REQUEST_FAILURE} from '../user-store/actions';

const handler = function* () {
  yield takeLatest(get_books, get_booksApi);
  yield takeLatest(get_categories, get_categoriesApi);
  yield takeEvery(GET_BOOK_DETAIL_PENDING, getBookDetail);
  yield takeEvery(get_authors, get_authorsApi);
  yield takeEvery(search_result, get_search_result);
  yield takeEvery(get_popular_books, get_popular_books_api);
  yield takeEvery(get_current_read, get_current_read_api);
  yield takeEvery(suggest, suggest_api);
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
    // console.log('categories',result)
    yield put({type: get_categories_success, form: result});
  } catch (err) {}
}

function* get_authorsApi(action) {
  try {
    let result = yield getAuthors();
    // console.log('categories',result)
    yield put({type: get_authors_success, form: result});
  } catch (err) {}
}

function* get_search_result(form) {
  try {
    const [books, repos] = yield all([call(search_resultApi)]);
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
    yield put({type: GET_Search_Result_SUCCESS, form: books});
  } catch (err) {
    console.log(err, 'err getBookDetail');
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

function* get_popular_books_api(form) {
  try {
    const books = yield popular_booksApi();
    console.log('book detail', books);
    yield put({type: get_popular_books_success, form: books});
  } catch (err) {
    console.log(err, 'err getBookDetail');
  }
}

function* get_current_read_api(form) {
  try {
    const books = yield get_current_readApi();
    console.log('book detail', books);
    yield put({type: get_current_read_success, form: books});
  } catch (err) {
    console.log(err, 'err getBookDetail');
  }
}

function* suggest_api(action) {
  try {
    const suggest = yield suggest_to_api(action.form);
    console.log('support for user', suggest);
    yield put({type: suggest_success, form: suggest});
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

export {handler};
