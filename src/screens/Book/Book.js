import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import styles from "./styles";
import {svg_photo} from "../../assets/svg/svg";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";
import {Rating, AirbnbRating} from 'react-native-ratings';
import BookItem from "../../components/BookItem/BookItem";
import Button from "../../components/Button/Button";
import {colors} from "../../config/styles";
import BookReview from "../BookReview/BookReview";
import EditBookReview from "../BookReview/EditBookReview";


export default class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book_review: false,
            EditBookReview: false,
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <View style={[styles.headerItemView, {flexDirection: 'row'}]}>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                          style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.favourite_book}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                          style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.book_menu}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Content>
                    <View style={styles.upper}>
                        <Image style={styles.book}
                               source={{uri: 'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg'}}/>
                        <View style={styles.book}>
                            <Text style={styles.light_font}>عدد الصفحات</Text>
                            <Text style={styles.dark_font}>300</Text>
                            <Text style={styles.light_font}>القسم</Text>
                            <Text style={styles.dark_font1}>التاريخ الإسلامى</Text>
                            <Text style={styles.light_font}>التقييم</Text>
                            <View style={{alignSelf: 'flex-start'}}>
                                <AirbnbRating
                                    isDisabled
                                    count={5}
                                    showRating={false}
                                    defaultRating={3}
                                    size={14}
                                />
                            </View>
                            <Text style={styles.light_font}>من 700 تقييم</Text>
                        </View>
                    </View>

                    <View style={styles.address_view}>
                        <View>
                            <Text style={[styles.light_font, {height: 20}]}>جلال الدين السيوطى</Text>
                            <Text style={styles.dark_font2}>تاريخ الخلفاء</Text>
                        </View>
                        <View style={styles.leftHeader}>
                            <View style={[styles.headerItemView, {flexDirection: 'row'}]}>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                              style={[styles.headerItemView, {width: 40}]}>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.favourite_book}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                              style={[styles.headerItemView, {width: 40}]}>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.book_menu}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.description}>هو كتاب يختص في طبقة معينة وهم الخلفاء من بداية عهد الخلفاء
                        الراشدين إلى نهاية عهد الخلافة العباسية، حيث يترجم للخلفاء ترجمة موسعة ويذكر بداية خلافة كل منهم
                        وأعماله وآثاره في أيام خلافته و أهم الأعلام الذين توفوا في زمانه والولايات الإسلامية ثم يذكر
                        تاريخ وفاته ومدفنه وقد توسع في الخلفاء الراشدين</Text>
                    <View style={styles.bar}>
                        <Text style={styles.headerTitle}>التقييمات</Text>
                        <Text style={styles.headerTitle1}>عرض المزيد</Text>
                    </View>
                    <FlatList data={[{}, {}]}
                              renderItem={(item) => <BookItem item={item}/>}/>
                    <Button title={'تقييم الكتاب'}
                            onPress={() => this.setState({book_review: true})}
                            textColor={colors.white}
                            style={[styles.btn, {backgroundColor: colors.primary}]}/>
                    <View style={styles.bar}>
                        <Text style={styles.headerTitle}>المستخدمون يقرأون أيضا</Text>
                        <Text style={styles.headerTitle1}>عرض المزيد</Text>
                    </View>
                    <FlatList data={[{}, {}, {}, {}, {}, {},]}
                              horizontal
                              renderItem={(item) => <Image style={styles.img}
                                                           source={{uri: 'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg'}}/>}
                    />
                    <Button title={'قراءة الكتاب'}
                            style={styles.btn}/>

                </Content>
                <BookReview visible={this.state.book_review}
                            onRequestClose={() => this.setState({book_review: false})}/>

            </Container>
        )
    }

}