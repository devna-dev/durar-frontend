import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import {SvgUri} from "react-native-svg";
import svg, {svg_photo} from '../../assets/svg/svg'
import VerificationCode from "../VerificationCode/VerificationCode";
import TextInput from "../../components/TextInput/TextInput";


export default class Settings extends Component {


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
                    <Text style={styles.headerTitle}> إعدادات الحساب</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}>المعلومات الشخصيه</Text>
                        <View style={styles.item_view1}>
                            <SvgUri style={[styles.back_img,{paddingHorizontal: '5%',}]}
                                    uri={svg_photo.edit}/>
                            <Text style={styles.active_item_text1}> تعديل</Text>
                        </View>
                    </View>

                    <View style={styles.avatar_view}>
                        <View style={styles.input1}>
                            <Text style={styles.label}>الصورة الشخصية</Text>
                            <Text style={styles.inputStyle}>إضغط هنا للتعديل</Text>
                        </View>
                        <Image source={require('../../assets/images/avatar.png')}/>
                    </View>

                    <TextInput label={'الإسم'}
                               value={'فاطمة الرباعي'}
                               img
                               style={styles.input}/>

                    <TextInput label={'الجنس'}
                               value={'ذكر'}
                               img
                               style={styles.input}/>

                    <TextInput label={'الميلاد'}
                               value={'12/01/1994'}
                               img
                               style={styles.input}/>

                    <TextInput label={'المكان'}
                               value={'ألمانيا'}
                               img
                               style={styles.input}/>

                    <Text style={styles.find}>       معلومات الحساب</Text>
                    <View style={[styles.avatar_view,{paddingVertical: 0,
                        paddingRight: 15,
                        paddingLeft:0}]}>
                        <TextInput label={'الجوال'}
                                   value={'+00000000000000'}
                                   img
                                   borderColor={'transparent'}
                                   style={[styles.input1,{width:'85%'}]}/>
                        <View style={[styles.item_view1,{width:40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.edit}/>
                        </View>

                    </View>

                    <View style={[styles.avatar_view,{paddingVertical: 0,
                        paddingRight: 15,
                        paddingLeft:0}]}>
                        <TextInput label={'البريد الإلكترونى'}
                                   value={'Admin@mail.com'}
                                   img
                                   borderColor={'transparent'}
                                   style={[styles.input1,{width:'85%'}]}/>
                        <View style={[styles.item_view1,{width:40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.edit}/>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }
}