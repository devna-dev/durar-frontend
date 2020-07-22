import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Content from '../Containers/Content';
import Container from '../Containers/Container';
import styles from './styles';
import {SvgUri} from 'react-native-svg';
import storage from '../../config/storage';
import {svg_photo} from '../../assets/svg/svg';
import UploadVoiceBook from '../../screens/UploadVoiceBook/UploadVoiceBook';
import NotesBook from '../../screens/NotesBook/NotesBook';
import {clear, loading, logout} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import RNRestart from 'react-native-restart';
import RateModal from 'react-native-store-rating'
import common from "../../styles/common.style";


const data = [
    // {
    //     image: svg_photo.person,
    //     title: 'حسابي',
    //     route: 'Profile',
    // },
    {
        image: svg_photo.setting,
        title: 'إعدادات الحساب',
        route: 'Settings',
    },
    {
        image: svg_photo.upload,
        title: 'رفع كتاب صوتى',
        route: 'UploadVoiceBook',
    },
    {
        image: svg_photo.thesis,
        title: 'أطروحات',
        route: 'Thesis',
    },
    {
        image: svg_photo.active_shaved,
        title: 'الأنشطة',
        route: 'Activities',
    },
    // {
    //     image: svg_photo.donation,
    //     title: 'التبرع بكتاب',
    //     route: 'DonatedBook',
    // },
    {
        image: svg_photo.donation,
        title: 'التبرع للتطبيق',
        route: 'DonatedWays',
    },
    {
        image: svg_photo.download_icon,
        title: 'الأكثر تحميلاً',
        route: 'DownloadedBooks',
    },

    {
        image: svg_photo.suggested_book,
        title: 'إقتراح كتاب',
        route: 'SuggestionBooks',
    },
    {
        image: svg_photo.notes,
        title: 'دفتر الملاحظات',
        route: 'NotesBook',
    },
    {
        image: svg_photo.notifications,
        title: 'إعدادات الإشعارات',
        route: 'Notifications',
    },
    {
        image: svg_photo.information,
        title: 'عن التطبيق',
        route: 'AboutApp',
    },
    {
        image: svg_photo.star,
        title: 'تقييم التطبيق',
        route: 'review',
    },
    {
        image: svg_photo.support,
        title: 'الدعم الفني',
        route: 'Support',
    },
];


const data1 = [
    // {
    //     image: svg_photo.person,
    //     title: 'حسابي',
    //     route: 'Profile',
    // },
    // {
    //     image: svg_photo.setting,
    //     title: 'إعدادات الحساب',
    //     route: 'Settings',
    //},
    // {
    //     image: svg_photo.upload,
    //     title: 'رفع كتاب صوتى',
    //     route: 'UploadVoiceBook',
    // },
    {
        image: svg_photo.thesis,
        title: 'أطروحات',
        route: 'Thesis',
    },
    {
        image: svg_photo.thesis,
        title: 'الأنشطة',
        route: 'Activities',
    },
    // {
    //     image: svg_photo.donation,
    //     title: 'التبرع بكتاب',
    //     route: 'DonatedBook',
    // },
    {
        image: svg_photo.chat,
        title: 'الأكثر تحميلاً',
        route: 'DownloadedBooks',
    },

    // {
    //     image: svg_photo.suggested_book,
    //     title: 'إقتراح كتاب',
    //     route: 'SuggestionBooks',
    // },
    // {
    //     image: svg_photo.notes,
    //     title: 'دفتر الملاحظات',
    //     route: 'NotesBook',
    // },
    // {
    //     image: svg_photo.setting,
    //     title: 'إعدادات الإشعارات',
    //     route: 'Notifications',
    // },
    {
        image: svg_photo.information,
        title: 'عن التطبيق',
        route: 'AboutApp',
    },
    {
        image: svg_photo.support,
        title: 'الدعم الفني',
        route: 'Support',
    },
];


class CustomDrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            user1: '',
            review: false,
            visible: false,
            access: true
        };

    }

    async componentDidMount() {
        let user = await storage.getItem('user');
        this.setState({user: user.data.user});
        this.setState({user1: user.data});
        if ((await storage.getItem('without')) == true) {
            this.setState({visible: true});
        }
        if (await storage.getItem('token')) {
            this.setState({access: true})
        } else {
            this.setState({access: false})
        }
    }

    render() {

        //  alert(this.props.token_fixed)
        return (
            <Container>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                    <SvgUri style={styles.back_img} uri={svg_photo.close}/>
                </TouchableOpacity>
                <Content>
                    <FlatList
                        data={this.props.token_fixed ? data : data1}
                        renderItem={(item) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.item.route == 'review') {
                                        this.setState({review: true})
                                    } else {
                                        this.props.navigation.navigate(item.item.route)
                                    }

                                }}
                                style={[styles.bar2]}>
                                <Text style={styles.text3}>{item.item.title}</Text>
                                <SvgUri style={styles.back_img} uri={item.item.image}/>
                            </TouchableOpacity>
                        )}
                    />
                    {this.props.token_fixed && <TouchableOpacity onPress={async () => {
                        await storage.clear()
                        //this.props.logout()
                        RNRestart.Restart();
                        this.props.navigation.replace('Walkthrough')
                    }} style={styles.btn}>
                        <Text style={styles.text}>تسجيل الخروج</Text>
                    </TouchableOpacity>}
                </Content>
                <RateModal
                    rateBtnText={'Rate'}
                    cancelBtnText={'Cancel'}
                    totalStarCount={5}
                    defaultStars={5}
                    isVisible={true}
                    sendBtnText={'Send'}
                    commentPlaceholderText={'Placeholder text'}
                    emptyCommentErrorMessage={'Empty comment error message'}
                    playStoreUrl={'market://details?id=com.yakinori'}
                    iTunesStoreUrl={'market://details?id=284882215'}
                    isModalOpen={this.state.review}
                    onStarSelected={e => { console.log('change rating', e); }}
                    storeRedirectThreshold={3}
                    style={{
                        paddingHorizontal: 30
                    }}
                    onClosed={() => {
                        this.setState({
                            review: false
                        })
                    }}
                    sendContactUsForm={state => { this.setState({
                        review: false
                    })}}
                />
                {/*<AppReview visible={this.state.review}*/}
                           {/*onRequestClose={() => this.setState({review: false})}/>*/}
            </Container>
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

    logout: () =>
        dispatch({
            type: logout,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomDrawerContent);
