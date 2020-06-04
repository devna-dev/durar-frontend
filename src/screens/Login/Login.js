import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TextInput, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import RecoverPassword from "../RecoverPassword/RecoverPassword";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Image style={styles.logo} source={require('../../assets/images/Screenshot_3.png')}/>
                    <Text style={styles.address}>الشاملة</Text>
                    <Text style={styles.title}>تسجيل الدخول</Text>
                    <TextInput placeholder={'البريد الالكتروني'}
                               style={styles.input}/>
                    <TextInput placeholder={'كلمة المرور'}
                               style={styles.input}/>
                    <Button title={'تسجيل دخول'}
                            style={styles.btn1}
                            onPress={() => this.props.navigation.navigate('RecoverPassword')}
                            textColor={colors.white}
                    />
                    <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>نسيت كلمة المرور</Text>
                    <Text style={styles.text2}>إذا كنت مستخدم جديد</Text>
                    <Button title={'إنشاء حساب جديد'}
                            style={styles.btn}/>


                </Content>
            </Container>
        )
    }
}