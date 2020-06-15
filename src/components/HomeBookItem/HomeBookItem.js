import React, {Component} from 'react';
import styles from './styles'
import {Image, Text, View} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class HomeBookItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, {
                flexDirection: this.props.now || this.props.search ? 'row' : 'column',
                width: this.props.now || this.props.search ? '100%' : 100,
                height: this.props.now || this.props.search? 100 : 181,
                marginVertical: this.props.now || this.props.search? 5 : 0
            }]}>
                <Image style={[styles.img,
                    {
                        width: this.props.now || this.props.search ? 75 : 100,
                        height: this.props.now || this.props.search ? 100 : 130,
                    }]}
                       source={{uri: 'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg'}}/>
                <View style={{
                    justifyContent: this.props.now || this.props.search ? 'flex-start' : 'center',
                    marginTop: this.props.now || this.props.search ? 15 : 0,
                    marginHorizontal:this.props.now || this.props.search ? '5%' : 0,
                }}>
                    <Text style={styles.text1}> الفقه المالكى</Text>
                    {this.props.now || this.props.search ?
                        <Text style={styles.text2}>تأليف: أحمد خالد توفيق</Text>
                        :
                        <Text style={styles.text2}> يوسف بن عبد الله</Text>
                    }
                    {
                        this.props.now &&
                        <View style={styles.player}>
                            <View style={[styles.view, ]}>
                                <View style={[styles.progress,{backgroundColor:colors.secondary,width:'80%'}]}/>
                            </View>
                            <Text style={styles.text3}>   80%  </Text>
                            <SvgUri uri={svg_photo.play}/>
                        </View>
                    }
                    {
                        this.props.search &&
                        <View style={[styles.player,{width:220,justifyContent:'space-between'}]}>
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
            </View>
        )
    }

}