import React, {Component} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import styles from './styles';
import {colors} from "../../config/styles";
import {svg_photo} from "../../assets/svg/svg";
import {SvgUri} from "react-native-svg";
import Button from "../../components/Button/Button";
import {Rating, AirbnbRating} from 'react-native-ratings';


export default class BookReview extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Modal
                propagateSwipe={true}
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                    <View style={styles.modalContainer}>
                        <View
                            style={styles.bar1}>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <SvgUri uri={svg_photo.empty_star}/>
                                <Text style={[styles.text3]}>تقييم الكتاب</Text>
                            </View>
                            <TouchableOpacity onPress={this.props.onRequestClose}>
                                <Text style={[styles.text3, {color: colors.grey3}]}>إلغاء</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginVertical:'5%'}}>
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                defaultRating={3}
                                size={28}
                            />
                        </View>
                        <View style={styles.book_view}>
                            <TextInput placeholder={'تعليق على الكتاب'}
                                // value={'ذكر'}
                                       style={styles.input}/>
                        </View>

                        <Button title={'تقييم'}
                                style={styles.btn}
                                textColor={colors.white}
                        />

                    </View>
                </View>
            </Modal>
        )
    }
}