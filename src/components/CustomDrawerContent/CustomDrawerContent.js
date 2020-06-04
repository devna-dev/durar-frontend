import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Content from '../Containers/Content';
import Container from '../Containers/Container';
import styles from './styles';
import {SvgUri} from 'react-native-svg';
import storage from '../../config/storage';
import {svg_photo} from "../../assets/svg/svg";
import UploadVoiceBook from "../../screens/UploadVoiceBook/UploadVoiceBook";

const data = [
    {
        image: svg_photo.setting,
        title: 'إعدادات الحساب',
        route: 'Settings'
    },
    {
        image: svg_photo.upload,
        title: 'رفع كتاب صوتى',
        route: 'UploadVoiceBook'
    },
    {
        image: svg_photo.donation,
        title: 'التبرع بكتاب',
        route: 'DonatedBook'
    },
    {
        image: svg_photo.setting,
        title: 'إعدادات الإشعارات',
        route: 'Notifications'
    },
    {
        image: svg_photo.information,
        title: 'عن التطبيق',
        route: 'AboutApp'
    },
    {
        image: svg_photo.chat,
        title: 'إقتراح كتاب',
        route: 'SuggestionBooks'
    },
]
export default class CustomDrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            user1: '',
            visible: false,
        };
    }

    async componentDidMount() {
        let user = await storage.getItem('user');
        this.setState({user: user['data']['user']});
        this.setState({user1: user['data']});
        if (await storage.getItem('without') == true) {
            this.setState({visible: true});
        }
    }

    render() {

        return (
            <Container>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.close}/>
                </TouchableOpacity>
                <Content>
                    <FlatList data={data}
                              renderItem={(item) => <TouchableOpacity
                                  onPress={() => this.props.navigation.navigate(item.item['route'])}
                                  style={[styles.bar2]}>
                                  <Text style={styles.text3}>{item.item['title']}</Text>
                                  <SvgUri style={styles.back_img}
                                          uri={item.item['image']}/>
                              </TouchableOpacity>}/>

                </Content>
            </Container>
        );
    }

}