import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { I18nManager } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import storage from './config/storage';
import AppNavigator from '../src/navigators/AppNavigator';
import store from '../src/stores';
import { colors } from "./config/styles";
import Container from './components/Containers/Container';
import { handler } from '../src/stores/saga/models/user-store/sagas';
import NotificationController from '../src/notification/NotificationController';


class shamela extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //rootPage: <Splash/>,
            language: 'ar',
            user: null,
            connection_Status: '',

        };
        this.onLayout = this.onLayout.bind(this);
        I18nManager.forceRTL(true);
    }

    onLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        });
    }

    renderPersistLoading = () => (
        <Container style={{ backgroundColor: colors.orange1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 200, height: 200 }} source={require('./assets/images/test_logo.jpeg')} />
        </Container>
    )

    render() {
        const persistor = persistStore(store);
        const { state, actions } = this.props;
        return (
            <StoreProvider store={store}>
                <PersistGate loading={this.renderPersistLoading()} persistor={persistor}>
                    <AppNavigator />
                    <NotificationController />
                </PersistGate>
            </StoreProvider>
        );
    }
}


export default shamela;
