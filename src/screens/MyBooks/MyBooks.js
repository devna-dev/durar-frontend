import React, { Component } from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import { colors } from '../../config/styles';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import SearchFilters from '../SearchFilters/SearchFilters';
import Sort from '../Sort/Sort';
import HomeBookItemLoaded from '../../components/HomeBookItemLoaded/HomeBookItemLoaded';
import RoundedTabs from '../../components/RoundedTabs/RoundedTabs';
import {
    GET_user_books,
    loading,
} from '../../stores/saga/models/user-store/actions';
import { connect } from 'react-redux';

let list = [
    { key: 0, label: 'قرائتي الآن' },
    { key: 1, label: 'الكتب المفضله' },
    { key: 2, label: 'الكتب المحملة' },
    { key: 3, label: 'الكتب المسموعة' },
];

class MyBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

            this.start();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    start() {
        //this.props.clear()
        this.props.GET_user_books();
    }


    render() {
        //console.log('cont',this.props.user?.books?.reads?this.props.user?.books?.reads.length:'')
        return (
            <Container style={styles.container}>
                <Content style={styles.content}
                    /* refreshControl={
                        <RefreshControl
                            refreshing={this.props.user.load}
                            colors={[colors.primary]}
                            size={'large'}
                            onRefresh={async () => {
                                this.start();
                            }}
                        />
                    } */>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={styles.header0}>
                        <Text style={styles.book_text}> كتبي</Text>
                    </TouchableOpacity>

                    <View style={styles.header1}>
                        <RoundedTabs
                            list={list}
                            onChange={(item) => {
                                this.setState({ selected: item.key });
                            }}
                            selected={this.state.selected}
                        />
                    </View>
                    {this.props.user.load &&
                        <ActivityIndicator animating={this.props.user.load} size={'large'} color={colors.primary} />}
                    {/*{!this.props.user.load && <Text style={styles.find}>كتاب</Text>}*/}
                    {!this.props.user.load && this.state.selected == 0 && this.props.user?.books?.reads && this.props.user?.books?.reads?.length !== 0 ? (
                        <FlatList
                            data={this.props.user?.books?.reads}
                            style={{ marginLeft: '5%' }}
                            renderItem={(item) => (
                                <HomeBookItemLoaded
                                    navigation={this.props.navigation}
                                    now
                                    item={item}
                                    audio
                                />
                            )}
                        />
                    ) :
                        !this.props.user.load && this.state.selected == 0 &&
                        <Text style={styles.find}>لا يوجد كتب مقرؤة</Text>
                    }

                    {!this.props.user.load && this.state.selected == 1 && this.props.user.books?.favorites?.length !== 0 ? (
                        <FlatList
                            data={this.props.user.books.favorites}
                            style={{ marginLeft: '5%' }}
                            renderItem={(item) => (
                                <HomeBookItemLoaded
                                    navigation={this.props.navigation}
                                    search
                                    type={'fav'}
                                    item={item}
                                />
                            )}
                        />
                    ) :
                        !this.props.user.load && this.state.selected == 1 &&
                        <Text style={styles.find}>لا يوجد كتب مفضلة</Text>
                    }
                    {this.state.selected == 2 && !!this.props.book?.savedBook ? (
                        <FlatList
                            data={Object.keys(this.props.book?.savedBook).map((key) => this.props.book.savedBook[key])}
                            style={{ marginLeft: '5%' }}
                            renderItem={(item) => (
                                <HomeBookItemLoaded
                                    navigation={this.props.navigation}
                                    search
                                    isLocal={true}
                                    item={item}
                                />
                            )}
                        />
                    ) :
                        !this.props.user.load && this.state.selected == 2 &&
                        <Text style={styles.find}>لا يوجد كتب محملة</Text>
                    }
                    {!this.props.user.load && this.state.selected == 3 && this.props.user.books?.listens?.length !== 0 ? (
                        <FlatList
                            data={this.props.user?.books?.listens}
                            style={{ marginLeft: '5%' }}
                            renderItem={(item) => (
                                <HomeBookItemLoaded
                                    navigation={this.props.navigation}
                                    search
                                    type={'saved'}
                                    item={item}
                                />
                            )}
                        />
                    )
                        :
                        !this.props.user.load && this.state.selected == 3 &&
                        <Text style={styles.find}>لا يوجد كتب مسموعة</Text>
                    }
                </Content>
                <SearchFilters
                    visible={this.state.filter}
                    onRequestClose={() => this.setState({ filter: false })}
                />
                <Sort
                    visible={this.state.sort}
                    onRequestClose={() => this.setState({ sort: false })}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    GET_user_books: () =>
        dispatch({
            type: GET_user_books,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
