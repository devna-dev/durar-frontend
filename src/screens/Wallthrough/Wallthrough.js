import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from "./styles";
import {colors} from "../../config/styles";
import Button from "../../components/Button/Button";
import Register from "../Register/Register";

export default class Walkthrough extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: [{}, {}, {}, {}, {}, {}, {}, {},],
            sliderActiveSlide: 0
        }
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.item_view}>
                <Image style={styles.item_img}
                       source={{uri: 'data:image/jpeg;base64,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'}}
                />
                <Text style={styles.text} selectable={true}>أكثر من 5000 كتاب مجانى</Text>
                <Text style={styles.text1}>هو ببساطة نص شكلي ويُستخدم في صناعات المطابع ودور النشر</Text>
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
                            onPress={() => this.props.navigation.navigate('Register')}
                            style={styles.btn}/>
                    <Button title={'تسجيل دخول'}
                            style={styles.btn1}
                            onPress={() => this.props.navigation.navigate('Login')}
                            textColor={colors.white}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('TabNavigator')}>
                        <Text style={styles.text2}>التصفح كضيف</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }

}