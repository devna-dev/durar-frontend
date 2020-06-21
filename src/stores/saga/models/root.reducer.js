import { combineReducers } from 'redux';

import { reducer as userReducer } from './user-store/reducer';
import { reducer as bookReducer } from './book-store/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
});

export { rootReducer };
