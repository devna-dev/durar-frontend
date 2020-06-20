import {takeLatest, put,takeEvery} from 'redux-saga/effects';

import {GET_ALL_USER_INFO_REQUEST, GET_ALL_USER_INFO_REQUEST_SUCCESS, login} from './actions';

const handler = function* () {
    alert('jj')
    yield takeLatest(GET_ALL_USER_INFO_REQUEST, getAllUserInfo);
    yield takeLatest(login, loginApi);
}


function* getAllUserInfo(action) {
    try {
        // API call
        yield put({
            type: GET_ALL_USER_INFO_REQUEST_SUCCESS,
            payload: {
                id: 'id1',
                name: 'Michael',
                email: 'anothertestemail@test.com',
            },
        });
    } catch (err) {
        // Handle error
    }
}

function* loginApi(action) {
    console.log("action", action)
    try {
        // API call
        let r = yield put({
            type: login,
            form: {
                email: action.form.email,
                password: action.form.password
            },
        });
        console.log('r',r)
    } catch (err) {
        // Handle error
    }
}

export {handler};