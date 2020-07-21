import { combineReducers } from 'redux';
import { persistCombineReducers } from "redux-persist";

import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


import { reducer as userReducer } from './user-store/reducer';
import { reducer as bookReducer } from './book-store/reducer';
import { reducer as activitiesReducer } from './activities-store/reducer';
import { reducer as notesReducer } from './notes-store/reducer';


const config = {
  key: "root",
  timeout: Platform.OS === "ios" ? 1 : 100,
  storage: AsyncStorage,
  blacklist: [],
  //stateReconciler: autoMergeLevel2
};

const rootReducer = persistCombineReducers(config, {
  user: userReducer,
  book: bookReducer,
  activity: activitiesReducer,
  notesStore: notesReducer,
});

export { rootReducer };
