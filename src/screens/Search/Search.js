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

export default class Search extends Component {

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
                    <View  style={styles.header0}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>  "تاريخ الخلفاء"</Text>
                    </View>
                    <View style={styles.header2}>
                        <TouchableOpacity onPress={()=>this.setState({filter:true})} style={styles.item_view1}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.filter}/>
                            <Text style={styles.active_item_text1}> فلتر</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({sort:true})} style={styles.item_view1}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.sort}/>
                            <Text style={styles.active_item_text1}> ترتيب حسب</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.find}>وجدنا لك 106 كتاب</Text>
                    <Text style={styles.active_item_text2}>مرتبه حسب الأكثر مشاهدة</Text>
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={() => <HomeBookItem navigation={this.props.navigation} search/>}/>


                </Content>
                <SearchFilters visible={this.state.filter}
                               onRequestClose={() => this.setState({filter: false})}/>
                <Sort visible={this.state.sort}
                               onRequestClose={() => this.setState({sort: false})}/>
            </Container>
        )
    }

}