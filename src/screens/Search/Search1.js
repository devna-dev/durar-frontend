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

export default class Search1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            index: 0,
            index: false
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TextInput placeholder={'البحث'}
                               style={styles.input}/>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.voice}/>
                </View>
                <Content style={styles.content}>

                    <View style={styles.header1}>
                        <View
                            style={[styles.item_view, {
                                backgroundColor: this.state.selected == 0 ? colors.secondary : colors.white,
                                borderColor: this.state.selected == 0 ? colors.secondary : colors.grey1, borderWidth: 1
                            }]}>
                            {this.state.selected == 0 && <SvgUri style={styles.back_img}
                                                                 uri={svg_photo.checked}/>
                            }
                            <Text style={this.state.selected == 0 ? styles.item_text : styles.active_item_text}> بحث
                                كتاب</Text>
                        </View>
                        <View
                            style={[styles.item_view, {
                                backgroundColor: this.state.selected == 1 ? colors.secondary : colors.white,
                                borderColor: this.state.selected == 1 ? colors.secondary : colors.grey1, borderWidth: 1
                            }]}>
                            {this.state.selected == 1 && <SvgUri style={styles.back_img}
                                                                 uri={svg_photo.checked}/>
                            }
                            <Text style={this.state.selected == 1 ? styles.item_text : styles.active_item_text}> بحث
                                محتوى</Text>
                        </View>
                    </View>
                    <View
                        style={[styles.item_view, {
                            backgroundColor: this.state.selected == 2 ? colors.secondary : colors.white,
                            borderColor: this.state.selected == 2 ? colors.secondary : colors.grey1, borderWidth: 1,
                            alignSelf: 'flex-start', marginHorizontal: '6%'
                        }]}>
                        {this.state.selected == 2 && <SvgUri style={styles.back_img}
                                                             uri={svg_photo.checked}/>
                        }
                        <Text style={this.state.selected == 2 ? styles.item_text : styles.active_item_text}> بحث عن
                            كاتب</Text>
                    </View>
                    <Text style={styles.item_text1}>التصنيف</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({index: !this.state.index})}
                        style={[styles.bar4, {borderColor: this.state.index ? colors.primary : colors.grey1}]}>
                        <Text
                            style={[styles.text3, {color: this.state.index ? colors.primary : colors.grey3}]}>إختر
                            تصنيفات معينه</Text>
                        <SvgUri style={styles.back_img}
                                uri={this.state.index ? svg_photo.down_arrow : svg_photo.down_arrow}/>
                    </TouchableOpacity>
                    <FlatList data={[{}, {},]}
                              style={{marginHorizontal:'3.5%'}}
                              numColumns={2}
                              renderItem={(item) => <TouchableOpacity
                                  onPress={() => {
                                      this.props.navigation.navigate('Search')
                                      this.setState({index: item.index})}}
                                  style={[styles.item_view, {
                                      backgroundColor: this.state.index == item.index ? colors.secondary : colors.white,
                                      borderColor: this.state.index == item.index ? colors.secondary : colors.grey1,
                                      borderWidth: 1,
                                      marginHorizontal: '2%'
                                  }]}>
                                  <Text
                                      style={[styles.text3, {color: colors.primary}]}>التاريخ   </Text>
                                  <SvgUri style={styles.back_img1}
                                          uri={svg_photo.active_close}/>
                              </TouchableOpacity>}
                    />
                </Content>
            </Container>
        )
    }

}