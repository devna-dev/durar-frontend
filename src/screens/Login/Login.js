import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';
import RecoverPassword from '../RecoverPassword/RecoverPassword';
import {svg_photo} from '../../assets/svg/svg';
import {SvgUri} from 'react-native-svg';
import {login, clear, loading} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import Toast from '../../components/Toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.login = this.login.bind(this);
    this.toast = React.createRef();
}

  componentDidMount() {
    this.props.clear();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{alignItems: 'center'}}>
            <Toast ref={this.toast} backgroundColor={'#000000'} />
          </View>
          <Image
            style={styles.logo}
            source={require('../../assets/images/Screenshot_3.png')}
          />
          <Text style={styles.address}>الشاملة</Text>
          <Text style={styles.title}>تسجيل الدخول</Text>
          <TextInput placeholder={'البريد الالكتروني'}
            value={this.state.email}
            onChangeText={(value) => this.onChangeEmail(value)}
            style={[
              styles.input,
              {
                borderColor:
                  (this.getLogErrorProp('email_error') != '' ||
                  this.state.email_error != '')
                    ? colors.error
                    : colors.border,
                borderWidth:
                  (this.getLogErrorProp('email_error') != '' ||
                  this.state.email_error != '')
                    ? 2
                    : 1,
              }]}
          />
            {(this.getLogErrorProp('email_error') != '' || this.state.email_error != '') &&
            <Text style={styles.error}>{this.getLogErrorProp('email_error') || this.state.email_error}</Text>}
            <View style={[styles.view, {
                borderColor: (this.getLogErrorProp('password_error') != '' || this.state.password_error != '') ? colors.error : colors.border,
                borderWidth: (this.getLogErrorProp('password_error') != '' || this.state.password_error != '') ? 2 : 1,
            }]}>
                <TextInput placeholder={'كلمة المرور'}
                           value={this.state.password}
                           secureTextEntry={this.state.secureTextEntry}
                           onChangeText={(value) => this.onChangePassword(value)}
                           style={[styles.input1]}/>
                <TouchableOpacity style={styles.eye}
                                  onPress={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}>
                    <SvgUri uri={svg_photo.eye}/>
                </TouchableOpacity>
            </View>
            {(this.getLogErrorProp('password_error') != '' || this.state.password_error != '') &&
            <Text style={styles.error}>{this.getLogErrorProp('password_error') || this.state.password_error}</Text>}
            {this.getLogErrorProp('non_field_errors') != '' &&
            <Text style={styles.error}>{this.getLogErrorProp('non_field_errors')}</Text>}
            <Button title={'تسجيل دخول'}
                    style={styles.btn1}
                    load={this.props.user.load}
                    onPress={this.login.bind(this)}
                    textColor={colors.white}
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RecoverPassword')}>
                <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>نسيت كلمة المرور</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.text2}>إذا كنت مستخدم جديد</Text>
            </TouchableOpacity>
            <Button title={'إنشاء حساب جديد'}
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={styles.btn}/>


        </Content>
      </Container>
    );
  }
    get initialState() {
        return{
            email: '',
            email_error: '',
            password: '',
            password_error: '',
            non_field_errors: '',
            secureTextEntry: true,
        };
    }
  componentDidUpdate(prevProps) {
    if (!!this.getLogErrorProp('network_error')) {
      this.toast.current.showToast(this.getLogErrorProp('network_error'));
      this.props.clear();
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

    onChangePassword(value) {
        this.setState({password: value, password_error: ''});
    }

    validatePassword() {
        if (this.state.password == '') {
            this.setState({password_error: '*حقل مطلوب'});
            return false;
        } else {
            return true;
        }
    }

    login = () => {
        if (this.validateEmail() & this.validatePassword()) {
            let form = {
                email: this.state.email,
                password: this.state.password,
            };
            this.props.login(form);
            if (this.props.user.allow_navigate) {
                this.props.navigation.navigate('TabNavigator');
            }
        }
    };
    getLogErrorProp = (key) => {
        return !!this.props.user &&
        !!this.props.user.login_errors &&
        !!this.props.user?.login_errors[key]
            ? this.props.user.login_errors[key][0]
            : '';
    };
}

const mapStateToProps = (state) => {
    console.log('State for error', state);
    console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),
    login: (form) => dispatch({
        type: login,
        form,
    }),
    loading: (form) => dispatch({
        type: loading,
        form,
    }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
