import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {TextInput, Text, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";


export default class DonatedBook extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> التبرع بكتاب</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}> أملئ تفاصيل الكتاب</Text>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput placeholder={'إسم الكتاب'}
                            // value={'ذكر'}
                                   style={styles.input}/>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput placeholder={'إسم المؤلف'}
                            // value={'ذكر'}
                                   style={styles.input}/>
                    </View>

                    <View style={styles.book_view}>
                        <TextInput placeholder={'رابط للكتاب'}
                            // value={'ذكر'}
                                   style={styles.input}/>
                    </View>

                        <Text style={styles.find}>      رفع الكتاب</Text>

                    <View style={styles.book_view1}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.upload}/>
                        <Text style={styles.book_label}>إضغط لرفع الكتاب</Text>
                    </View>

                    <Button title={'رفع الكتاب'}
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