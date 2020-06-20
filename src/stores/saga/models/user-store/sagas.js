import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {login, success, error, forget, success_login} from './actions';
import {user_forget, user_info, user_login} from '../../../../services/auth';
import storage from '../../../../config/storage';

const handler = function* () {
    yield takeLatest(login, loginApi);
    yield takeLatest(forget, forgetApi);
};


function* loginApi(action) {
    try {
        let result = yield user_login(action.form);
        if (result['token']) {
            yield storage.setItem('token', 'Bearer ' + result['token']);
            let user = yield user_info(result['token']);
            yield storage.setItem('user', user);
            yield put({type: success_login, form: result});
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
