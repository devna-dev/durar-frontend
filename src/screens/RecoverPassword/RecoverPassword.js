import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import RecoverVerificationCode from "../RecoverVerificationCode/RecoverVerificationCode";


export default class RecoverPassword extends Component {



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
                    <Text style={styles.headerTitle}>إستعادة الحساب</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>

                    <TextInput placeholder={'البريد الالكتروني'}
                               style={styles.input}/>
                    <Button title={'إستعادة كلمة المرور'}
                            style={styles.btn1}
                            onPress={()=>this.props.navigation.navigate('RecoverVerificationCode')}
                            textColor={colors.white}
                    />

                </Content>
            </Container>
        )
    }
}