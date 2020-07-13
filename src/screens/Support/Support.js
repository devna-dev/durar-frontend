import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';
import {SvgUri} from 'react-native-svg';
import svg, {svg_photo} from '../../assets/svg/svg';
import VerificationCode from '../VerificationCode/VerificationCode';
import TextInput from '../../components/TextInput/TextInput';
import {clear, loading, support} from '../../stores/saga/models/user-store/actions';
import {get_current_read, get_popular_books} from '../../stores/saga/models/book-store/actions';
import {connect} from 'react-redux';

class Support extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            name_error: '',

            email: '',
            email_error: '',

            subject: '',
            subject_error: '',

            message: '',
            message_error: '',
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
                    <Text style={styles.headerTitle}> الدعم الفنى</Text>
                </View>
                <Content style={styles.content}>
                    <View style={[styles.book_view, {
                        borderColor: this.state.name_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'إسم الكتاب'}
                                   style={[styles.input]}
                                   errors={this.state.name_error}
                                   value={this.state.name}
                                   onChangeText={(value) => this.change_name(value)}
                        />
                    </View>

                    <View style={[styles.book_view, {
                        borderColor: this.state.email_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'البريد الالكتروني'}
                                   style={styles.input}
                                   value={this.state.email}
                                   errors={this.state.email_error}
                                   onChangeText={(value) => this.change_email(value)}
                        />
                    </View>

                    <View style={[styles.book_view, {
                        borderColor: this.state.subject_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'عنوان الموضوع'}
                                   style={styles.input}
                                   value={this.state.subject}
                                   errors={this.state.subject_error}
                                   onChangeText={(value) => this.change_subject(value)}
                        />
                    </View>

                    <View style={[styles.book_view, {
                        height: 120,
                        borderColor: this.state.message_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'إكتب رسالتك هنا'}
                                   style={styles.input}
                                   value={this.state.message}
                                   errors={this.state.message_error}
                                   onChangeText={(value) => this.change_message(value)}
                        />
                    </View>

                    <Text style={[styles.input, {
                        color: colors.green1,
                        textAlign: 'center',
                    }]}>{this.props.user.message&&this.props.user.message.creation_time ? 'تم إرسال الرسالة بنجاح':''}</Text>

                    <Button title={'إرسال'}
                            style={styles.btn1}
                            load={this.props.user.load}
                            onPress={() => this.send_message()}
                            textColor={colors.white}
                    />

                </Content>
            </Container>
        );
    }


    change_name(value) {
        this.setState({name_error: ''});
        this.setState({name: value});
    }

    change_email(value) {
        this.setState({email_error: ''});
        this.setState({email: value});
    }

    change_subject(value) {
        this.setState({subject_error: ''});
        this.setState({subject: value});
    }

    change_message(value) {
        this.setState({message_error: ''});
        this.setState({message: value});
    }

    validation_name() {
        if (this.state.name == '') {
            this.setState({name_error: '*حقل مطلوب'});
            return false;
        }
        return true;
    }

    validation_email() {
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

    validation_subject() {
        if (this.state.subject == '') {
            this.setState({subject_error: '*حقل مطلوب'});
            return false;
        }
        return true;
    }

    validation_message() {
        if (this.state.message == '') {
            this.setState({message_error: '*حقل مطلوب'});
            return false;
        }
        return true;
    }

    send_message() {

        if (this.validation_name() & this.validation_email() & this.validation_subject() & this.validation_message()) {
            let form = {
                name: this.state.name,
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message,
            };
            this.props.support(form);
        }

    }

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
    support: (form) =>
        dispatch({
            type: support,
            form,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Support);
