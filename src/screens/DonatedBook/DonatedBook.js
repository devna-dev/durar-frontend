import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';
import {SvgUri} from 'react-native-svg';
import svg, {svg_photo} from '../../assets/svg/svg';
import VerificationCode from '../VerificationCode/VerificationCode';
import TextInput from '../../components/TextInput/TextInput';
import {clear, loading, support} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import {donate} from '../../stores/saga/models/book-store/actions';
import {donate_to_api} from "../../services/books";
import common from "../../styles/common.style";


class DonatedBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            load: false,
            success: false,

            title: '',
            title_error: '',

            author: '',
            author_error: '',

            publish_date: '',
            publish_date_error: '',

            message: '',
            message_error: '',
            upload_voice_book: false,
            photo:''
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
                    <Text style={styles.headerTitle}> التبرع بكتاب</Text>
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
                    {/*<TouchableOpacity onPress={() => this.choose_file()}*/}
                                      {/*style={this.state.upload_voice_book ? styles.book_view11 : styles.not_book_view1}>*/}
                        {/*<SvgUri style={styles.back_img}*/}
                                {/*uri={svg_photo.upload}/>*/}
                        {/*<Text style={styles.book_label}>إضغط لرفع الملف الصوتى</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {this.state.success && <Text style={{
                        color: this.state.success ? colors.green1 : colors.error, ...common.RegularFont,
                        fontSize: 16,
                        alignSelf: 'center'
                    }}>{this.state.success && 'تم إرسال طلبك بنجاح'}</Text>}

                    <Button title={'إرسال'}
                            style={styles.btn1}
                            load={this.state.load}
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



    choose_file() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response;

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    photo_url: source.uri,
                    upload_voice_book: true,
                    photo: {
                        name: source.fileName,
                        type: source.type,
                        uri:
                            Platform.OS === 'android'
                                ? source.uri
                                : source.uri.replace('file://', ''),
                    },
                });
            }
        });
    }


    async send_message() {
        this.setState({load: true})
        if (this.validation_name() & this.validation_email() & this.validation_subject() & this.validation_message()) {
            let form = {
                title: this.state.title,
                author: this.state.author,
                publish_date: this.state.publish_date,
                url: this.state.message,
            };
            let donate = await donate_to_api(form)
            if(donate['author']){
                this.setState({success: true})
            } else {
                this.setState({message_error: donate['url']})
            }
            this.setState({load: false})
        }

    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),
    donate: (form) =>
        donate({
            type: donate,
            form,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(DonatedBook);
