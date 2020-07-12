import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import EditBookReview from '../../screens/BookReview/EditBookReview';
import Swipeout from 'react-native-swipeout';
import {post_like_review} from "../../services/books";

export default class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mine: true,
            EditBookReview: false,
            user_liked: true
        };
    }

    render() {
        console.log('xxxxxxxxxxxxxxxx', this.props.item)
        return (
            <Swipeout
                style={styles.swipe}
                right={[
                    {
                        component: (
                            <TouchableOpacity onPress={() => {
                            }} style={styles.edit1}>
                                <View style={styles.edit}>
                                    <SvgUri uri={svg_photo.trash}/>
                                </View>
                            </TouchableOpacity>
                        ),
                    },
                ]}>
                <View
                    style={[
                        styles.container,
                        {
                            backgroundColor:
                                this.props.index % 2 === 0 ? colors.white : colors.grey1,
                        },
                    ]}>
                    <View style={styles.upper}>
                        <View style={styles.right}>
                            <Image
                                style={styles.img}
                                source={{uri: this.props.item.user.photo_url}}
                            />
                            <Text style={styles.text}> {this.props.item.user.name}</Text>
                        </View>
                        <View style={styles.left}>
                            <AirbnbRating
                                isDisabled
                                count={5}
                                showRating={false}
                                defaultRating={this.props.item?.rating}
                                size={12}
                            />
                        </View>
                    </View>
                    <Text style={styles.description}>{this.props.item.comment}</Text>
                    <View style={[styles.upper]}>
                        <View style={styles.right}>
                            <View style={styles.right_footer}>
                                <Text style={styles.text}>{this.props.item.likes}</Text>
                                <Text style={styles.text}>إعجاب</Text>
                            </View>
                            <TouchableOpacity onPress={async()=>{
                                let like_review= await post_like_review(this.props.item.id)
                                console.log('like_review',like_review)
                                if (like_review['id']){
                                    this.setState({user_liked:!this.state.user_liked})
                                }
                            }} style={{marginHorizontal: 5}}>
                                {this.props.item.like_id!=null ? (
                                    <SvgUri uri={svg_photo.fill_like}/>
                                ) : (
                                    <SvgUri uri={svg_photo.like}/>
                                )}
                            </TouchableOpacity>
                            {/*<SvgUri uri={svg_photo.dislike}/>*/}
                        </View>
                        <View style={styles.left}>
                            {/*/!*{this.state.mine ? (*!/*/}
                                {/*/!*<Text style={styles.description}>تعديل</Text>*!/*/}
                            {/*/!*) : (*!/*/}
                                <Text style={styles.description}>{this.props.item.creation_time}</Text>
                            {/*// )}*/}
                        </View>
                    </View>
                    <EditBookReview
                        visible={this.state.EditBookReview}
                        onRequestClose={() => this.setState({EditBookReview: false})}
                    />
                </View>
            </Swipeout>
        );
    }
}
