import {takeLatest, put, takeEvery} from 'redux-saga/effects';

import {login, success, error} from './actions';
import {user_login} from '../../../../services/auth';

const handler = function* () {
    yield takeLatest(login, loginApi);
};


function* loginApi(action) {
    console.log('api',action)
    let result = '';
    try {
        result = yield user_login(action.form);
        if (result['token']) {
            yield put({type: success, form: result});
        }
        else {
            yield put({type: error, form: result});
        }

    } catch (err) {
        yield put({type: error, form: result});
        console.log('saga', result);
    }
}

export {handler};
