import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from './ReactronConfig';
import { rootReducer } from './saga/models/root.reducer';
import rootSaga from './saga/root.saga';

function connectReactotronToConsole() {
    if (__DEV__) {
        const _log = (values) => __DEV__ && Reactotron.log(values);
        const _warn = (values) => __DEV__ && Reactotron.warn(values);
        const _error = (values) => __DEV__ && Reactotron.error(values);

        console.log = _log;
        console.warn = _warn;
        console.error = _error;
    }
}

function init(history) {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const enhancers = [];
    // ======================================================
    let sagaMiddleware;
    if (__DEV__) {
        const sagaMonitor = Reactotron.createSagaMonitor();
        sagaMiddleware = createSagaMiddleware({ sagaMonitor });
        console.tron = Reactotron;
        // enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        enhancers.push(Reactotron.createEnhancer());
        console.disableYellowBox = true;
        //connect console log to Reactotron
        connectReactotronToConsole();
    } else {
        sagaMiddleware = createSagaMiddleware();
    }

    const middleware = [sagaMiddleware];
    // Store Enhancers
    // ======================================================
    const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    /* eslint-disable no-underscore-dangle */
    const store = createStore(rootReducer, composedEnhancers);
    /* eslint-enable */
    sagaMiddleware.run(rootSaga);

    /* if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(rootReducer, () => {
            const nextRootReducer = rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    } */

    return store;
}

const store = init();

export default store;
