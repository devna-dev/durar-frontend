import React, { Component } from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import styles from './styles';
import { svg_photo } from '../../assets/svg/svg';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Share,
    Linking,
    Alert,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import BookItem from '../../components/BookItem/BookItem';
import Button from '../../components/Button/Button';
import { colors } from '../../config/styles';
import BookReview from '../BookReview/BookReview';
import {
    GET_BOOK_PENDING,
    get_current_read,
    post_review,
    CLEAR_BOOK_DATA,
    SAVE_LOACL_BOOK,
    DELETE_LOACL_BOOK,

    GET_BOOK_SUCCESS,
} from '../../stores/saga/models/book-store/actions';
import { connect } from 'react-redux';
import { add_to_fav, delete_from_fav, get_audio_books, getBookApi, share_book, getBookDetailApi } from '../../services/books';
import Toast from '../../components/Toast/Toast';
import storage from '../../config/storage';
import { clear } from "../../stores/saga/models/user-store/actions";
import AudioBook from "../AudioBook/AudioBook";
import AudioFile from "../../components/HomeBookItemLoaded/AudioFile";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book_review: false,
            EditBookReview: false,
            fav: false,
            access: false,
            audio: false,
            audio_books: [],
            lines: 4
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.start();
        });
        /* this.__unsubscribe = this.props.navigation.addListener('blur', () => {
            this.props.clearBook(this.props.route?.params?.lookupId);
        }); */
    }

    componentWillUnmount() {
        this._unsubscribe();
        //this.__unsubscribe();
        this.props.clearBook(this.props.route?.params?.lookupId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.route?.params?.lookupId !== prevProps.route?.params?.lookupId || (!prevProps.book.singleBook[this.props.route?.params?.lookupId] && this.props.book.singleBook !== prevProps.book.singleBook)) {
            //!prevProps.book.singleBook[this.props.route?.params?.lookupId] && this.props.clearBook(this.props.route?.params?.lookupId);
            this.start();
        }
    }

    start = () => {
        if (!!this.props.user?.token) {
            this.setState({ access: true });
        } else {
            this.setState({ access: false });
        }

        const {
            params: { lookupId, isLocal },
        } = this.props.route;


        if (!!isLocal) {
            this.props.getBookFromLocal({
                book: this.props.book?.savedBook[lookupId],
                reviews: [],
            }, lookupId);
        } else {
            try {
                this.props.getBook({ lookupId });
                this.props.get_current_read();
            } catch (e) {
                // alert(e);
            }
        }

        this.setState({
            fav: !this.props.book?.singleBook[lookupId] || this.props.book?.singleBook[lookupId]?.favorite === null || this.props.book?.singleBook?.[lookupId]?.favorite === undefined ? false : true
        })
    };


    _renderHeader = () => {
        const {
            book: { singleBook, bookReviews },
            user,
        } = this.props;
        const {
            params: { lookupId },
        } = this.props.route;

        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <SvgUri style={styles.back_img} uri={svg_photo.back} />
                </TouchableOpacity>
                <View style={styles.leftHeader}>
                    <View style={[styles.headerItemView, { flexDirection: 'row' }]} />
                    {!!singleBook[lookupId] && <TouchableOpacity
                        onPress={async () => {
                            if (singleBook[lookupId]?.favorite === null || singleBook[lookupId]?.favorite === undefined) {
                                let add_fav = await add_to_fav(singleBook[lookupId]?.id);
                                if (add_fav.id) {
                                    this.setState({ fav: true });
                                    this.start();
                                    this.refs.Successfully.showToast(
                                        'تم إضافة الكتاب إلى المفضلة',
                                        4000,
                                    );
                                }
                            } else {
                                let del_fav = await delete_from_fav(singleBook[lookupId]?.favorite);
                                this.setState({ fav: false });
                                this.start();
                                this.refs.Successfully.showToast(
                                    'تم إزالة الكتاب من المفضلة',
                                    4000,
                                );
                            }

                        }}
                        style={[styles.headerItemView, { width: 40 }]}>
                        <SvgUri
                            style={styles.back_img}
                            uri={
                                singleBook[lookupId]?.favorite === null || singleBook[lookupId]?.favorite === undefined
                                    ? svg_photo.favourite_book
                                    : svg_photo.favourite
                            }
                        />
                    </TouchableOpacity>}

                    {!!singleBook[lookupId] &&
                        <TouchableOpacity
                            onPress={async () => {

                                if (!!this.props.book?.savedBook[lookupId]) {
                                    this.props.deleteBookLocal({
                                        lookupId,
                                    });
                                } else {
                                    const bookDetails = await getBookDetailApi({ lookupId, isWithTashkeel: false });
                                    this.props.saveBookLocal({
                                        lookupId,
                                        book: singleBook[lookupId],
                                        bookDetails: bookDetails?.response,
                                    });
                                }
                            }}
                            style={[styles.headerItemView, { width: 40 }]}>
                            <Image style={{ width: 40, height: 40 }} resizeMethod="resize" resizeMode="contain" source={!!this.props.book?.savedBook?.[lookupId] ? require('../../assets/images/delSave.png') : require('../../assets/images/save.png')} />

                        </TouchableOpacity>}

                    {!!singleBook[lookupId] && <TouchableOpacity
                        onPress={async () => {
                            let shareOptions = {
                                title: 'تطبيق الشاملة',
                                message: `كتاب: ${singleBook[lookupId]?.title} \n ${singleBook[lookupId]?.description}  \n ${singleBook[lookupId]?.cover_image}`,
                                url: singleBook[lookupId]?.cover_image,
                            };

                            Share.share(shareOptions)
                                .then((res, activityType) => {
                                    //console.log(activityType)
                                    if (res.action === Share.dismissedAction) console.log('Share dismissed');
                                    else console.log('Share successful');
                                })
                                .catch((err) => {
                                    err && console.log(err);
                                });


                            let add_fav = await share_book(book.id);
                            console.log('Share', add_fav)
                        }}
                        style={[styles.headerItemView, { width: 40 }]}>
                        <Image style={{ width: 40, height: 40 }} resizeMethod="resize" resizeMode="contain" source={require('../../assets/images/share.png')} />

                    </TouchableOpacity>}
                </View>
            </View>
        )
    }

    render() {
        const {
            book: { singleBook, bookReviews },
            user,
        } = this.props;
        const {
            params: { lookupId },
        } = this.props.route;

        return (
            <Container style={styles.container}>
                <View style={styles.toast}>
                    <Toast ref="Failed" backgroundColor="#ff190c" position="top" />
                    <Toast ref="Successfully" backgroundColor="#146632" position="top" />
                </View>

                {this._renderHeader()}


                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.book.singleBookLoading}
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
                                uri: singleBook[lookupId]?.cover_image,
                            }}
                        />
                        {!!singleBook[lookupId] &&
                            <View style={styles.book}>
                                <Text style={styles.light_font}>عدد الصفحات</Text>
                                <Text style={styles.dark_font}>{singleBook[lookupId] && singleBook[lookupId]?.page_count}</Text>
                                <Text style={styles.light_font}>القسم</Text>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('SubCategory', { id: singleBook[lookupId]?.category?.id }) }}>
                                    <Text style={styles.dark_font1}>{singleBook[lookupId] && singleBook[lookupId].category?.name}</Text>
                                </TouchableOpacity>
                                <Text style={styles.light_font}>التقييم</Text>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <AirbnbRating
                                        isDisabled
                                        count={5}
                                        showRating={false}
                                        defaultRating={singleBook[lookupId]?.rating || 0}
                                        size={14}
                                    />
                                </View>
                                <Text style={styles.light_font}>{`من ${
                                    (singleBook[lookupId]?.rating || 0).toFixed(1) || 0
                                    } تقييم`}</Text>
                            </View>}
                    </View>

                    <View style={styles.address_view}>
                        <View>
                            <Text style={[styles.light_font]}>
                                {singleBook[lookupId] && singleBook[lookupId].author?.name}
                            </Text>
                            <Text
                                style={[
                                    styles.dark_font2,
                                    {
                                        textAlign: 'left',
                                        width: 250,
                                    },
                                ]}>
                                {singleBook[lookupId] && singleBook[lookupId].title}
                            </Text>
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
                        {!!singleBook[lookupId] && singleBook[lookupId]?.has_audio && <TouchableOpacity
                            onPress={async () => {
                                let audio_books = await get_audio_books(singleBook[lookupId].id)
                                this.setState({ audio: !this.state.audio, audio_books })
                            }}
                            style={[styles.headerItemView, { width: 40 }]}>
                            <SvgUri width={38} height={38} uri={svg_photo.play} />
                        </TouchableOpacity>}
                        {!!singleBook[lookupId] && singleBook[lookupId]?.pdf && <TouchableOpacity
                            onPress={() => {
                                if (!!singleBook[lookupId]?.pdf) {
                                    Linking.openURL(singleBook[lookupId]?.pdf)
                                } else {
                                    Alert.alert('الملف غير  متاح');
                                }

                            }
                            }
                            style={[styles.headerItemView, { width: 40, marginHorizontal: 5 }]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.download} />
                        </TouchableOpacity>}
                        {/*</View>*/}
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ lines: 10 })}>
                        <Text style={styles.description} numberOfLines={this.state.lines}>{singleBook[lookupId]?.description}</Text>
                    </TouchableOpacity>

                    {!!singleBook[lookupId] && !!this.props.user?.token && (
                        <Button
                            title={'تقييم الكتاب'}
                            onPress={() => this.setState({ book_review: true })}
                            textColor={colors.white}
                            style={[styles.btn, { backgroundColor: colors.primary }]}
                        />
                    )}
                    {!!singleBook[lookupId] && this.props.book.current_books &&
                        this.props.book.current_books?.length > 0 && (
                            <View style={styles.bar}>
                                <Text style={styles.headerTitle}>المستخدمون يقرأون أيضا</Text>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </View>
                        )}
                    {!!singleBook[lookupId] && this.props.book?.current_books &&
                        this.props.book?.current_books?.length > 0 && (
                            <FlatList
                                data={this.props.book?.current_books}
                                horizontal
                                renderItem={(item) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.push('Book', { lookupId: item?.item?.id })
                                    }}>
                                        <Image
                                            style={styles.img}
                                            source={{
                                                uri: item?.item?.cover_image,
                                            }}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    {!!this.props.book?.singleBook[lookupId] &&
                        <Button
                            title={'قراءة الكتاب'}
                            style={styles.btn}
                            onPress={this.onPressReadBook}
                        />}

                    {bookReviews?.[lookupId]?.length > 0 && (
                        <View style={styles.bar}>
                            <Text style={styles.headerTitle}>التقييمات</Text>
                            {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                        </View>
                    )}
                    <FlatList
                        data={bookReviews?.[lookupId]}
                        contentContainerStyle={{ paddingHorizontal: "5%" }}
                        renderItem={({ item, index }) => (
                            <BookItem item={item} id={singleBook[lookupId].id} index={index} onPress={() => this.start()} />
                        )}
                    />
                </Content>

                <BookReview
                    visible={this.state.book_review}
                    onRequestClose={() => this.setState({ book_review: false })}
                    addReview={(comment, rating) => {
                        //alert(comment+' '+rating)
                        this.props.postReview({
                            lookupId,
                            body: { comment, rating },
                        });
                        this.setState({ book_review: false });
                        this.start();
                    }}
                />
                <AudioFile visible={this.state.audio}
                    onRequestClose={() => this.setState({ audio: false })}
                    bookId={singleBook[lookupId]?.id}
                    audio_books={this.state.audio_books} />
            </Container>
        );
    }

    onPressReadBook = () => {
        const {
            book: { singleBook },
        } = this.props;
        const {
            params: { lookupId, isLocal },
        } = this.props.route;

        !!singleBook[lookupId]?.id && this.props.navigation.push('ReadingPage', {
            screen: 'ReadingPage',
            params: {
                lookupId: singleBook[lookupId]?.id,
                isLocal: isLocal,
            },
        });
    };
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        book: { ...state.book },
        user: { ...state.user },
    };
};

const mapDispatchToProps = (dispatch) => ({
    getBook: (form) =>
        dispatch({
            type: GET_BOOK_PENDING,
            form,
        }),
    clearBook: (lookupId) =>
        dispatch({
            type: CLEAR_BOOK_DATA,
            lookupId
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
    saveBookLocal: (form) =>
        dispatch({
            type: SAVE_LOACL_BOOK,
            form
        }),
    deleteBookLocal: (form) =>
        dispatch({
            type: DELETE_LOACL_BOOK,
            form
        }),
    getBookFromLocal: (form, lookupId) =>
        dispatch({
            type: GET_BOOK_SUCCESS,
            form,
            lookupId
        }),
    clear: () =>
        dispatch({
            type: clear,
        }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Book);
