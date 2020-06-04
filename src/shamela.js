import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {I18nManager} from 'react-native';

import storage from './config/storage';
import AppNavigator from '../src/navigators/AppNavigator';


export default class shamela extends Component {
    constructor() {
        super();
        this.state = {
            // rootPage: <Splash/>,
            language: 'ar',
            user: null,
            connection_Status: '',

        };
        this.onLayout = this.onLayout.bind(this);
        I18nManager.forceRTL(true);
        setTimeout(async () => {
            let user = await storage.getItem('access_token');
            //console.log(user)

            this.setState({
                rootPage:
                    <View style={{flex: 1}}>
                        <AppNavigator/>
                    </View>,
            });

        }, 1000);
    }

    onLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AppNavigator/>
            </View>
        );
    }
}
