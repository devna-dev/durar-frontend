import {takeLatest, put,takeEvery} from 'redux-saga/effects';

import {GET_ALL_USER_INFO_REQUEST, GET_ALL_USER_INFO_REQUEST_SUCCESS, login} from './actions';
import {user_login} from "../../../../services/auth";

const handler = function* () {
    yield takeLatest(login, loginApi);
}


function* loginApi(action) {
    console.log("action", action.form)
    try {
        alert('jj')
    //     let r = yield put({
    //     type: login,
    //     form: {
    //         email: action.form.email,
    //         password: action.form.password
    //     },
    // });
        let result = yield user_login(action.form)
        console.log('r', r)
    } catch (err) {
        // Handle error
    }
}

export {handler};