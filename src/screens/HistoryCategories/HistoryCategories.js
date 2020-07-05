import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {
    FlatList,
    TextInput,
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import {colors} from "../../config/styles";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import Button from "../../components/Button/Button";
import CurrentReadings from "../CurrentReadings/CurrentReadings";
import SearchFilters from "../SearchFilters/SearchFilters";
import Sort from "../Sort/Sort";
import {get_books_using_sub_categories} from "../../services/books";

export default class HistoryCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
            loading: false,
            get_books: []
        }
    }

    async componentDidMount() {
        this.setState({loading: true})
        let get_books = await get_books_using_sub_categories(this.props.route.params.sub)
        console.log('fffffffffffffff', get_books)
        this.setState({loading: false, get_books})
    }


    render() {
        return (
            <Container style={styles.container}>
                {this.state.loading ?
                    <ActivityIndicator color={colors.primary} size={'large'} animating={this.state.loading}/>
                    :
                    <Content style={styles.content}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <View style={styles.headerRightStyle}>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.islam || ''}/>
                                <Text style={styles.headerTitle}> {this.props.route.params.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Library')}>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.sort_by}/>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <Text style={styles.find}>{this.state.get_books.length} كتاب</Text>
                        <Text style={styles.active_item_text2}>مرتبه حسب الأكثر مشاهدة</Text>
                        <FlatList data={this.state.get_books}
                                  style={{marginLeft: '5%'}}
                                  renderItem={(item) => <HomeBookItem
                                      navigation={this.props.navigation}
                                      item={item.item}
                                      search/>}/>


                    </Content>
                }
                <SearchFilters visible={this.state.filter}
                               onRequestClose={() => this.setState({filter: false})}/>
                <Sort visible={this.state.sort}
                      onRequestClose={() => this.setState({sort: false})}/>
            </Container>
        )
    }

}
