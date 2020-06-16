import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TextInput, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import TouchableOpacity from "react-native-gesture-handler/touchables/TouchableOpacity";


export default class Register extends Component {



    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>تسجيل حساب جديد</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>

                    <TextInput placeholder={'أحمد'}
                               style={styles.input}/>

                    <TextInput placeholder={'البريد الالكتروني'}
                               style={styles.input}/>

                    <TextInput placeholder={'كلمة المرور'}
                               style={styles.input}/>

                    <TextInput placeholder={'تأكيد كلمة المرور'}
                               style={styles.input}/>
                    <Button title={'تسجيل'}
                            style={styles.btn1}
                            onPress={()=>this.props.navigation.navigate('VerificationCode')}
                            textColor={colors.white}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>لديك حساب بالفعل</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}