import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import styles from "./styles";
import {svg_photo} from "../../assets/svg/svg";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";
import NotificationListItem from "../../components/NotificationListItem/NotificationListItem";


export default class NotificationsList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <View style={[styles.headerItemView, {flexDirection: 'row'}]}>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                          style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.active_bell}/>
                        </TouchableOpacity>
                        <Image source={require('../../assets/images/avatar.png')}/>
                    </View>
                </View>
                <Content>
                    <FlatList data={[{key:1}, {key:2}, {key:3},{key:1}, {key:2}, {key:3},{key:1}, {key:2}, {key:3}, {key:1},]}
                              style={{alignSelf:'center'}}
                              renderItem={(item) => <NotificationListItem item={item}/>}/>


                </Content>
            </Container>
        )
    }

}