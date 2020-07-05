import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Image} from 'react-native';
import storage from '../../config/storage';
import RNRestart from 'react-native-restart';
import {colors} from "../../config/styles";

export default class Splash extends Component {

    constructor(props) {
        super(props);
        setTimeout(async function () {
            let user = await storage.getItem('user');
            if (user) {
                props.navigation.replace('Root');
            } else {
                props.navigation.replace('Auth');
            }
        }, 2000);
    }

    async componentDidMount() {
        let access2 = await storage.getItem('access2');
        if (access2) {
        } else{
            await storage.setItem('access2', 'lll');
            RNRestart.Restart();
        }
    }


render()
{
    return (
        <Container style={{backgroundColor: colors.orange1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width:200,height:200}} source={require('../../assets/images/test_logo.jpeg')}/>
        </Container>
    );
}


}
