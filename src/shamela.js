import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {I18nManager} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Provider as StoreProvider} from 'react-redux';
import storage from './config/storage';
import AppNavigator from '../src/navigators/AppNavigator';
import store from '../src/stores';
import {handler} from '../src/stores/saga/models/user-store/sagas'


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

    render() {
        const { state, actions } = this.props;
        return (
            <StoreProvider store={store}>
               <AppNavigator/>
            </StoreProvider>
        );
    }
}


export default shamela;
