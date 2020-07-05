import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import styles from './styles';
import {svg_photo} from '../../assets/svg/svg';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Share
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Rating, AirbnbRating} from 'react-native-ratings';
import BookItem from '../../components/BookItem/BookItem';
import Button from '../../components/Button/Button';
import {colors} from '../../config/styles';
import BookReview from '../BookReview/BookReview';
import {
    GET_BOOK_PENDING, get_current_read,
    post_review,
} from '../../stores/saga/models/book-store/actions';
import {connect} from 'react-redux';
import {add_to_fav} from "../../services/books";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book_review: false,
            EditBookReview: false,
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            this.start();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    start = () => {
        try {
            const {
                params: {lookupId},
            } = this.props.route;
            // console.tron.log(lookupId, 'lookupId');
            // console.log(lookupId, 'lookupId');
            this.props.getBook({lookupId});
            this.props.get_current_read();
        } catch (e) {
            // alert(e);
        }
    };
    // componentDidCatch(error, errorInfo) {
    //   // You can also log the error to an error reporting service
    //   // alert(error, errorInfo);
    // }
    render() {
        const {
            book: {book, bookReviews},
            user,
        } = this.props;
        const {
            params: {lookupId},
        } = this.props.route;
        // console.log(bookReviews, "bookReviews component");
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <View style={[styles.headerItemView, {flexDirection: 'row'}]}/>
                        <TouchableOpacity
                            onPress={async () => {
                                let add_fav = await add_to_fav(book.id)
                            }}
                            style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.favourite_book}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                let shareOptions = {
                                    title: 'تطبيق الشاملة',
                                    message: book.cover_image + 'شارك الكتاب مع الأصدقاء',
                                    url: book.cover_image,

                                };

                                Share.share(shareOptions)
                                    .then(async (res) => {

                                    })
                                    .catch((err) => {
                                        err && console.log(err);
                                    });
                            }}
                            style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.book_menu}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ActivityIndicator
                    animating={this.props.book.load}
                    size="large"
                    color={colors.green}
                    style={styles.indicator}
                />

                {!this.props.book.load && (
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.book.load}
                                colors={[colors.primary]}
                                size={'large'}
                                onRefresh={async () => {
                                    this.start();
                                }}
                            />
                        }>
                        <View style={styles.upper}>
                            <Image
                                style={styles.book}
                                source={{
                                    uri: book?.cover_image,
                                }}
                            />
                            <View style={styles.book}>
                                <Text style={styles.light_font}>عدد الصفحات</Text>
                                <Text style={styles.dark_font}>{book && book?.page_count}</Text>
                                <Text style={styles.light_font}>القسم</Text>
                                <Text style={styles.dark_font1}>
                                    {book && book.category?.name}
                                </Text>
                                <Text style={styles.light_font}>التقييم</Text>
                                <View style={{alignSelf: 'flex-start'}}>
                                    <AirbnbRating
                                        isDisabled
                                        count={5}
                                        showRating={false}
                                        defaultRating={3}
                                        size={14}
                                    />
                                </View>
                                <Text style={styles.light_font}>{`من ${
                                book?.rating || 0
                                    } تقييم`}</Text>
                            </View>
                        </View>

                        <View style={styles.address_view}>
                            <View>
                                <Text style={[styles.light_font,]}>
                                    {book && book.author?.name}
                                </Text>
                                <Text style={[styles.dark_font2, {
                                    textAlign: 'left',
                                    width: '100%'
                                }]}>{book && book.title}</Text>
                            </View>
                            {/*<View style={styles.leftHeader}>*/}
                            {/*<View style={[styles.headerItemView, {flexDirection: 'row'}]} />*/}
                            {/*<TouchableOpacity*/}
                            {/*onPress={() =>*/}
                            {/*this.props.navigation.navigate('NotificationsList')*/}
                            {/*}*/}
                            {/*style={[styles.headerItemView, {width: 40}]}>*/}
                            {/*<SvgUri*/}
                            {/*style={styles.back_img}*/}
                            {/*uri={svg_photo.favourite_book}*/}
                            {/*/>*/}
                            {/*</TouchableOpacity>*/}
                            {/*<TouchableOpacity*/}
                            {/*onPress={() =>*/}
                            {/*this.props.navigation.navigate('NotificationsList')*/}
                            {/*}*/}
                            {/*style={[styles.headerItemView, {width: 40}]}>*/}
                            {/*<SvgUri style={styles.back_img} uri={svg_photo.book_menu} />*/}
                            {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        </View>
                        <Text style={styles.description}>{book?.description}</Text>
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>التقييمات</Text>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </View>
                        {bookReviews ? <FlatList
                            data={ bookReviews }
                            renderItem={ ({item, index}) => (
                                <BookItem item={ item } index={ index }/>
                            ) }
                        /> : (
                            <Text style={styles.headerTitle}>لا يوجد تقييمات لهذا الكتاب</Text>
                        )
                        }
                        <Button
                            title={'تقييم الكتاب'}
                            onPress={() => this.setState({book_review: true})}
                            textColor={colors.white}
                            style={[styles.btn, {backgroundColor: colors.primary}]}
                        />
                        {this.props.book?.books?.reads.length != 0 && <View style={styles.bar}>
                            <Text style={styles.headerTitle}>المستخدمون يقرأون أيضا</Text>
                            <Text style={styles.headerTitle1}>عرض المزيد</Text>
                        </View>}
                        {this.props.book?.books?.reads.length != 0 && <FlatList
                            data={this.props.book?.books?.reads}
                            horizontal
                            renderItem={(item) => (
                                <Image
                                    style={styles.img}
                                    source={{
                                        uri: item.item.cover_image
                                    }}
                                />
                            )}
                        />}
                        <Button
                            title={'قراءة الكتاب'}
                            style={styles.btn}
                            onPress={this.onPressReadBook}
                        />
                    </Content>
                )}
                <BookReview
                    visible={this.state.book_review}
                    onRequestClose={() => this.setState({book_review: false})}
                    addReview={(comment, rating) => {
                        this.props.postReview({
                            lookupId,
                            body: {comment, rating},
                        });
                        this.setState({book_review: false});
                    }}
                />
            </Container>
        );
    }

    onPressReadBook = () => {
        const {
            book: {book},
        } = this.props;
        this.props.navigation.navigate('ReadingPage', {
            screen: 'ReadingPage',
            params: {
                lookupId: book.id,
            },
        });
    };
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        book: {...state.book},
        user: {...state.user},
    };
};

const mapDispatchToProps = (dispatch) => ({
    getBook: (form) =>
        dispatch({
            type: GET_BOOK_PENDING,
            form,
        }),
    postReview: (form) =>
        dispatch({
            type: post_review,
            form,
        }),
    get_current_read: () =>
        dispatch({
            type: get_current_read,
        }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Book);
