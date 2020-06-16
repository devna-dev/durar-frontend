import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import {colors} from "../../config/styles";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import Button from "../../components/Button/Button";
import CurrentReadings from "../CurrentReadings/CurrentReadings";
import SearchFilters from "../SearchFilters/SearchFilters";
import Sort from "../Sort/Sort";
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";
import AddNotes from "../AddNotes/AddNotes";

export default class Activity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
            note: false,
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: '5%'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({note: true})}>
                            <Button title={'الدروس العلمية'}
                                    style={styles.btn}
                                    textStyle={styles.text}/>
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.cover_img}
                           source={{uri: 'https://www.hiamag.com/sites/default/files/styles/ph2_960_600/public/article/07/03/2019/7841791-1090336005.jpg'}}/>
                    <Text style={styles.item_text}>معجزات قرآنية5 ،
                        الإعجاز في خلق الإنسان</Text>
                    <View style={styles.header1}>
                        <View style={[styles.item_view, {}]}>
                            <Text style={styles.active_item_text}>الدكتور محمد راتب النابلسي</Text>
                        </View>
                        <View style={[styles.item_view, {}]}>
                            <Text style={styles.active_item_text}>المدة:3ساعات</Text>
                        </View>
                    </View>
                    <Text style={[styles.active_item_text1,]}>سيدي الكريم القرآن الكريم ذكّر الإنسان في خلقه في كثير من
                        آياته، وشرح له كيف خُلق، وكيف جهزه الله سبحانه وتعالى بملكات واستعدادات خاصة، ميزه فيها عن سائر
                        المخلوقات الأخرى، يقول عز وجل في كتابه الكريم:
                        ﴿ هَلْ أَتَى عَلَى الْإِنْسَانِ حِينٌ مِنَ الدَّهْرِ لَمْ يَكُنْ شَيْئاً مَذْكُوراً * إِنَّا
                        خَلَقْنَا الْإِنْسَانَ مِنْ نُطْفَةٍ أَمْشَاجٍ نَبْتَلِيهِ فَجَعَلْنَاهُ سَمِيعاً بَصِيراً
                        *إِنَّا هَدَيْنَاهُ السَّبِيلَ إِمَّا شَاكِراً وَإِمَّا كَفُوراً ﴾</Text>

                    <ImageBackground source={require('../../assets/images/time_date_back.png')}
                                     style={styles.header}>
                        <View style={{width: '60%'}}>
                            <Text style={[styles.active_item_text, {height: 20, marginTop: 5}]}>الثلاثاء</Text>
                            <Text style={[styles.item_text, {marginVertical: 0}]}>12مايو</Text>
                        </View>
                        <View>
                            <Text style={[styles.active_item_text, {height: 20, marginTop: 5}]}>الساعة</Text>
                            <Text style={[styles.item_text, {marginVertical: 0}]}>5 مساءاً</Text>
                        </View>
                    </ImageBackground>
                    <Button title={'تسجيل'}
                            style={styles.btn1}/>

                </Content>
            </Container>
        )
    }

}