import {takeLatest, put} from 'redux-saga/effects';

import {GET_ALL_USER_INFO_REQUEST, GET_ALL_USER_INFO_REQUEST_SUCCESS, login} from './actions';

const handler = function* () {
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
  //  alert('dd')
    try {
        // API call
        let r = yield put({
            type: login,
            payload: {
                email: 'fatma1211994@hotmail.com',
                password: '12345'
            },
        });
        console.log(r)
    } catch (err) {
        // Handle error
    }
}

export {handler};