import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';
import {SvgUri} from 'react-native-svg';
import svg, {svg_photo} from '../../assets/svg/svg';
import RecoverVerificationCode from '../RecoverVerificationCode/RecoverVerificationCode';
import {clear, reset, loading} from '../../stores/saga/models/user-store/actions';
import Toast from '../../components/Toast/Toast';
import {connect} from 'react-redux';


class RecoverPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            email_error: '',
        };
        props.clear();
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
                <View style={styles.toast}>
                    <Toast ref="Successfully" backgroundColor="#146632" position="top" />
                </View>
                <Content style={styles.content}>
                    <View style={styles.view}>
                        <TextInput placeholder={'البريد الالكتروني'}
                                   value={this.state.email}
                                   onChangeText={(value) => this.onChangeEmail(value)}
                                   style={[styles.input, {
                                       borderColor: this.props.user.detail != '' || this.state.email_error != '' ? colors.error : colors.border,
                                       borderWidth: this.props.user.detail != '' || this.state.email_error != ''? 2 : 1,
                                   }]}/>
                    </View>
                    {this.props.user.detail != '' || this.state.email_error != ''&& <Text style={styles.error}>{this.props.user.details||this.state.email_error}</Text>}
                    {this.props.user.details != ''&& <Text style={styles.success}>{this.props.user.details}</Text>}

                    <Button title={'إستعادة كلمة المرور'}
                            style={styles.btn1}
                            load={this.props.user.load}
                            onPress={this.recover.bind(this)}
                            textColor={colors.white}
                    />

                </Content>
            </Container>
        );
    }
    componentDidUpdate(prevProps) {
        const isPasswordReset = this.props.user.detail === 'Password reset e-mail has been sent.';
        if (isPasswordReset) {
            this.props.clear();
            this.refs.Successfully.showToast('تم ارسال ايميل لاعادة تعيين كلمة المرور ', 2000);
            setTimeout(() => {
                this.props.navigation.goBack();
                
            }, 2000);
            
            //this.props.navigation.navigate('RecoverVerificationCode');
        }
    }
    onChangeEmail(value) {
        this.setState({email: value, email_error: ''});
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

            //this.props.navigation.navigate('RecoverVerificationCode')
            let form = {
                email: this.state.email,
            };
            this.props.forget(form);

        }
    };
}


const mapStateToProps = (state) => {
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),
    forget: (form) => dispatch({
        type: reset,
        form,
    }),
    loading: (form) => dispatch({
        type: loading,
        form,
    }),
});


export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
