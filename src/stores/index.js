import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from './ReactronConfig';
import { rootReducer } from './saga/models/root.reducer';
import rootSaga from './saga/root.saga';

function init(history) {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    let sagaMiddleware;
    if (__DEV__) {
        const sagaMonitor = Reactotron.createSagaMonitor();
        sagaMiddleware = createSagaMiddleware({ sagaMonitor });
        console.tron =  Reactotron;
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

    } else {
        sagaMiddleware = createSagaMiddleware();
   }
    const middleware = [sagaMiddleware];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    /* eslint-disable no-underscore-dangle */
    const store = createStore(rootReducer, composedEnhancers);
    /* eslint-enable */
    sagaMiddleware.run(rootSaga);

    return store;
}

const store = init();

export default store;
