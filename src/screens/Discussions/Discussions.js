import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'

export default class Discussions extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.back_view}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.item_text}>مناقشات</Text>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              renderItem={() => <View
                                  style={{alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
                                  <Image style={styles.cover_img}
                                         source={{uri: 'https://www.hiamag.com/sites/default/files/styles/ph2_960_600/public/article/07/03/2019/7841791-1090336005.jpg'}}/>
                                  <Text style={styles.item_text}>الفقه المالكى</Text>
                                  <View style={styles.header1}>
                                      <View style={[styles.item_view, {}]}>
                                          <Text style={styles.active_item_text}>الثلاثاء / 12 مايو 2020</Text>
                                      </View>
                                      <View style={[styles.item_view, {}]}>
                                          <Text style={styles.active_item_text}>الساعة: 5 مساءا</Text>
                                      </View>
                                  </View>
                              </View>}/>
                </Content>
            </Container>
        )
    }

}