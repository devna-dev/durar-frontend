import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";

export default class Thesis extends Component {

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
                            <Text style={styles.item_text1}>أطروحات</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.item_text}> 17 أطروحة</Text>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              renderItem={(item) => <HomeBookItemLoaded search item={item}/>}/>
                </Content>
            </Container>
        )
    }

}