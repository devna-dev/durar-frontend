import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {FlatList, Dimensions, Image, ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import {colors} from '../../config/styles';
import HomeBookItem from '../../components/HomeBookItem/HomeBookItem';
import Button from '../../components/Button/Button';
import CurrentReadings from '../CurrentReadings/CurrentReadings';
import NotificationsList from '../NotificationsList/NotificationsList';
import SystemPoints from '../SystemPoints/SystemPoints';
import MyBooks from '../MyBooks/MyBooks';
import {
    clear,
    get_books,
    loading,
} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{}, {}, {}, {}, {}, {}, {}, {}],
            sliderActiveSlide: 0,
            readable: false,
        };

    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activities')} style={styles.item_view}>
                <View style={styles.right_side}/>
                <ImageBackground style={styles.item_img}
                                 imageStyle={{borderRadius: 5}}
                                 source={{uri: 'data:image/jpeg;base64,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'}}>
                    <ImageBackground style={styles.item_img} source={require('../../assets/images/shadow.png')}>
                        <Button title={'الدروس العلميه'}
                                style={styles.btn}/>
                        <Text style={styles.text}>حول تاريخ الخلفاء</Text>
                        <Text style={styles.text1}>مع الشيخ محمد أبو موسى</Text>
                    </ImageBackground>
                </ImageBackground>
                <View style={styles.left_side}/>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.menu}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SystemPoints')}
                                          style={[styles.headerItemView, {flexDirection: 'row'}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.gift}/>
                            <Text style={styles.text2}>160 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationsList')}
                                          style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.bell}/>
                            <SvgUri style={styles.back_img1}
                                    uri={svg_photo.badge}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image source={require('../../assets/images/avatar.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Content style={styles.content}>
                    <View style={{width: '100%'}}>
                        <FlatList data={[{}, {}, {}, {}, {}]}
                                  horizontal
                                  style={{marginLeft: '2%'}}
                                  renderItem={(item) => this._renderItem(item)}
                        />
                    </View>
                    <View style={styles.bar}>
                        <Text style={styles.headerTitle}>الأكثر قراءه هذا الشهر</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryCategories')}>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              horizontal
                              style={{marginLeft: '5%'}}
                              renderItem={() => <HomeBookItem navigation={this.props.navigation}
                                              image={'https://api.kashback.co.uk/storage/3udEiDObfGUKgrz6UxsgLwu2bV9Ot9A3arPDBDI8.jpeg'}/>}/>

                    <View style={styles.bar}>
                        <Text style={styles.headerTitle}>أخر الإضافات</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryCategories')}>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              horizontal
                              style={{marginLeft: '5%'}}
                              renderItem={() => <HomeBookItem navigation={this.props.navigation}
                                                              image={'https://api.kashback.co.uk/storage/yatijMWTlBnUJO7M0TYVlw7TDbpIAjtXL0zOKY9w.jpeg'}/>}/>
                    <FlatList data={[{
                        image: svg_photo.library,
                        title: 'قراءاتى الأن',
                        route: 'MyBooks',
                    }, {
                        image: svg_photo.note,
                        title: 'دفتر الملاحظات',
                        route: 'NotesBook',
                    }, {
                        image: svg_photo.voice_book,
                        title: 'كتب صوتية',
                        route: 'MyBooks',
                    }]}
                              horizontal
                              style={{marginLeft: '5%', marginTop: '3%'}}
                              renderItem={(item) => this.notes_bar(item)}/>
                    <View style={styles.bar}>
                        <Text style={styles.headerTitle}>الأكثر إستماعا</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryCategories')}>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              horizontal
                              style={{marginLeft: '5%'}}
                              renderItem={() => <HomeBookItem navigation={this.props.navigation}
                                                              image={'https://api.kashback.co.uk/storage/HUE2pyizlNzMEVlNLhCzheTJxhO4k5pXMbBP0DXe.jpeg'}/>}/>


                </Content>
                <TouchableOpacity onPress={() => this.setState({readable: !this.state.readable})}
                                  style={styles.bar1}>
                    <Text style={[styles.text3, {color: colors.grey3}]}>قراءاتي الحاليه</Text>
                    <SvgUri uri={svg_photo.up_arrow}/>
                </TouchableOpacity>
                <CurrentReadings visible={this.state.readable}
                                 navigation={this.props.navigation}
                                 read={() => {
                                     this.setState({readable: false});
                                     this.props.navigation.navigate('ReadingPage');
                                 }}
                                 onRequestClose={() => {
                                     this.setState({readable: false});
                                     this.props.navigation.navigate('Book', { lookupId: 1});
                                 }}/>
            </Container>
        );
    }

    notes_bar(item) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(item.item.route)}
                              style={styles.bar_item_view}>
                <SvgUri uri={item.item.image}/>
                <Text style={styles.text3}>  {item.item.title} </Text>
            </TouchableOpacity>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),

});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
