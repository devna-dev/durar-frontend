import React, {Component} from 'react';
import {Image, ImageBackground, Text, View} from "react-native";
import styles from './styles'
import {Rating, AirbnbRating} from 'react-native-ratings';

export default class ProfileItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.item['key'] == 'fav') {
            return (
                <ImageBackground source={require('../../assets/images/favourite.png')} style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.address_view}>
                            <Text style={styles.address_text}>مقدمة ابن خدلون</Text>
                            <Text style={styles.date_text}>20/10/2020</Text>
                        </View>
                        <View style={styles.review}>
                            <AirbnbRating
                                isDisabled
                                count={5}
                                showRating={false}
                                defaultRating={3}
                                size={12}
                            />
                        </View>
                        <Text numberOfLines={5} style={styles.description}>إن النتيجة التي توصل إليها ابن خلدون في الفصل الثاني من مقدمته
                            عند بحثه للعمران البدوي وهي:(إن اختلاف الأجيال في أحوالهم انما هو باختلاف نحلهم من المعاش)
                            قادته بالضرورة إلى دراسة عدة مقولات اقتصادية تعتبر حجر الزاوية في علم الاقتصاد الحديث</Text>
                    </View>
                </ImageBackground>
            )
        } else {
            return (
                <ImageBackground source={require('../../assets/images/saved.png')} style={styles.container1}>
                    <View style={styles.content}>
                        <View style={styles.address_view}>
                            <Text style={styles.address_text}>الكامل في التاريخ</Text>
                            <Text style={styles.date_text}>20/10/2020</Text>
                        </View>
                        <Image style={styles.img} source={{uri: 'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg'}}/>
                    </View>
                </ImageBackground>
            )
        }

    }

}