import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Text, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import TextInput from "../../components/TextInput/TextInput";


export default class SuggestionBooks extends Component {


    constructor(props) {
        super(props);
        this.state = {};
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
                    <View style={styles.book_view}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'إسم الكتاب'}
                                   style={styles.input}/>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'المؤلف'}
                                   style={styles.input}/>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'سنة النشر'}
                                   numeric
                                   style={styles.input}/>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'رابط للكتاب'}
                                   style={styles.input}/>
                    </View>

                    <View style={[styles.book_view, {height: 120}]}>
                        <TextInput labelStyle={styles.labelStyle}
                                   label={'إكتب رسالتك هنا'}
                                   style={styles.input}/>
                    </View>

                    <Button title={'إرسال'}
                            style={styles.btn1}
                            onPress={() => {
                            }}
                            textColor={colors.white}
                    />
                </Content>
            </Container>
        )
    }
}