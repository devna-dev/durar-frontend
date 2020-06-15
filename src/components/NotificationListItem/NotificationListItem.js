import React, {Component} from 'react';
import {FlatList, Image, Text, View} from "react-native";
import {svg_photo} from "../../assets/svg/svg";
import styles from "./styles";
import {SvgUri} from "react-native-svg";


export default class NotificationListItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.item.item['key'] == 1) {
            return (
                <View style={styles.container_key1}>
                    <Image source={require('../../assets/images/avatar.png')}/>
                    <Text numberOfLines={2} style={{width:'90%',marginLeft:'5%'}}> قام أحمد بالإعجاب بتعليقك على كتاب تاريخ إبن خلدون</Text>
                </View>
            )
        }else  if (this.props.item.item['key'] == 2) {
            return (
                <View style={styles.container_key1}>
                    <Image style={styles.img} source={{uri:'https://icons-for-free.com/iconfiles/png/512/edit+gear+options+preferences+setting+settings+icon-1320166551296108865.png'}}/>
                    <Text numberOfLines={2} style={{width:'90%',marginLeft:'5%'}}> تم تغيير كلمة المرور بنجاح</Text>
                </View>
            )
        }else{
            return (
                <View style={styles.container_key2}>
                <View style={styles.container_key2_upper}>
                    <Image style={styles.img} source={{uri:'https://cdn0.iconfinder.com/data/icons/zlico-education-1-lineal-color/64/Open_Book_1-512.png'}}/>
                    <Text numberOfLines={2} style={{width:'90%',marginLeft:'5%'}}>نرشح لك 5 كتب في قسم الفقه</Text>
                </View>
                    <View style={styles.container_key2_lawer}>
                    <FlatList data={[{key:1}, {key:2}, {key:3},{key:1}, {key:2}, ]}
                              keyExtractor={(item, index) => item.key}
                              horizontal
                              renderItem={(item) => <Image style={styles.img_key_2} source={{uri:'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg'}}/>}
                    />
                    </View>
                </View>
            )
        }

    }

}