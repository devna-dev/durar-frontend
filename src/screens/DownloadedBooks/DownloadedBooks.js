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
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";

export default class SuggestionBooks extends Component {

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
                <Content style={styles.content}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.header0}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>

                    <View style={styles.header1}>
                        <View
                            style={[styles.item_view, {
                                backgroundColor: this.state.selected !== 0 ? colors.grey1 : colors.white,
                                borderColor: this.state.selected !== 0 ? colors.grey1 : colors.white, borderWidth: 1
                            }]}>

                            <Text style={this.state.selected == 0 ? styles.item_text : styles.active_item_text}>تم تحميلها</Text>
                        </View>
                        <View
                            style={[styles.item_view, {
                                backgroundColor: this.state.selected !== 1 ? colors.grey1 : colors.white,
                                borderColor: this.state.selected !== 1 ? colors.grey1 : colors.white, borderWidth: 1
                            }]}>
                            <Text style={this.state.selected == 1 ? styles.item_text : styles.active_item_text}>أقرأها الأن</Text>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <TextInput placeholder={'بحث عن كتاب'}
                                   style={styles.input}/>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.not_active_search}/>
                    </View>
                    <Text style={styles.find}>10 كتب تم تحميلها</Text>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={(item) => <HomeBookItemLoaded search item={item}/>}/>


                </Content>
                <SearchFilters visible={this.state.filter}
                               onRequestClose={() => this.setState({filter: false})}/>
                <Sort visible={this.state.sort}
                      onRequestClose={() => this.setState({sort: false})}/>
            </Container>
        )
    }

}