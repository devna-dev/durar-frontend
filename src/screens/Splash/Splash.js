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
               props.navigation.navigate('Root');
            }else{
                props.navigation.navigate('Auth');
            }
        },2000);
    }

   async componentDidMount(){
        let access2 = await storage.getItem('access2');
        if (access2 === null) {
            await storage.setItem('access2', true);
            RNRestart.Restart();
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/ic_launcher_round.png')}/>
            </Container>
        );
    }


}
