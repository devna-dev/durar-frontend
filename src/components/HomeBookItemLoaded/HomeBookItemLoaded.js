import React, {Component} from 'react';
import styles from './styles'
import {Image, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import {Rating, AirbnbRating} from 'react-native-ratings';

export default class HomeBookItemLoaded extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Book', { lookupId: 1})} style={[styles.container, {
                flexDirection: this.props.now || this.props.search ? 'row' : 'column',
                width: this.props.now || this.props.search ? '96%' : 100,
                height: this.props.now || this.props.search ? 120 : 181,
                marginVertical: this.props.now || this.props.search ? 5 : 0,
                backgroundColor: this.props.item.index % 2 === 0 ? colors.white : colors.grey1,
                borderWidth: 1,
                borderColor: this.props.item.index % 2 === 0 ? colors.grey1 : 'transparent',
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
                    marginHorizontal: this.props.now || this.props.search ? '5%' : 0,
                }}>
                    <Text style={styles.text1}> الفقه المالكى</Text>
                    {this.props.now || this.props.search ?
                        <Text style={styles.text2}>تأليف: أحمد خالد توفيق</Text>
                        :
                        <Text style={styles.text2}> يوسف بن عبد الله</Text>
                    }
                    {
                        this.props.now &&
                        <View style={[styles.player,{flexDirection:'row',alignItems:'center',width:220,justifyContent:'space-between'}]}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={[styles.view,]}>
                                <View style={[styles.progress, {backgroundColor: colors.secondary, width: '80%'}]}/>
                            </View>
                            <Text style={styles.text3}> 80% </Text>
                            </View>
                            <SvgUri uri={svg_photo.play}/>
                        </View>
                    }
                    {
                        this.props.search &&
                        <View style={[styles.player, {width: 220, justifyContent: 'space-between'}]}>
                            <Text style={styles.text2}>360 صفحة</Text>
                            {!this.props.type &&
                            <Text style={[styles.text3, {textDecorationLine: 'underline'}]}>تحميل نسخه PDF</Text>
                            }
                        </View>
                    }
                    {this.props.type &&
                    <SvgUri uri={this.props.type=='saved'?svg_photo.saved:svg_photo.favourite}
                            style={{
                                position: 'absolute', zIndex: 0, marginLeft: '80%', marginTop: '5%',
                            }}/>
                    }
                </View>
            </TouchableOpacity>
        )
    }

}
