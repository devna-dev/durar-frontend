import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {
    FlatList,
    Dimensions,
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator, RefreshControl,
} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import {colors} from "../../config/styles";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import Button from "../../components/Button/Button";
import CurrentReadings from "../CurrentReadings/CurrentReadings";
import NotificationsList from "../NotificationsList/NotificationsList";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import Thesis from "../Thesis/Thesis";
import {get_activities} from "../../stores/saga/models/book-store/actions";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {connect} from "react-redux";

class Activities extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [{}, {}, {}, {}, {}, {}, {}, {},],
            sliderActiveSlide: 0,
            readable: false,
            loading: false
        }
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            this.props.get_activities()
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.item_view}>
                <View style={styles.right_side}/>
                <ImageBackground style={styles.item_img}
                                 imageStyle={{borderRadius: 5}}
                                 source={require('../../assets/images/image.png')}>
                    <ImageBackground style={styles.item_img} source={require('../../assets/images/shadow.png')}>

                        <Text style={[styles.text, {marginTop: '10%', textAlign: 'center',}]}>{item.title}</Text>
                        <Text style={styles.text1}>مع {item.lecturer}</Text>
                    </ImageBackground>
                </ImageBackground>
                <View style={styles.left_side}/>
            </View>
        )
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle2}>الأنشطة</Text>
                    </View>
                    <View style={styles.leftHeader}>
                    </View>
                </View>
                {/* {this.props.book.load ?
                    <ActivityIndicator animating={this.props.book.load}
                                       color={colors.primary}
                                       size={'large'}/>
                    : */}
                    <Content style={styles.content}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.book.load}
                                colors={[colors.primary]}
                                size={'large'}
                                onRefresh={async () => {
                                    this.props.get_activities()
                                }}
                            />
                        }>
                        <View style={{width: '100%',}}>
                            <FlatList data={[this.props.book.activities?.last_activities[0]]}
                                      horizontal
                                      showsHorizontalScrollIndicator={false}
                                      style={{marginLeft: '2%'}}
                                      renderItem={(item) => this._renderItem(item)}
                            />
                        </View>
                        {this.props.book.activities.discussions && this.props.book.activities.discussions.length != 0 &&
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>مناقشات</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Discussions', {type: 0})}>
                                <Text style={styles.headerTitle1}>عرض المزيد</Text>
                            </TouchableOpacity>
                        </View>}
                        {this.props.book.activities.discussions && this.props.book.activities.discussions.length != 0 &&
                        <FlatList data={this.props.book.activities.discussions}
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                  style={{marginLeft: '5%'}}
                                  renderItem={(item) => <ActivityItem item={item}
                                                                      dis={true}
                                                                      navigation={this.props.navigation}/>}/>}

                        {this.props.book.activities.seminars && this.props.book.activities.seminars.length != 0 &&
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Discussions', {type: 1})}
                                          style={styles.bar}>
                            <Text style={styles.headerTitle}>ندوات عن الكتب</Text>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </TouchableOpacity>}
                        {this.props.book.activities.seminars != [] &&
                        <FlatList data={this.props.book.activities.seminars}
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                  inverted={false}
                                  style={{marginLeft: '5%'}}
                                  renderItem={(item) => <ActivityItem item={item}
                                                                      navigation={this.props.navigation}/>}/>}

                        {/*{this.props.book.activities.thesis.length != 0 && <View style={styles.bar}>*/}
                        {/*<Text style={styles.headerTitle}>أطروحات</Text>*/}
                        {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('Thesis')}>*/}
                        {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*}*/}
                        {/*{this.props.book.activities.thesis.length != 0 && <FlatList data={this.props.book.activities.thesis}*/}
                        {/*horizontal*/}
                        {/*style={{marginLeft: '5%'}}*/}
                        {/*renderItem={() => <ActivityItem*/}
                        {/*navigation={this.props.navigation}/>}/>}*/}

                    </Content>
                {/* } */}
            </Container>
        )
    }

    notes_bar(item) {
        return (
            <View style={styles.bar_item_view}>
                <SvgUri uri={item.item.image}/>
                <Text style={styles.text3}>  {item.item.title} </Text>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),
    get_activities: () => dispatch({
        type: get_activities,
    }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Activities);