import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import TextInput from "../../components/TextInput/TextInput";


export default class UploadVoiceBook extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    <Text style={styles.headerTitle}> رفع كتاب صوتى</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}> إختر الكتاب</Text>
                    </View>

                    <View style={styles.book_view}>
                        <Text style={styles.book_label}> إضغط لإختيار الكتاب</Text>
                        <View style={styles.add}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.add}/>
                        </View>
                    </View>

                    <View style={styles.header1}>
                        <Text style={styles.find}> رفع الملف الصوتى</Text>
                    </View>

                    <View style={styles.book_view1}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.upload}/>
                        <Text style={styles.book_label}>إضغط لرفع الملف الصوتى</Text>
                    </View>

                    <Text style={styles.label}>ملحوظات</Text>
                    <Text style={styles.book_label1}>
                        يجب أن يكون الصوت واضح وليس بطئ أو سريعا جدا
                        يجب أن يكون الصوت واضح وليس بطئ أو سريعا جدا
                        يجب أن يكون الصوت واضح وليس بطئ أو سريعا جدا
                    </Text>

                    <Button title={'رفع الملف'}
                            style={styles.btn1}
                            onPress={() =>{}}
                            textColor={colors.white}
                    />
                </Content>
            </Container>
        )
    }
}