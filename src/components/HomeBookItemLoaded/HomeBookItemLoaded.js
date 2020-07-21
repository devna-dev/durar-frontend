import React, {Component} from 'react';
import styles from './styles'
import {Image, Text, TouchableOpacity, View, Linking} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import {colors} from "../../config/styles";
import AudioFile from "./AudioFile";
import {get_audio_books} from "../../services/books";

export default class HomeBookItemLoaded extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio: false,
            audio_books:[]
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.thesis){

                    }else{
                        this.props.navigation.push('Book', {lookupId: this.props.item.item.id})
                    }
                }}
                style={[styles.container, {
                    flexDirection: this.props.now || this.props.search ? 'row' : 'column',
                    width: this.props.now || this.props.search ? '96%' : 100,
                    height: this.props.now || this.props.search ? (this.props.audio ? 150 : 120) : (this.props.audio ? 210 : 181),
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
                    width: 220
                }}>
                    <Text style={styles.text1}>{this.props.item.item.title}</Text>
                    {this.props.now || this.props.search ?
                        <Text style={[styles.text2, {width: '90%'}]}>تأليف: {this.props.item.item.author.name}</Text>
                        :
                        <Text style={styles.text2}> يوسف بن عبد الله</Text>
                    }
                    {
                        this.props.now &&
                        <View style={[styles.player, {
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 220,
                            justifyContent: 'space-between'
                        }]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={[styles.view,]}>
                                    <View style={[styles.progress, {backgroundColor: colors.secondary, width:this.props.item?.item?.read_progress * 100+ '%'}]}/>
                                </View>
                                <Text style={styles.text3}> {this.props.item?.item?.read_progress?.toFixed(2) * 100}% </Text>
                            </View>
                            {this.props.item.item.has_audio &&
                            <TouchableOpacity onPress={async() => {
                                let audio_books= await get_audio_books(this.props.item.item.id)
                                this.setState({audio: !this.state.audio,audio_books})
                            }}>
                                <SvgUri uri={svg_photo.play}/>
                            </TouchableOpacity>}
                        </View>
                    }
                    {
                        this.props.search &&
                        <View style={[styles.player, {width: 220, justifyContent: 'space-between'}]}>
                            <Text style={styles.text2}>{this.props.item.item.page_count} صفحة</Text>
                            {this.props.audio ? null :
                                !this.props.type &&
                                <TouchableOpacity onPress={() => Linking.openURL(this.props.item.item.pdf)}>
                                    <Text style={[styles.text3, {textDecorationLine: 'underline'}]}>تحميل نسخه
                                        PDF</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    }
                    {this.props.type &&
                    <SvgUri uri={this.props.type == 'saved' ? svg_photo.saved : svg_photo.favourite}
                            style={{
                                position: 'absolute', zIndex: 0, marginLeft: '80%', marginTop: '5%',

                            }}/>
                    }

                    <AudioFile visible={this.state.audio}
                               onRequestClose={()=>this.setState({audio:false})}
                               audio_books={this.state.audio_books}/>
                </View>
            </TouchableOpacity>
        )
    }

}
