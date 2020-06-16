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
        this.state = {
            email: '',
            email_error: '',
        };
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>إستعادة الحساب</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>
                    <View style={styles.view}>
                        <TextInput placeholder={'البريد الالكتروني'}
                                   value={this.state.email}
                                   onChangeText={(value) => this.onChangeEmail(value)}
                                   style={[styles.input, {
                                       borderColor: this.state.email_error != '' ? colors.error : colors.border,
                                       borderWidth: this.state.email_error != '' ? 2 : 1
                                   }]}/>
                    </View>
                    {this.state.email_error != '' && <Text style={styles.error}>{this.state.email_error}</Text>}

                    <Button title={'إستعادة كلمة المرور'}
                            style={styles.btn1}
                            onPress={this.recover.bind(this)}
                            textColor={colors.white}
                    />

                </Content>
            </Container>
        )
    }

    onChangeEmail(value) {
        this.setState({email: value, email_error: ''})
    }

    validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.state.email == '') {
            this.setState({email_error: '*حقل مطلوب'});
            return false;
        } else if (!re.test(this.state.email)) {
            this.setState({email_error: 'ادخل بريداً الكترونياً صحيحاً'});
            return false;
        } else {
            return true;
        }

    }

    recover = () => {
        if (this.validateEmail()) {
            this.props.navigation.navigate('RecoverVerificationCode')
        }
    }
}