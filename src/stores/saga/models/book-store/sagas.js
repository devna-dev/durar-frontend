import {takeLatest, put, takeEvery, all, call} from 'redux-saga/effects';

import {
    GET_BOOK_Notes_SUCCESS,
    post_note,
    post_note_success,
    post_note_fail,
    GET_BOOK_NOTES_PENDING,
    GET_BOOK_NOTES_FAILURE,
    GET_BOOK_DETAIL_FAILURE,
    GET_BOOK_CONTENT_FAILURE,
    SEARCH_IN_BOOK_PENDING,
    SEARCH_IN_BOOK_SUCCESS,
    SEARCH_IN_BOOK_FAIL,
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
    DONATION_FAILURE,
    get_activities,
    get_activities_success,
    GET_BOOK_REVIEWS_SUCCESS,
    post_review,
    post_review_success,
    post_review_fail,
    SUGGEST_FAILURE,
} from './actions';
import {
    getBooks,
    getBookApi,
    getCategories,
    getBookDetailApi,
    getAuthors,
    search_resultApi,
    getBookPageContent,
    popular_booksApi,
    get_current_readApi,
    suggest_to_api,
    getBookReviewsApi,
    get_activities_Api,
    post_review_api,
    donate_to_api,
    search_content_api,
    post_notes_api,
    getBookNotesApi,
} from '../../../../services/books';
import storage from '../../../../config/storage';

const handler = function* () {
    yield takeEvery(get_popular_books, get_popular_books_api);
    yield takeEvery(get_current_read, get_current_read_api);
    yield takeEvery(suggest, suggest_api);
    yield takeEvery(get_activities, get_activities_api);
    yield takeEvery(post_review, postReviewApi);
    yield takeEvery(post_note, postNoteApi);
    yield takeEvery(SEARCH_IN_BOOK_PENDING, searchContentApi);
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
    yield takeEvery(GET_BOOK_NOTES_PENDING, get_notes_api);
};

const isNullOrUndeclared = (value) =>
    typeof value === 'undefined' || (typeof value === 'object' && !value);

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
        yield put({type: get_categories_success, form: result});
    } catch (err) {
    }
}

function* get_authorsApi(action) {
    try {
        let result = yield getAuthors();
        yield put({type: get_authors_success, form: result});
    } catch (err) {
    }
}

function* get_search_result(form) {
    try {
        const books = yield call(search_resultApi, form.form);
        if (books) {
            yield put({type: GET_Search_Result_SUCCESS, form: books});
        }
    } catch (err) {
        console.log(err, 'err get_search_result');
    }
}

function* getBookDetail(form) {
    const {bookDetail, bookPageContent, notes} = yield all({
        bookDetail: call(getBookDetailApi, form.form),
        bookPageContent: call(getBookPageContent, form.form),
        notes: call(getBookNotesApi, form.form.lookupId),
    });
    if (!isNullOrUndeclared(bookDetail.response)) {
        yield put({
            type: GET_BOOK_DETAIL_SUCCESS,
            form: bookDetail.response,
        });
    } else {
        yield put({type: GET_BOOK_DETAIL_FAILURE, form: bookDetail.error});
    }
    if (!isNullOrUndeclared(notes.response)) {
        yield put({
            type: GET_BOOK_Notes_SUCCESS,
            form: notes.response,
        });
    } else {
        yield put({type: GET_BOOK_NOTES_FAILURE, form: notes.error});
    }
    if (!isNullOrUndeclared(bookPageContent.response)) {
        yield put({
            type: GET_BOOK_CONTENT_SUCCESS,
            form: bookPageContent.response,
        });
    } else {
        yield put({type: GET_BOOK_CONTENT_FAILURE, form: bookPageContent.error});
    }
}

function* get_Book_Content(form) {
    const bookPageContent = yield getBookPageContent(form.form);

    if (bookPageContent.response) {
        yield put({
            type: GET_BOOK_CONTENT_SUCCESS,
            form: bookPageContent.response,
        });
    } else {
        yield put({type: GET_BOOK_CONTENT_FAILURE, form: bookPageContent.error});
    }
}

function* get_popular_books_api(form) {
    try {
        const books = yield popular_booksApi();

        yield put({type: get_popular_books_success, form: books});
    } catch (err) {
        console.log(err, 'err get_Book_Content');
    }
}

function* getBook(form) {
    try {
        const [book, reviews] = yield all([
            call(getBookApi, form.form.lookupId),
            call(getBookReviewsApi, form.form.lookupId),
        ]);
        console.log('get booooooooooooooooooooooooooooooooooook')
        console.log(book)
        if (book) {
            yield put({type: GET_BOOK_SUCCESS, form: {book, reviews}});
        }
    } catch (err) {
        yield put({type: GET_BOOK_FAILURE, form: err});
        console.log(err, 'err getBook');
    }
}

function* get_current_read_api(form) {
    try {
        const books = yield get_current_readApi();

        yield put({type: get_current_read_success, form: books});
    } catch (err) {
        console.log(err, 'err get_current_read_api');
    }
}

function* get_activities_api(form) {
    try {
        const books = yield get_activities_Api();

        yield put({type: get_activities_success, form: books});
    } catch (err) {
        console.log(err, 'err get_activities_api');
    }
}

function* suggest_api(action) {
    try {
        const denotation = yield suggest_to_api(action.form);
        console.log('fffffffffffffffffffffffffffffffffffffffff')
        console.log(denotation)
        yield put({type: suggest_success, form: denotation});
    } catch (err) {
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: SUGGEST_FAILURE,
                form: {network_error: [err.message]},
            });
        }
    }
}

function* donate_api(action) {
    try {
        const donation = yield donate_to_api(action.form);
        console.log('donate_to_api for user', donation);
        yield put({type: donate_success, form: donation});
    } catch (err) {
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: DONATION_FAILURE,
                form: {network_error: [err.message]},
            });
        }
        console.log('err', JSON.stringify(err));
    }
}

function* postReviewApi(form) {
    console.log('////////////////////////////////////////////////////////////////')
    console.log(form.form)

    const [postedReviews, reviews] = yield all([
        call(post_review_api, form.form),
        call(getBookReviewsApi, form.form.lookupId),
    ]);

    console.log('////////////////////////////////////////////////////////////////')
    console.log(postedReviews)
    console.log(reviews)
    if (postedReviews) {
        yield put({type: post_review_success});
        yield put({type: GET_BOOK_REVIEWS_SUCCESS, form: {reviews}});
    } else {
        yield put({type: post_review_fail, form: form});
    }
}

function* postNoteApi(form) {
    try {
        const postedNote = yield call(post_notes_api, form.form);
        if (postedNote) {
            yield put({type: post_note_success});
        }
    } catch (err) {
        yield put({type: post_note_fail, form: err});
        console.log(err, 'err postNoteApi');
    }
}

function* searchContentApi(form) {
    try {
        const searchedContent = yield call(search_content_api, form.form);

        if (searchedContent) {
            yield put({type: SEARCH_IN_BOOK_SUCCESS, form: searchedContent});
        }
    } catch (err) {
        yield put({type: SEARCH_IN_BOOK_FAIL, form: err});
    }
}

function* get_notes_api(form) {
    const {response, error} = yield call(getBookNotesApi, form.form.lookupId);
    // console.log(response, "response", error, "error");
    if (!isNullOrUndeclared(response)) {
        yield put({
            type: GET_BOOK_Notes_SUCCESS,
            form: response,
        });
    } else {
        yield put({type: GET_BOOK_NOTES_FAILURE, form: error});
    }
}

export {handler};
