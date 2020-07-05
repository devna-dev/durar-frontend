import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import Register from "../Register/Register";
import storage from '../../config/storage';


export default class Walkthrough extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: [ {
                image:'https://elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-e1464023124869.jpeg'
            },
                {
                image:'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }, {
                image:'https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg'
            },],
            sliderActiveSlide: 0,
            isLoggedIn: false,
        }
    }

    _renderItem = ({item}) => {
        console.log('item', item)
        return (
            <View style={styles.item_view}>
                <Image style={styles.item_img}
                       source={{uri:item.image}}/>
                <Text style={styles.text} selectable={true}>أكثر من 5000 كتاب مجانى</Text>
                <Text style={styles.text1}>المكتبة الشاملة هي أكبر وأشمل مكتبة كتب دينية إسلامية</Text>
            </View>
        )
    };

    onPressItem = (item) => console.log("onPressItem:item ", item);

    //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
    _keyExtractor = (item, index) => item.id;


    render() {
        return (
            <Container style={{backgroundColor: 'white'}}>
                <Content>
                    <View style={{width: '100%',}}>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={this.state.items}
                            renderItem={(item) => this._renderItem(item)}
                            sliderWidth={350}
                            itemWidth={330}
                            type="default"
                            removeClippedSubviews={false}
                            onSnapToItem={(index) => this.setState({sliderActiveSlide: index})}
                        />
                        <Pagination
                            dotsLength={this.state.items.length}
                            activeDotIndex={this.state.sliderActiveSlide}
                            //containerStyle={styles.paginationContainer}
                            dotColor={colors.grey2}
                            dotStyle={styles.dot}
                            inactiveDotStyle={styles.inactiveDotStyle}
                            inactiveDotColor={colors.grey3}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._carousel}
                            tappableDots={!!this._carousel}
                        />
                    </View>

                    <Button title={'إنشاء حساب جديد'}
                            onPress={() => this.props.navigation.navigate('Auth',{screen:'Register'})}
                            style={styles.btn}/>
                    <Button title={'تسجيل دخول'}
                            style={styles.btn1}
                            onPress={() => this.props.navigation.navigate('Auth',{screen:'Login'})}
                            textColor={colors.white}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('TabNavigator')}>
                        <Text style={styles.text2}>التصفح كضيف</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }


}
