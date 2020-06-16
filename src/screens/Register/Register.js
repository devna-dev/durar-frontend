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
        this.state = {
            name: '',
            name_error: '',
            email: '',
            email_error: '',
            password: '',
            password_error: '',
            confirm_password: '',
            confirm_password_error: '',
            secureTextEntry: true,
            secureTextEntryConfirm: true
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
                    <Text style={styles.headerTitle}>تسجيل حساب جديد</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>

                    <TextInput placeholder={'أحمد'}
                               value={this.state.name}
                               onChangeText={(value) => this.onChangeName(value)}
                               style={[styles.input,{
                                   borderColor: this.state.name_error != '' ? colors.error : colors.border,
                                   borderWidth: this.state.name_error != '' ? 2 : 1
                               }]}/>
                    {this.state.name_error != '' && <Text style={styles.error}>{this.state.name_error}</Text>}

                    <TextInput placeholder={'البريد الالكتروني'}
                               value={this.state.email}
                               onChangeText={(value) => this.onChangeEmail(value)}
                               style={[styles.input,{
                                   borderColor: this.state.email_error != '' ? colors.error : colors.border,
                                   borderWidth: this.state.email_error != '' ? 2 : 1
                               }]}/>
                    {this.state.email_error != '' && <Text style={styles.error}>{this.state.email_error}</Text>}

                    <View style={[styles.view, {
                        borderColor: this.state.password_error != '' ? colors.error : colors.border,
                        borderWidth: this.state.password_error != '' ? 2 : 1
                    }]}>
                        <TextInput placeholder={'كلمة المرور'}
                                   value={this.state.password}
                                   secureTextEntry={this.state.secureTextEntry}
                                   onChangeText={(value) => this.onChangePassword(value)}
                                   style={[styles.input1,]}/>
                        <TouchableOpacity style={styles.eye}
                                          onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}>
                            <SvgUri uri={svg_photo.eye}/>
                        </TouchableOpacity>
                    </View>
                    {this.state.password_error != '' && <Text style={styles.error}>{this.state.password_error}</Text>}
                    <View style={[styles.view, {
                        borderColor: this.state.confirm_password_error != '' ? colors.error : colors.border,
                        borderWidth: this.state.confirm_password_error != '' ? 2 : 1
                    }]}>
                        <TextInput placeholder={'تأكيد كلمة المرور'}
                                   value={this.state.confirm_password}
                                   secureTextEntry={this.state.secureTextEntryConfirm}
                                   onChangeText={(value) => this.onChangeConfirmPassword(value)}
                                   style={[styles.input1,]}/>
                        <TouchableOpacity style={styles.eye}
                                          onPress={() => this.setState({secureTextEntryConfirm: !this.state.secureTextEntryConfirm})}>
                            <SvgUri uri={svg_photo.eye}/>
                        </TouchableOpacity>
                    </View>
                    {this.state.confirm_password_error != '' && <Text style={styles.error}>{this.state.confirm_password_error}</Text>}



                    <Button title={'تسجيل'}
                            style={styles.btn1}
                            onPress={this.register.bind(this)}
                            textColor={colors.white}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>لديك حساب بالفعل</Text>
                    </TouchableOpacity>
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


    onChangeName(value) {
        this.setState({name: value, name_error: ''})
    }

    validateName() {
        if (this.state.name == '') {
            this.setState({name_error: '*حقل مطلوب'})
            return true
        } else {
            return false
        }
    }

    onChangePassword(value) {
        this.setState({password: value, password_error: ''})
    }

    validatePassword() {
        if (this.state.password == '') {
            this.setState({password_error: '*حقل مطلوب'})
            return true
        } else {
            return false
        }
    }

    onChangeConfirmPassword(value) {
        this.setState({confirm_password: value, confirm_password_error: ''})
    }

    validateConfirmPassword() {
        if (this.state.confirm_password == '') {
            this.setState({confirm_password_error: '*حقل مطلوب'})
            return true
        } else {
            return false
        }
    }

    register = () => {
        if(this.validateEmail()&this.validateName()&this.validatePassword()&this.validateConfirmPassword()){
            this.props.navigation.navigate('VerificationCode')

        }
    }
}