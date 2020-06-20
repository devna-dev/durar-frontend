import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {login, success, error} from './actions';
import {user_login} from "../../../../services/auth";

const handler = function* () {
    yield takeEvery(login, loginApi);
}


function* loginApi(action) {
    try {
        let result = yield user_login(action.form)
        // console.log('api',result)
        if (result['token']) {
            yield put({type: success, form: result})
        } else {
            yield put({type: error, form: result})
        }
    } catch (err) {
        console.log('err', err)

    }
}

export {handler};
