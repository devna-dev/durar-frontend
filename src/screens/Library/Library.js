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
import LibraryItem from "../../components/LibraryItem/LibraryItem";
import {clear, get_categories, search_result} from "../../stores/saga/models/book-store/actions";
import {connect} from "react-redux";
import {loading} from "../../stores/saga/models/user-store/actions";


class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false
        }
    }

    componentDidMount() {
        this.start()
    }

    start() {

        this.props.clear();
        this.props.get_categories();
        console.log('lllllllllllll', this.props.book.categories)
    }

    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    <Text style={styles.headerTitle}> المكتبه</Text>
                </TouchableOpacity>
                {this.props.book.load?
                    <ActivityIndicator color={colors.primary} size={'large'} animating={this.props.book.load}/>
                    :<Content style={styles.content}>
                    <FlatList data={this.props.book.categories}
                              numColumns={2}
                              style={{alignSelf: 'center'}}
                              renderItem={(item) => <LibraryItem navigation={this.props.navigation}
                                                                 item={item.item}/>}/>
                </Content>}
            </Container>
        )
    }

}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () =>
        dispatch({
            type: clear,
        }),
    get_categories: () =>
        dispatch({
            type: get_categories,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Library);
