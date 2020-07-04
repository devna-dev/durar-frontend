import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
    FlatList,
    ScrollView,
    Animated,
    NativeModules,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import AnimatedHeader from 'react-native-animated-header';
import {colors} from '../../config/styles';
import ProfileItem from '../../components/ProfileItem/ProfileItem';
import Activities from '../Activities/Activities';
import storage from '../../config/storage';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [{key: 'fav'}, {key: 'saved'}],
            items1: [{key: 'fav'}, {key: 'fav'}, {key: 'fav'}, {key: 'fav'}],
            sliderActiveSlide: 0,
            readable: false,
            selected: 0,
            scrollOffset: new Animated.Value(0),
            user: '',
        };
    }

    async componentDidMount() {
        let user = await storage.getItem('user');
        this.setState({user});
        console.log('Profile',user)
    }

    getListItems = count => {
        const items = [];
        let i = 0;

        while (i < this.state.items.length) {
            // console.log(this.state.items[i])
            items.push(
                <ProfileItem item={this.state.items[i]}/>,
            );
            i++;
        }

        return items;
    };


    getListReviewedItems = count => {
        const items = [];
        let i = 0;
        while (i < this.state.items1.length) {
            console.log(this.state.items1[i]);
            items.push(
                <ProfileItem item={this.state.items1[i]}/>,
            );
            i++;
        }
        return items;
    };

    render() {

        return (
            <Container style={styles.container}>
                {/*<View style={styles.header}>*/}
                {/*<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>*/}
                {/*<SvgUri style={styles.back_img}*/}
                {/*uri={svg_photo.menu}/>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={styles.leftHeader}>*/}
                {/*<View style={[styles.headerItemView, {flexDirection: 'row'}]}>*/}

                {/*</View>*/}
                {/*<View style={[styles.headerItemView, {width: 40}]}/>*/}
                {/*<Image source={require('../../assets/images/avatar.png')}/>*/}
                {/*</View>*/}
                {/*</View>*/}
                <AnimatedHeader
                    style={{flex: 1}}
                   // onScroll={(v) => alert(v)}
                    name={this.state.user['name']}
                    age={this.state.user['age']+' سنة'}
                    backText=''
                    title={{uri: this.state.user['photo_url'] || ''}}
                    renderLeft={() => (<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}
                                                         style={[styles.back_img, {marginTop: 5}]}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.menu}/>
                    </TouchableOpacity>)}
                    // renderRight={() => (<Image style={styles.back_img1} source={require('../../assets/images/avatar.png')}/>)}
                    backStyle={{marginLeft: -20, marginTop: 25}}
                    backTextStyle={{fontSize: 14, color: '#000'}}
                    titleStyle={{left: Platform.OS == 'ios' ? 157 : 137, bottom: -40,
                    width:40,height:40,borderRadius:20}}
                    headerMaxHeight={100}
                    toolbarColor='#FFF'
                    disabled={false}
                    noBorder
                >
                    <ScrollView stickyHeaderIndices={[0]}>
                        <View style={{width: '100%', backgroundColor: 'white'}}>
                            <View style={[styles.header1, {marginTop: 80}]}>
                                <TouchableOpacity onPress={() => this.setState({selected: 0})}
                                                  style={[styles.item_view, {
                                                      backgroundColor: this.state.selected !== 0 ? colors.grey1 : colors.white,
                                                      borderColor: this.state.selected !== 0 ? colors.grey1 : colors.white,
                                                      borderWidth: 1,
                                                  }]}>

                                    <Text
                                        style={this.state.selected == 0 ? styles.item_text : styles.active_item_text}>السجل</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({selected: 1})}
                                                  style={[styles.item_view, {
                                                      backgroundColor: this.state.selected !== 1 ? colors.grey1 : colors.white,
                                                      borderColor: this.state.selected !== 1 ? colors.grey1 : colors.white,
                                                      borderWidth: 1,
                                                  }]}>
                                    <Text
                                        style={this.state.selected == 1 ? styles.item_text : styles.active_item_text}>تقيماتى</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.selected == 0 && <View style={styles.search_view}>
                            <View style={styles.header}>
                                <TextInput placeholder={'بحث في السجل'}
                                           style={styles.input}/>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.not_active_search}/>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Activities')}
                                              style={styles.sort}>
                                <SvgUri uri={svg_photo.sort}/>
                            </TouchableOpacity>
                        </View>
                        }
                        {this.state.selected == 0 ? this.getListItems() : this.getListReviewedItems()}
                    </ScrollView>
                </AnimatedHeader>

            </Container>
        );
    }


}
