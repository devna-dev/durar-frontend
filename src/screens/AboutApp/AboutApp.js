import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import Switch from "../../components/Switch/Switch";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";


export default class AboutApp extends Component {


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
                    <Text style={styles.headerTitle}> عن التطبيق</Text>
                </View>
                <Content style={styles.content}>
                    <Image style={styles.logo} source={require('../../assets/images/Screenshot_3.png')}/>
                    <Text style={styles.find}>تطبيق الشامله</Text>
                    <Text style={styles.headerTitle1}>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
                        سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.</Text>

                </Content>
                <Button title={'الشروط والأحكام'}
                        style={styles.btn1}
                        onPress={() => {
                            this.props.navigation.navigate('TermsAndConditions')
                        }}
                        textColor={colors.white}
                />
                <Button title={'سياسة الخصوصية'}
                        style={styles.btn1}
                        onPress={() => {
                            this.props.navigation.navigate('PrivacyPolicy')
                        }}
                        textColor={colors.white}
                />
            </Container>
        )
    }
}