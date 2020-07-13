import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, Image, Platform, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import TextInput from "../../components/TextInput/TextInput";
import {get_all_books, upload_audio_file} from "../../services/books";
import ImagePicker from "react-native-image-picker";
import common from "../../styles/common.style";


export default class UploadVoiceBook extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            upload_voice_book: false,
            book_error: false,
            choose_book: 888888888888888888888,
            books: [],
            show_books: false,
            success: false,
            book: '',
            book_name: 'إضغط لإختيار الكتاب',
            photo: ''
        };
    }

    async componentDidMount() {
        let books = await get_all_books()
        this.setState({books})
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> رفع كتاب صوتى</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}> إختر الكتاب</Text>
                    </View>
                    <View style={styles.header1}>
                        <Text style={styles.find}> رفع الملف الصوتى</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.choose_file()}
                                      style={this.state.upload_voice_book ? styles.book_view1 : styles.not_book_view1}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.upload}/>
                        <Text style={styles.book_label}>إضغط لرفع الملف الصوتى</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({show_books: !this.state.show_books})}
                                      style={[styles.book_view, {marginTop: 10}]}>

                        <Text
                            style={styles.book_label}>{ this.state.book_name } </Text>
                        <View style={styles.add}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.add}/>
                        </View>
                    </TouchableOpacity>
                    {this.state.show_books && <FlatList data={this.state.books}
                                                        renderItem={(item) => <TouchableOpacity onPress={() => {
                                                            this.setState({
                                                                choose_book: item.index,
                                                                book_name: item.item.title,
                                                                show_books:false,
                                                                book:item.item.id
                                                            })
                                                        }}
                                                                                                style={[styles.item, {
                                                                                                    borderColor: this.state.choose_book == item.index ? colors.green : colors.grey2
                                                                                                }]}>
                                                            <Text style={styles.book_label1}>{item.item.title}</Text>
                                                        </TouchableOpacity>}/>}


                    <Text style={styles.error}>*حقل مطلوب</Text>
                    <Text style={styles.label}>ملحوظات</Text>
                    <Text style={styles.book_label1}>
                        يجب أن يكون الصوت واضح وليس بطئ أو سريعا جدا
                        يجب أن يكون امتداد الملف "mp3,.mp4 or .wav."
                        يجب أن لا يزيد حجم ملف الصوت عن 20 ميجا بايت
                    </Text>
                    {this.state.success && <Text style={{
                        color: this.state.success ? colors.green1 : colors.error, ...common.RegularFont,
                        fontSize: 16,
                        alignSelf: 'center'
                    }}>{this.state.success && 'تم إرسال طلبك بنجاح'}</Text>}

                    <Button title={'رفع الملف'}
                            style={styles.btn1}
                            load={this.state.loading}
                            onPress={async () => {
                                if (this.state.book != '') {
                                    this.setState({loading:true})
                                    let upload = await upload_audio_file(this.state.book, this.state.photo)
                                    if(upload['id']){
                                        this.setState({success:true})
                                    }
                                    this.setState({loading:false})
                                } else {
                                    this.setState({book_error: true})
                                }
                            }}
                            textColor={colors.white}
                    />
                </Content>
            </Container>
        )
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

}