import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
    FlatList,
    Dimensions,
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator, RefreshControl,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import {colors} from '../../config/styles';
import HomeBookItem from '../../components/HomeBookItem/HomeBookItem';
import Button from '../../components/Button/Button';
import CurrentReadings from '../CurrentReadings/CurrentReadings';
import NotificationsList from '../NotificationsList/NotificationsList';
import SystemPoints from '../SystemPoints/SystemPoints';
import MyBooks from '../MyBooks/MyBooks';
import {clear, loading} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import {
    get_activities,
    get_current_read,
    get_popular_books,
} from '../../stores/saga/models/book-store/actions';
import storage from '../../config/storage';
import AudioBooks from "../AudioBooks/AudioBooks";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [{}, {}, {}, {}, {}, {}, {}, {}],
            sliderActiveSlide: 0,
            readable: false,
            guest: true,
            loading: true,
            user: '',
            points: 0,
        };
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activities')} style={styles.item_view}>
                <View style={styles.right_side}/>
                <ImageBackground style={styles.item_img}
                                 imageStyle={{borderRadius: 5}}
                                 source={require('../../assets/images/image.png')}>
                    <ImageBackground style={styles.item_img} source={require('../../assets/images/shadow.png')}>
                        {/*<Button title={item.category.name}*/}
                        {/*onPress={()=>this.props.navigation.navigate('Activity',{id:item.id})}*/}
                        {/*style={styles.btn}/>*/}

                        <Text style={[styles.text, {marginTop: '10%', textAlign: 'center',}]}>{item.title}</Text>
                        <Text style={styles.text1}>مع {item.lecturer}</Text>
                    </ImageBackground>
                </ImageBackground>
                <View style={styles.left_side}/>
            </TouchableOpacity>
        )
    };

    async componentDidMount() {
        let points = await storage.getItem('points');
        this.setState({points})
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.start();
        });
    }

    componentWillReceiveProps() {
        if (this.props.book?.home_books && this.props.book?.home_books?.reads) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    async start() {
        this.setState({loading: true});
        this.props.get_popular_books();
        this.setState({loading: false});
        this.props.get_activities()

        let user = await storage.getItem('user');
        if (user) {
            // console.log('****************', user);
            this.setState({user});
            this.props.get_current_read();
            this.setState({guest: false});
        }
    }


    render() {
        console.log(this.props.book?.home_books?.reads && this.props.book?.home_books?.reads ? this.props.book?.home_books : '')

        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.menu}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Badges')}
                            style={[styles.headerItemView, {flexDirection: 'row',}]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.gift}/>
                            <Text style={styles.text2}>{this.state.points} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // this.props.navigation.navigate('NotificationsList')
                            }}
                            style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.bell}/>
                            <SvgUri style={styles.back_img1} uri={svg_photo.badge}/>
                        </TouchableOpacity>
                        {this.state.user != '' && <TouchableOpacity
                            //onPress={() => this.props.navigation.navigate('Profile')}
                        >
                            <Image
                                style={styles.avatar}
                                source={{uri: this.state.user.photo_url ? this.state.user.photo_url : ''}}
                            />
                        </TouchableOpacity>}
                    </View>
                </View>
                {this.props.book.load ? (
                    <ActivityIndicator
                        color={colors.primary}
                        size={'large'}
                        animating={this.props.book.load}
                    />
                ) : (
                    <Content style={styles.content} refreshControl={
                        <RefreshControl
                            refreshing={this.props.book.load}
                            colors={[colors.primary]}
                            size={'large'}
                            onRefresh={async () => {
                                this.start();
                            }}
                        />
                    }>
                        <View style={{width: '100%'}}>
                            <FlatList data={this.props.book.activities.last_activities}
                                      horizontal
                                      style={{marginLeft: '2%'}}
                                      renderItem={(item) => this._renderItem(item)}
                            />
                        </View>
                        {this.props.book?.home_books?.reads && this.props.book?.home_books?.reads.length != 0 &&
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>الأكثر قراءه هذا الشهر</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Library')
                                }>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </TouchableOpacity>
                        </View>}
                        {this.props.book?.home_books?.reads && (
                            <FlatList
                                data={this.props.book?.home_books?.reads}
                                horizontal
                                inverted={false}
                                style={{marginLeft: '5%'}}
                                renderItem={(item) => (
                                    <HomeBookItem
                                        navigation={this.props.navigation}
                                        item={item.item}
                                        image={item.item?.cover_image}
                                        audio
                                    />
                                )}
                            />
                        )}

                        {this.state.loading && <ActivityIndicator
                            color={colors.primary}
                            size={'large'}
                            animating={this.state.loading}
                        />}
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>أخر الإضافات</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Library')
                                }>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </TouchableOpacity>
                        </View>

                        {this.state.loading && <ActivityIndicator
                            color={colors.primary}
                            size={'large'}
                            animating={this.state.loading}
                        />}
                        <FlatList
                            data={this.props.book?.home_books?.recent}
                            horizontal
                            inverted={false}
                            style={{marginLeft: '5%'}}
                            renderItem={(item) => (
                                <HomeBookItem
                                    navigation={this.props.navigation}
                                    item={item.item}
                                />
                            )}
                        />
                        <FlatList
                            data={[
                                {
                                    image: svg_photo.library,
                                    title: 'قراءاتى الأن',
                                    route: 'MyBooks',
                                },
                                {
                                    image: svg_photo.note,
                                    title: 'دفتر الملاحظات',
                                    route: 'NotesBook',
                                },
                                {
                                    image: svg_photo.voice_book,
                                    title: 'كتب صوتية',
                                    route: 'AudioBooks',
                                },
                            ]}
                            horizontal
                            style={{marginLeft: '5%', marginTop: '3%'}}
                            renderItem={(item) => this.notes_bar(item)}
                        />
                        {this.props.book?.home_books?.listens && this.props.book?.home_books?.listens.length != 0 &&
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>الأكثر إستماعا</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Library')
                                }>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </TouchableOpacity>
                        </View>
                        }
                        <FlatList
                            data={this.props.book?.home_books?.listens}
                            horizontal
                            inverted={false}
                            style={{marginLeft: '5%'}}
                            renderItem={(item) => (
                                <HomeBookItem
                                    navigation={this.props.navigation}
                                    item={item.item}
                                />
                            )}
                        />
                    </Content>
                )}
                {!this.state.guest && this.props.book.current_books.length != 0 && (
                    <TouchableOpacity
                        onPress={() => this.setState({readable: !this.state.readable})}
                        style={styles.bar1}>
                        <Text style={[styles.text3, {color: colors.grey3}]}>
                            قراءاتي الحاليه
                        </Text>
                        <SvgUri uri={svg_photo.up_arrow}/>
                    </TouchableOpacity>
                )}
                {!this.state.guest && (
                    <CurrentReadings
                        visible={this.state.readable}
                        current_reads={this.props.book.current_books}
                        navigation={this.props.navigation}
                        read={(id) => {
                            this.setState({readable: false});
                        }}
                        onClose={() => {
                            this.setState({readable: false});
                        }}
                        onRequestClose={(id) => {
                            this.props.navigation.navigate('Book', {lookupId: id});
                        }}
                    />
                )}
            </Container>
        );
    }

    notes_bar(item) {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(item.item.route)}
                style={styles.bar_item_view}>
                <SvgUri uri={item.item.image}/>
                <Text style={styles.text3}> {item.item.title} </Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () =>
        dispatch({
            type: clear,
        }),
    get_current_read: () =>
        dispatch({
            type: get_current_read,
        }),
    get_popular_books: () =>
        dispatch({
            type: get_popular_books,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
