import { fork } from 'redux-saga/effects';

import { handler as userSaga } from './models/user-store/sagas';

export default function* rootSaga() {
    yield fork(userSaga);
    // add all sagas
}