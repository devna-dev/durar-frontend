import { takeLatest, put, takeEvery } from 'redux-saga/effects';

import {
    login,
    error,
    reset,
    success_reset,
    success_login,
    REGISTER_USER_REQUEST_PENDING,
    REGISTER_USER_REQUEST_SUCCESS,
    REGISTER_USER_REQUEST_FAILURE,
    logout,
    clear,
    verify_email_pending,
    verify_email_success,
    GET_user_books,
    GET_user_books_SUCCESS,
    support,
    support_success,
    resend_code,
    get_points,
    success_get_points,
    login_email_verified,
} from './actions';

import {
    user_forget,
    user_login,
    user_register,
    user_info,
    verify_email,
    user_logout,
    get_user_books,
    support_api,
    reSend_code,
    get_user_points,
} from '../../../../services/auth';
import storage from '../../../../config/storage';

const handler = function* () {
    yield takeLatest(login, loginApi);
    yield takeLatest(reset, forgetApi);
    yield takeLatest(verify_email_pending, verifyEmailApi);
    yield takeLatest(resend_code, reSendCodeApi);
    yield takeLatest(REGISTER_USER_REQUEST_PENDING, registerApi);
    yield takeLatest(logout, logoutApi);
    yield takeLatest(GET_user_books, user_books);
    yield takeLatest(support, support_saga_api);
    yield takeLatest(get_points, get_pointsApi);
};

function* loginApi(action) {
    try {
        let result = yield user_login(action.form);
        if (result.token && result.user.email_verified) {
            yield storage.setItem('token', 'Bearer ' + result.token);
            let user = yield user_info(result.token);
            let points = yield get_user_points();
            if (points) {
                storage.setItem('points', points.total);
            }
            yield storage.setItem('user', user);
            yield put({ type: success_login, form: result });
        } else if (result.token && !result.user.email_verified){
            yield storage.setItem('tokenRegister', 'Bearer ' + result.token);
            yield put({ type: login_email_verified, form: result });
        } else {
            yield put({ type: error, form: result });
        }
    } catch (err) {
        // alert(err)
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: error,
                form: { network_error: ['Please make sure you are connected'] },
            });
        }
        console.log('err', err);
    }
}

function* verifyEmailApi(action) {
    try {
        let result = yield verify_email(action.form);
        if (result === 1) {
            yield put({ type: verify_email_success, form: { detail: result } });
        } else {
            yield put({ type: error, form: { detail: result.detail || result } });
        }
    } catch (err) {
        console.log('err verifyEmailApi', err);
    }
}

function* reSendCodeApi() {
    try {
        let result = yield reSend_code();
        console.log('result', result);
    } catch (err) {
        console.log('err reSendCodeApi', err);
    }
}

function* get_pointsApi() {
    try {
        let result = yield get_user_points();
        console.log('result points', result);
        if (result) {
            yield put({ type: success_get_points, form: result });
        }
    } catch (err) {
        console.log('err get_pointsApi', err);
    }
}

function* forgetApi(action) {
    try {
        let result = yield user_forget(action.form);
        if (result.detail) {
            yield put({ type: success_reset, form: result });
        } else {
            yield put({ type: error, form: result });
        }
    } catch (err) {
        console.log('err', err);
    }
}

function* registerApi(action) {
    try {
        let result = yield user_register(action.form);
        if (result.token) {
            yield storage.setItem('tokenRegister', 'Bearer ' + result.token);
            yield put({ type: REGISTER_USER_REQUEST_SUCCESS, form: result });
        } else {
            yield put({ type: REGISTER_USER_REQUEST_FAILURE, form: result });
        }
    } catch (err) {
        // alert(err)
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: REGISTER_USER_REQUEST_FAILURE,
                form: { network_error: [err.message] },
            });
        }
    }
}

function* logoutApi(action) {
    try {
        let result = yield user_logout(action.form);
        if (result.token) {
            yield put({ type: clear });
        }
    } catch (err) {
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: REGISTER_USER_REQUEST_FAILURE,
                form: { network_error: [err.message] },
            });
        }
        console.log('err', JSON.stringify(err));
    }
}

function* user_books() {
    try {
        const books = yield get_user_books();
        // console.tron.display({
        //   name: 'LOG DATA OF books',
        //   value: books,
        //   preview: 'Click for books: ' + 'books',
        // });

        yield put({ type: GET_user_books_SUCCESS, form: books });
    } catch (err) {
        console.log(err, 'err user books');
    }
}

function* support_saga_api(action) {
    try {
        const support = yield support_api(action.form);
        console.log('fffffffffffffffffffffffffffffffffffffffff')
        console.log(support)
        yield put({ type: support_success, form: support });
    } catch (err) {
        if (err.message === 'Timeout' || err.message === 'Network request failed') {
            yield put({
                type: REGISTER_USER_REQUEST_FAILURE,
                form: { network_error: [err.message] },
            });
        }
        console.log('err', JSON.stringify(err));
    }
}

export { handler };
