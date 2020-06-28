import apiSaucePlugin from 'reactotron-apisauce';
import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.configure({port: 9090})
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
  })
  .use(reactotronRedux())
  .use(apiSaucePlugin())
  .use(sagaPlugin())
  .connect();
