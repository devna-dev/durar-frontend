import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import {colors} from "../../config/styles";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import Button from "../../components/Button/Button";
import CurrentReadings from "../CurrentReadings/CurrentReadings";
import SearchFilters from "../SearchFilters/SearchFilters";
import Sort from "../Sort/Sort";
import LibraryItem from "../../components/LibraryItem/LibraryItem";

export default class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter:false,
            sort:false
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.header0}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    <Text style={styles.headerTitle}>  المكتبه</Text>
                </TouchableOpacity>
                <Content style={styles.content}>
                    <FlatList data={[{}, {}, {}, {}, {},{}, {}, {}, {}, {},]}
                              numColumns={2}
                              style={{alignSelf:'center'}}
                              renderItem={() => <LibraryItem navigation={this.navigation}/>}/>


                </Content>
            </Container>
        )
    }

}