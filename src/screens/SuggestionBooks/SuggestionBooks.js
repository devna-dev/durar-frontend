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
import {connect} from 'react-redux';
import {suggest} from '../../stores/saga/models/book-store/actions';

class SuggestionBooks extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            title_error: '',

            author: '',
            author_error: '',

            publish_date: '',
            publish_date_error: '',

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
                    <Text style={styles.headerTitle}> إقتراح كتاب</Text>
                </View>
                <Content style={styles.content}>
                    <View style={[styles.book_view, {
                        borderColor: this.state.title_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'إسم الكتاب'}
                                   style={[styles.input]}
                                   errors={this.state.title_error}
                                   value={this.state.title}
                                   onChangeText={(value) => this.change_name(value)}
                        />
                    </View>
                    <View style={[styles.book_view, {
                        borderColor: this.state.author_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'المؤلف'}
                                   style={styles.input}
                                   value={this.state.author}
                                   errors={this.state.author_error}
                                   onChangeText={(value) => this.change_email(value)}
                        />
                    </View>

                    <View style={[styles.book_view, {
                        borderColor: this.state.publish_date_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'سنة النشر'}
                                   numeric
                                   style={styles.input}
                                   value={this.state.publish_date}
                                   errors={this.state.publish_date_error}
                                   onChangeText={(value) => this.change_subject(value)}
                        />
                    </View>

                    <View style={[styles.book_view, {
                        height: 120,
                        borderColor: this.state.message_error != '' ? colors.red : colors.grey2,
                    }]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'رابط للكتاب'}
                                   style={styles.input}
                                   value={this.state.message}
                                   errors={this.state.message_error}
                                   onChangeText={(value) => this.change_message(value)}
                        />
                    </View>

                    {!this.props.book.load && <Text style={styles.success}>{this.props.book.message != '' ? 'تم إرسال الاقتراح بنجاح' : ''}</Text>}
                    <Button title={'إرسال'}
                            style={styles.btn1}
                            load={this.props.book.load}
                            onPress={() => this.send_message()}
                            textColor={colors.white}
                    />
                </Content>
            </Container>
        );
    }

    change_name(value) {
        this.setState({title_error: ''});
        this.setState({title: value});
    }

    change_email(value) {
        this.setState({author_error: ''});
        this.setState({author: value});
    }

    change_subject(value) {
        this.setState({publish_date_error: ''});
        this.setState({publish_date: value});
    }

    change_message(value) {
        this.setState({message_error: ''});
        this.setState({message: value});
    }

    validation_name() {
        if (this.state.title == '') {
            this.setState({title_error: '*حقل مطلوب'});
            return false;
        }
        return true;
    }

    validation_email() {
        if (this.state.author == '') {
            this.setState({author_error: '*حقل مطلوب'});
            return false;
        }
        return true;
    }

    validation_subject() {
        if (this.state.publish_date == '') {
            this.setState({publish_date_error: '*حقل مطلوب'});
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
                title: this.state.title,
                author: this.state.author,
                publish_date: this.state.publish_date,
                url: this.state.message,
            };
            this.props.suggest(form);
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
    suggest: (form) =>
        dispatch({
            type: suggest,
            form,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(SuggestionBooks);
