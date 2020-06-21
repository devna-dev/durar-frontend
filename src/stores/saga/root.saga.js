import { fork } from 'redux-saga/effects';

import { handler as userSaga } from './models/user-store/sagas';
import { handler as bookSaga } from './models/book-store/sagas';

export default function* rootSaga() {
    yield fork(userSaga);
    yield fork(bookSaga);
}
