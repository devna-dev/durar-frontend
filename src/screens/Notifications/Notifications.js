import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Text, View} from "react-native";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import Switch from "../../components/Switch/Switch";
import {colors} from "../../config/styles";


export default class Notifications extends Component {


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
                    <Text style={styles.headerTitle}> إعدادات الإشعارات</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}>وضع الإشعارات</Text>
                        <Switch value={true}
                                onChange={()=>{}}/>
                    </View>

                    <View style={styles.header1}>
                        <Text style={styles.find}>عند وصول أي إصدارات جديده</Text>
                        <Switch value={true}
                                onChange={()=>{}}/>
                    </View>

                    <View style={[styles.header1,{backgroundColor:colors.grey1}]}>
                        <Text style={styles.headerTitle}>عن التوصيه ببعض الكتب</Text>
                        <Switch value={false}
                                onChange={()=>{}}/>
                    </View>

                    <View style={[styles.header1,{backgroundColor:colors.grey1}]}>
                        <Text style={styles.headerTitle}>عند وصول أي إصدارات جديده</Text>
                        <Switch value={false}
                                onChange={()=>{}}/>
                    </View>

                    <View style={[styles.header1,{backgroundColor:colors.grey1}]}>
                        <Text style={styles.headerTitle}>عن التوصيه ببعض الكتب</Text>
                        <Switch value={false}
                                onChange={()=>{}}/>
                    </View>
                </Content>
            </Container>
        )
    }
}