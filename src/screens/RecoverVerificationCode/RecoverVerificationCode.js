import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TextInput, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Register from "../Register/Register";
import {svg_photo} from "../../assets/svg/svg";
import {SvgUri} from "react-native-svg";



export default class RecoverVerificationCode extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    <Text style={styles.headerTitle}>كود إستعادة الحساب</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>

                    <OTPInputView   style={{width: '80%', height: 55,alignSelf:'center'}}
                                    pinCount={5}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        // onCodeChanged = {code => { this.setState({code})}}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    onCodeFilled = {(code => {
                                        console.log(`Code is ${code}, you are good to go!`)
                                    })}/>

                    <Button title={'تأكيد'}
                            style={styles.btn1}
                            textColor={colors.white}
                            onPress={()=>this.props.navigation.navigate('Register')}
                    />
                    <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>لم تصل إليك رساله التفعيل؟</Text>

                </Content>
            </Container>
        )
    }
}