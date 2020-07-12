import React, { Component } from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';
import styles from "./styles";
import { colors } from "../../config/styles";
import Button from "../../components/Button/Button";
import { SvgUri } from "react-native-svg";
import svg, { svg_photo } from '../../assets/svg/svg';
import ImagePicker from 'react-native-image-picker';
import TextInput from "../../components/TextInput/TextInput";
import storage from "../../config/storage";
import { update_profile_api } from "../../services/books";
import Toast from '../../components/Toast/Toast';

export default class Settings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: '',
            name: '',
            gender: '',
            birthday: '',
            address: '',
            phone: '',
            email: '',
            photo_url: '',
            birthday_error: '',
            photo: '',
            loading: false,
        };
    }

    async componentDidMount() {
        let user = await storage.getItem('user');
        this.setState({
            user,
            name: user['name'],
            birthday: user['birthday'],
            address: user['address'],
            phone: user['phone'],
            email: user['email'],
            gender: user['gender'] === 'F' ? 'أنثى' : 'ذكر',
            photo_url: user['photo_url'],
        });
        console.log('dsssssssssssssss', user);
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.back} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> إعدادات الحساب</Text>
                </View>
                <View style={styles.toast}>
                    <Toast ref="Failed" backgroundColor="#ff190c" position="top" />
                    <Toast ref="Successfully" backgroundColor="#146632" position="top" />
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}>المعلومات الشخصيه</Text>

                        <TouchableOpacity
                            onPress={() => this.update_profile()}
                            style={styles.item_view1}>
                            <SvgUri
                                style={[styles.back_img, { paddingHorizontal: '5%' }]}
                                uri={svg_photo.edit}
                            />

                            <Text style={styles.active_item_text1}> تعديل</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.avatar_view}>
                        <TouchableOpacity
                            onPress={() => this.change_photo()}
                            style={styles.input1}>
                            <Text style={styles.label}>الصورة الشخصية</Text>
                            <Text style={styles.inputStyle}>إضغط هنا للتعديل</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: colors.grey2,
                                }}
                                source={{ uri: this.state.photo_url }}
                            />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        label={'الإسم'}
                        value={this.state.name}
                        img
                        onChangeText={(value) => this.setState({ name: value })}
                        style={styles.input}
                    />

                    <TextInput
                        label={'الجنس'}
                        value={this.state.gender}
                        img
                        onChangeText={(value) => this.setState({ gender: value })}
                        style={styles.input}
                    />

                    <TextInput
                        label={'الميلاد'}
                        value={this.state.birthday}
                        img
                        onChangeText={(value) => this.setState({ birthday: value })}
                        style={styles.input}
                    />
                    {this.state.birthday_error != '' && (
                        <Text style={styles.error}>{this.state.birthday_error}</Text>
                    )}

                    <TextInput
                        label={'المكان'}
                        value={this.state.address}
                        img
                        onChangeText={(value) => this.setState({ address: value })}
                        style={styles.input}
                    />

                    <Text style={styles.find}> معلومات الحساب</Text>
                    <View
                        style={[
                            styles.avatar_view,
                            {
                                paddingVertical: 0,
                                paddingRight: 15,
                                paddingLeft: 0,
                            },
                        ]}>
                        <TextInput
                            label={'الجوال'}
                            value={this.state.phone}
                            img
                            onChangeText={(value) => this.setState({ phone: value })}
                            borderColor={'transparent'}
                            style={[styles.input1, { width: '85%' }]}
                        />
                        <TouchableOpacity onPress={()=>this.update_profile()} style={[styles.item_view1, { width: 40 }]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.edit} />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[
                            styles.avatar_view,
                            {
                                paddingVertical: 0,
                                paddingRight: 15,
                                paddingLeft: 0,
                            },
                        ]}>
                        <TextInput
                            label={'البريد الإلكترونى'}
                            value={this.state.email}
                            img
                            onChangeText={(value) => this.setState({ email: value })}
                            borderColor={'transparent'}
                            style={[styles.input1, { width: '85%' }]}
                        />
                        <TouchableOpacity onPress={()=>this.update_profile()}
                                          style={[styles.item_view1, { width: 40 }]}>
                        <SvgUri style={styles.back_img} uri={svg_photo.edit} />
                        </TouchableOpacity>
                    </View>
                    <ActivityIndicator
                        animating={this.state.loading}
                        size="large"
                        color={colors.black}
                        style={styles.indicator}
                    />
                </Content>
            </Container>
        );
    }

    async update_profile() {
        this.setState({ loading: true });
        let update = await update_profile_api({
            photo: this.state.photo,
            email: this.state.email,
            name: this.state.name,
            gender: this.state.gender == 'ذكر' ? 'M' : 'F',
            phone: this.state.phone,
            birthday: this.state.birthday,
            address: this.state.address,
        });
        if (update['permissions']) {
            this.setState({ loading: false });
            await storage.setItem('user', update);
            this.refs.Successfully.showToast('تم تعديل البيانات بنجاح ', 8000);
        } else {
            if (update['birthday'][0]) {
                this.setState({ birthday_error: update['birthday'][0] });
            }
        }
    }

    change_photo() {
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
