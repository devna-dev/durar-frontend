import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {login, success, error, forget} from './actions';
import {user_forget, user_login} from '../../../../services/auth';

const handler = function* () {
    yield takeLatest(login, loginApi);
    yield takeLatest(forget, forgetApi);
};


function* loginApi(action) {
    try {
        let result = yield user_login(action.form);
        if (result['token']) {
            yield put({type: success, form: result});
        } else {
            yield put({type: error, form: result});
        }
    } catch (err) {
        console.log('err', err);

    }
}

function* forgetApi(action) {
    try {
        let result = yield user_forget(action.form);
        if (result['detail']) {
            yield put({type: success, form: result});
        } else {
            yield put({type: error, form: result});
        }
    } catch (err) {
        console.log('err', err);

    }
}

export {handler};
