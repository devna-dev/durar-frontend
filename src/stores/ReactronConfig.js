import apiSaucePlugin from 'reactotron-apisauce';
import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';

export default Reactotron.configure({ port: 9090 })
    .useReactNative({
        asyncStorage: false,
        networking: {
            ignoreUrls: /symbolicate|127.0.0.1/,
        },
        errors: { veto: (stackFrame) => false },
        editor: false,
    })
    .use(apiSaucePlugin())
    .use(sagaPlugin())
    .connect();