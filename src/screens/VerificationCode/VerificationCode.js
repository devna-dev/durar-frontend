import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Register from "../Register/Register";
import {svg_photo} from "../../assets/svg/svg";
import {SvgUri} from "react-native-svg";



export default class VerificationCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            code_error: ''
        };
    }


    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>كود التفعيل</Text>
                    <View style={styles.back_img}/>
                </View>
                <Content style={styles.content}>

                    <OTPInputView style={{width: '80%', height: 55, alignSelf: 'center'}}
                                  pinCount={5}
                                  code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                  onCodeChanged={code => this.onChangeCode(code)}
                                  autoFocusOnLoad
                                  codeInputFieldStyle={[styles.underlineStyleBase,{
                                      borderColor: this.state.code_error != '' ? colors.error : colors.border,
                                      borderWidth: this.state.code_error != '' ? 2 : 1
                                  }]}
                        // onCodeFilled={(code => this.onChangeCode(code))}
                    />
                    {this.state.code_error != '' && <Text style={styles.error}>{this.state.code_error}</Text>}

                    <Button title={'تأكيد'}
                            style={styles.btn1}
                            textColor={colors.white}
                            onPress={this.verifyCode.bind(this)}
                    />
                    <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>لم تصل إليك رساله التفعيل؟</Text>

                </Content>
            </Container>
        )
    }

    onChangeCode(code) {
        this.setState({code: code, code_error: ''})
    }

    validateCode() {
        if (this.state.code == '') {
            this.setState({code_error: '*أدخل الرمز'})
            return true
        } else {
            return false
        }
    }

    verifyCode = () => {
        if (!this.validateCode()) {
            //this.props.navigation.navigate('Login')

        }
    }

}