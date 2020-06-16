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
import RoundedTabs from "../../components/RoundedTabs/RoundedTabs";

let list = [
    {key: 0, label: 'قرائتي الآن'},
    {key: 1, label: 'الكتب المفضله'},
    {key: 2, label: 'الكتب المحملة'},
    {key: 3, label: 'الكتب المحفوظة'},
]
export default class MyBooks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                        <Text style={styles.book_text}> كتبى</Text>
                    </TouchableOpacity>

                    <View style={styles.header1}>
                        <RoundedTabs list={list}
                                     onChange={(item)=>{
                                         this.setState({selected:item.key})
                                     }}
                                     selected={this.state.selected}/>
                    </View>
                    <Text style={styles.find}>كتاب</Text>
                    {this.state.selected == 0 &&
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={(item) => <HomeBookItemLoaded navigation={this.props.navigation} search type={'saved'} item={item}/>}/>
                    }
                    {this.state.selected == 1 &&
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={(item) => <HomeBookItemLoaded navigation={this.props.navigation} search type={'fav'} item={item}/>}/>
                    }
                    {this.state.selected == 2 &&
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={(item) => <HomeBookItemLoaded navigation={this.props.navigation} search  item={item}/>}/>
                    }
                    {this.state.selected == 3 &&
                    <FlatList data={[{}, {}, {}, {}, {}]}
                              style={{marginLeft: '5%'}}
                              renderItem={(item) => <HomeBookItemLoaded navigation={this.props.navigation} now  item={item}/>}/>
                    }

                </Content>
                <SearchFilters visible={this.state.filter}
                               onRequestClose={() => this.setState({filter: false})}/>
                <Sort visible={this.state.sort}
                      onRequestClose={() => this.setState({sort: false})}/>
            </Container>
        )
    }

}