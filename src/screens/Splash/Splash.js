import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Image} from 'react-native';
import storage from '../../config/storage';

export default class Splash extends Component {

    constructor(props) {
        super(props);
        setTimeout(async function () {
            let user = await storage.getItem('user');
            if(user){
               props.navigation.replace('TabNavigator')
            }else{
                props.navigation.replace('Walkthrough')
            }
        },2000);
    }

    render() {
        return (
            <Container style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/ic_launcher_round.png')}/>
            </Container>
        );
    }


}