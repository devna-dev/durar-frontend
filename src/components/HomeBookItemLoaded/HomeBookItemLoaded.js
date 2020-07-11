import React, {Component} from 'react';
import styles from './styles'
import {Image, Text, TouchableOpacity, View, Linking} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import {Rating, AirbnbRating} from 'react-native-ratings';
import Sound from "react-native-sound";

export default class HomeBookItemLoaded extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Book', { lookupId: this.props.item.item.id})} style={[styles.container, {
                flexDirection: this.props.now || this.props.search ? 'row' : 'column',
                width: this.props.now || this.props.search ? '96%' : 180,
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
                       source={{uri: this.props.item.item.cover_image}}/>
                <View style={{
                    justifyContent: this.props.now || this.props.search ? 'flex-start' : 'center',
                    marginTop: this.props.now || this.props.search ? 15 : 0,
                    marginHorizontal: this.props.now || this.props.search ? '5%' : 0,
                    width:220
                }}>
                    <Text style={styles.text1}>{this.props.item.item.title}</Text>
                    {this.props.now || this.props.search ?
                        <Text style={[styles.text2,{width:'90%'}]}>تأليف: {this.props.item.item.author.name}</Text>
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
                            <Text style={styles.text2}>{this.props.item.item.page_count} صفحة</Text>
                            {this.props.audio?null:
                                !this.props.type &&
                                <TouchableOpacity onPress={()=>Linking.openURL(this.props.item.item.pdf)}>
                            <Text style={[styles.text3, {textDecorationLine: 'underline'}]}>تحميل نسخه PDF</Text>
                                </TouchableOpacity>
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
                    <View style={{
                        flexDirection:'row',
                        width:170,
                        justifyContent:'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({play: !this.state.play})
                                Sound.setCategory('Playback');
                                this.whoosh.play(success=>{
                                    alert('success')
                                })
                                // this.whoosh = new Sound(this.state.url, Sound.MAIN_BUNDLE, (error) => {
                                //     if (!this.state.play) {
                                //         this.whoosh.release()
                                //         this.setState({play: false})
                                //         this.url = null
                                //     } else {
                                //        // alert(this.state.play)
                                //         if (error) {
                                //             console.log('failed to load the sound', error);
                                //             return;
                                //         }
                                //
                                //         this.whoosh.play((success) => {
                                //             if (success) {
                                //                 this.setState({play: true})
                                //                 console.log('successfully finished playing');
                                //             } else {
                                //                 console.log('playback failed due to audio decoding errors');
                                //             }
                                //         });
                                //     }
                                // });

                                //this.whoosh.release();
                            }}
                            style={styles.headerItem}>
                            <SvgUri uri={svg_photo.read_paly}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                                this.whoosh.pause(()=>{
                                    alert('pause')
                                });
                                // this.whoosh.stop(() => {
                                // });
                            }}
                            style={styles.headerItem}>
                            <SvgUri uri={svg_photo.pause}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                // this.whoosh.pause(()=>{
                                //     alert('pause')
                                // });
                                this.whoosh.stop(() => {
                                });
                            }}
                            style={styles.headerItem}>
                            <SvgUri uri={svg_photo.pause}/>
                        </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

}
