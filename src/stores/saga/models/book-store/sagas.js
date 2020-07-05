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
    GET_BOOK_PENDING,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAILURE,
    GET_BOOK_CONTENT_PENDING,
    GET_BOOK_CONTENT_SUCCESS,
    get_popular_books,
    get_popular_books_success,
    get_current_read,
    get_current_read_success,
    suggest,
    suggest_success,
    donate,
    donate_success,
    REGISTER_USER_REQUEST_FAILURE,
    get_activities,
    get_activities_success,
    GET_BOOK_REVIEWS_SUCCESS,
    post_review,
    post_review_success,
    post_review_fail, GET_BOOK_COMMENTS_SUCCESS,
} from './actions';
import {
    getBooks,
    getBookApi,
    getCategories,
    getBookDetailApi,
    getBookCommentsApi,
    getAuthors,
    search_resultApi,
    getBookPageContent,
    popular_booksApi,
    get_current_readApi,
    suggest_to_api,
    getBookReviewsApi,
    get_activities_Api,
    post_review_api, donate_to_api,
} from '../../../../services/books';

const handler = function* () {
    yield takeLatest(get_books, get_booksApi);
    yield takeLatest(get_categories, get_categoriesApi);
    yield takeEvery(GET_BOOK_PENDING, getBook);
    yield takeEvery(GET_BOOK_DETAIL_PENDING, getBookDetail);
    yield takeEvery(get_authors, get_authorsApi);
    yield takeEvery(search_result, get_search_result);
    yield takeEvery(GET_BOOK_CONTENT_PENDING, get_Book_Content);
    yield takeEvery(get_popular_books, get_popular_books_api);
    yield takeEvery(get_current_read, get_current_read_api);
    yield takeEvery(suggest, suggest_api);
    yield takeEvery(donate, donate_api);
    yield takeEvery(get_activities, get_activities_api);
    yield takeEvery(post_review, postReviewApi);
};

function* get_booksApi(action) {
    try {
        let result = yield getBooks();
        yield put({type: get_books_success, form: result});
    } catch (err) {
    }
}

function* get_categoriesApi(action) {
    try {
        let result = yield getCategories();
        console.log('categories', result)
        yield put({type: get_categories_success, form: result});
    } catch (err) {
    }
}

function* get_authorsApi(action) {
    try {
        let result = yield getAuthors();
        // console.log('categories',result)
        yield put({type: get_authors_success, form: result});
    } catch (err) {
    }
}

function* get_search_result(form) {
    try {
        const books = yield call(search_resultApi, form.form);
        // console.log('***************',books)
        // console.log('book detail', books);
        if (books) yield put({type: GET_Search_Result_SUCCESS, form: books});
    } catch (err) {
        console.log(err, 'err getBookDetail');
    }

}

function* getBookDetail(form) {
    try {
        const [bookDetail, bookPageContent, comments] = yield all([
            call(getBookDetailApi, form.form),
            call(getBookPageContent, form.form),
            call(getBookCommentsApi, form.form.lookupId),
        ]);
        console.log('=======================================================================================================');
        console.log(bookDetail, 'bookDetail');
        console.log('=======================================================================================================');
        console.log(bookPageContent, 'bookPageContent');
        console.log('=======================================================================================================');
        console.log(comments, 'comments');
        console.log('=======================================================================================================');
        if (bookDetail || bookPageContent || comments) {
            yield put({
                type: GET_BOOK_DETAIL_SUCCESS,
                form: bookDetail,
            });
            yield put({
                type: GET_BOOK_COMMENTS_SUCCESS,
                form: comments,
            });
            yield put({
                type: GET_BOOK_CONTENT_SUCCESS,
                form: bookPageContent,
            });
        }
    } catch (err) {
        yield put({type: GET_BOOK_FAILURE, form: err});
        console.log(JSON.stringify(err), 'err getBookDetail');
    }
}

function* get_Book_Content(form) {
    try {
        console.log(form);
        const bookPageContent = yield getBookPageContent(form.form);
        if (bookPageContent) {
            yield put({type: GET_BOOK_CONTENT_SUCCESS, form: bookPageContent});
        }
    } catch (err) {
        yield put({type: GET_BOOK_FAILURE, form: err});
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

function* getBook(form) {
    try {
        const [book, reviews] = yield all([
            call(getBookApi, form.form.lookupId),
            call(getBookReviewsApi, form.form.lookupId),
        ]);
        if (book) {
            yield put({type: GET_BOOK_SUCCESS, form: {book, reviews}});
        }
    } catch (err) {
        yield put({type: GET_BOOK_FAILURE, form: err});
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

function* get_activities_api(form) {
    try {
        const books = yield get_activities_Api();
        console.log('book get_activities_success', books);
        yield put({type: get_activities_success, form: books});
    } catch (err) {
        console.log(err, 'err get_activities_success');
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

function* donate_api(action) {
    try {
        const donate = yield donate_to_api(action.form);
        console.log('donate_to_api for user', donate);
        yield put({type: donate_success, form: donate});
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

function* postReviewApi(form) {
    try {
        console.log(form, 'form');
        const [postedReviews, reviews] = yield all([
            call(post_review_api, form.form),
            call(getBookReviewsApi, form.form.lookupId),
        ]);
        console.log('book post_review_success', reviews);
        if (postedReviews) {
            yield put({type: post_review_success});
            yield put({type: GET_BOOK_REVIEWS_SUCCESS, form: {reviews}});
        } else {
            yield put({type: post_review_fail, form: form});
        }
    } catch (err) {
        yield put({type: post_review_fail, form: err});
        console.log(err, 'err get_review_error');
    }
}

export {handler};
