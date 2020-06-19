import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {colors} from "../../config/styles";
import {Rating, AirbnbRating} from 'react-native-ratings';
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../../assets/svg/svg";
import EditBookReview from "../../screens/BookReview/EditBookReview";
import Swipeout from 'react-native-swipeout';


export default class BookItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mine: true,
            EditBookReview: false
        }
    }

    render() {

        return (
            <Swipeout style={styles.swipe}
                      right={[{
                          component: (
                              <TouchableOpacity onPress={()=>{}}
                                                style={styles.edit1}>
                                  <View style={styles.edit}>
                                  <SvgUri uri={svg_photo.trash}/>
                                  </View>
                              </TouchableOpacity>

                          ),
                      }]}
            >

            <View
                style={[styles.container, {backgroundColor: this.props.item.index % 2 === 0 ? colors.white : colors.grey1,}]}>
                <View style={styles.upper}>
                    <View style={styles.right}>
                        <Image style={styles.img} source={require('../../assets/images/avatar.png')}/>
                        <Text style={styles.text}> عيسى النونو</Text>
                    </View>
                    <View style={styles.left}>
                        <AirbnbRating
                            isDisabled
                            count={5}
                            showRating={false}
                            defaultRating={3}
                            size={12}
                        />
                    </View>
                </View>
                <Text style={styles.description}>أجمل كتاب قرأته بالتاريخ، مختصر وممتع، يسرد به السيوطي التاريخ الإسلامي
                    بشكل أدبي وقصصي أكثر من
                    كونه تاريخ سياسي</Text>
                <View style={[styles.upper]}>
                    <View style={styles.right}>
                        <View style={styles.right_footer}>
                            <Text style={styles.text}>2</Text>
                            <Text style={styles.text}>إعجاب</Text>
                        </View>
                        <View style={{marginHorizontal: 5}}>
                            {true ? <SvgUri uri={svg_photo.like}/> :
                                <SvgUri uri={svg_photo.fill_like}/>}
                        </View>
                        <SvgUri uri={svg_photo.dislike}/>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({EditBookReview: true})} style={styles.left}>
                        {this.state.mine ? <Text style={styles.description}>تعديل</Text> :
                            <Text style={styles.description}>20/04/29</Text>}
                    </TouchableOpacity>
                </View>
                <EditBookReview visible={this.state.EditBookReview}
                                onRequestClose={() => this.setState({EditBookReview: false})}/>
            </View>
            </Swipeout>
        )
    }

}