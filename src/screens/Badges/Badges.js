import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";
import {colors} from "../../config/styles";

export default class Badges extends Component {

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
                            <Text style={styles.text3}>أوسمتى</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SystemPoints')}
                                          style={[styles.headerItemView, {flexDirection: 'row'}]}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.gift}/>
                            <Text style={styles.text2}>160 </Text>
                        </TouchableOpacity>

                    </View>
                    <FlatList data={[
                        {}, {}, {}, {}, {},
                        {}, {}, {}, {}, {},
                        {}, {}, {}, {}, {},
                    ]}
                              numColumns={3}
                              style={{alignSelf: 'center',marginTop:10}}
                              renderItem={(item) => <View style={[styles.view_item_list,]}>
                                  <SvgUri uri={svg_photo.cup}
                                  style={{marginBottom:15}}/>
                                  <Text style={[styles.item_text1, {fontSize: 14,alignSelf:'center',width:'100%',textAlign:'center'}]}> حتى النهاية</Text>
                                  <Text style={[styles.text3, {fontSize: 13}]}>3 كتب</Text>
                              </View>}/>
                </Content>
            </Container>
        )
    }

}