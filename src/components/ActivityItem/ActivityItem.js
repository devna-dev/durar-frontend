import React, {Component} from 'react';
import styles from './styles'
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import {Rating, AirbnbRating} from 'react-native-ratings';
import Activity from "../../screens/Activity/Activity";
import Discussions from "../../screens/Discussions/Discussions";

export default class ActivityItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Activity', {id: this.props.item.item.id,dis:this.props.dis})
            }}
                              style={[styles.container]}>
                <ImageBackground style={[styles.img,]}
                                 imageStyle={{borderRadius: 5, resizeMode: 'cover',}}
                                 source={{uri: 'https://alkbraquran.com/wp-content/uploads/2017/03/%D9%A2%D9%A0%D9%A1%D9%A6%D9%A0%D9%A9%D9%A0%D9%A6_%D9%A1%D9%A7%D9%A0%D9%A3%D9%A4%D9%A2.jpg'}}>
                    <ImageBackground style={[styles.img1, {justifyContent: 'flex-end', alignItems: 'center'}]}
                                     imageStyle={{borderRadius: 5, resizeMode: 'cover',}}
                                     source={require('../../assets/images/shadow1.png')}>
                        <Text style={styles.text3}> {this.props.item.item.lecturer}</Text>
                    </ImageBackground>
                </ImageBackground>
                <View style={{
                    justifyContent: this.props.now || this.props.search ? 'flex-start' : 'center',
                    marginTop: this.props.now || this.props.search ? 15 : 0,
                    marginHorizontal: this.props.now || this.props.search ? '5%' : 0,
                }}>
                    <Text style={styles.text1}> {this.props.item.item.title}</Text>
                    <Text style={styles.text2}>{this.props.item.item.date}</Text>
                    {
                        this.props.now &&
                        <View style={styles.player}>
                            <View style={[styles.view,]}>
                                <View style={[styles.progress, {backgroundColor: colors.secondary, width: '80%'}]}/>
                            </View>
                            <Text style={styles.text3}> 80% </Text>
                            <SvgUri uri={svg_photo.play}/>
                        </View>
                    }
                    {
                        this.props.search &&
                        <View style={[styles.player, {width: 220, justifyContent: 'space-between'}]}>
                            <AirbnbRating
                                isDisabled
                                count={5}
                                showRating={false}
                                defaultRating={3}
                                size={20}
                            />
                            <Text style={styles.text2}>360 صفحة</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

}