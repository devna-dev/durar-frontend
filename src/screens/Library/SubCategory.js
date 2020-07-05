import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import LibraryItem from "../../components/LibraryItem/LibraryItem";
import {colors} from "../../config/styles";


export default class SubCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false
        }
    }


    start() {

    }

    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    <Text style={styles.headerTitle}> التصنيفات الفرعية</Text>
                </TouchableOpacity>
                <Content style={styles.content}>
                    {this.props.route.params.sub && this.props.route.params.sub.length != 0 ?
                        <FlatList data={this.props.route.params.sub}
                                  numColumns={2}
                                  style={{alignSelf: 'center'}}
                                  renderItem={(item) => <LibraryItem
                                      sub
                                      navigation={this.props.navigation}
                                      item={item.item}/>}/>
                        :
                        <Text style={styles.headerTitle1}>لا يوجد تصنيفات فرعية</Text>
                    }

                </Content>
            </Container>
        )
    }

}