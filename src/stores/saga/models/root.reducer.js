import { combineReducers } from 'redux';

import { reducer as userReducer } from './user-store/reducer';

const rootReducer = combineReducers({
    user: userReducer,
});

export { rootReducer };