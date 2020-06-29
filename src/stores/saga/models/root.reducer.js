import {combineReducers} from 'redux';

import {reducer as userReducer} from './user-store/reducer';
import {reducer as bookReducer} from './book-store/reducer';
import {reducer as activitiesReducer} from './activities-store/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    activity: activitiesReducer
});

export {rootReducer};
