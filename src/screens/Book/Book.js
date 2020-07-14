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
    Share,
    Linking
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Rating, AirbnbRating} from 'react-native-ratings';
import BookItem from '../../components/BookItem/BookItem';
import Button from '../../components/Button/Button';
import {colors} from '../../config/styles';
import BookReview from '../BookReview/BookReview';
import {
    GET_BOOK_PENDING,
    get_current_read,
    post_review,
    CLEAR_BOOK_DATA,
} from '../../stores/saga/models/book-store/actions';
import {connect} from 'react-redux';
import {add_to_fav, get_audio_books, getBookApi, share_book} from '../../services/books';
import Toast from '../../components/Toast/Toast';
import storage from '../../config/storage';
import {clear} from "../../stores/saga/models/user-store/actions";
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
            lines:4
        };
    }

    componentDidMount() {
        //this.props.clear()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.start();
        });
        this.__unsubscribe = this.props.navigation.addListener('blur', () => {
            this.props.clearBook();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
        this.__unsubscribe();
        this.props.clearBook();
    }

    componentDidUpdate(prevProps){
        if(this.props.route?.params?.lookupId !== prevProps.route?.params?.lookupId){
            this.props.clearBook();
            this.start();
        }
    }

    start = async () => {
        if (await storage.getItem('token')) {
            this.setState({access: true});
        } else {
            this.setState({access: false});
        }
        try {
            const {
                params: {lookupId},
            } = this.props.route;

            this.props.getBook({lookupId});
            this.props.get_current_read();
        } catch (e) {
            // alert(e);
        }

        this.setState({fav: this.props.book.book && this.props.book.book.is_favorite ? this.props.book.book.is_favorite : false})
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
        console.log('/////////////////////////////////');
        console.log(this.props.book.book && this.props.book.book.is_favorite ? this.props.book.book.is_favorite : '')
        const {
            params: {lookupId},
        } = this.props.route;

        return (
            <Container style={styles.container}>
                <View style={styles.toast}>
                    <Toast ref="Failed" backgroundColor="#ff190c" position="top"/>
                    <Toast ref="Successfully" backgroundColor="#146632" position="top"/>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <View style={styles.leftHeader}>
                        <View style={[styles.headerItemView, {flexDirection: 'row'}]}/>
                        <TouchableOpacity
                            onPress={async () => {
                                let add_fav = await add_to_fav(book.id);
                                if (add_fav.id) {
                                    this.setState({fav: true});
                                    this.refs.Successfully.showToast(
                                        'تم إضافة الكتاب إلى المفضلة',
                                        8000,
                                    );
                                }
                            }}
                            style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri
                                style={styles.back_img}
                                uri={
                                    this.props.book.book && this.props.book.book.is_favorite == true
                                        ? svg_photo.favourite
                                        : svg_photo.favourite_book
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                let shareOptions = {
                                    title: 'تطبيق الشاملة',
                                    message: book.cover_image + 'شارك الكتاب مع الأصدقاء    ',
                                    url: book.cover_image,
                                };

                                Share.share(shareOptions)
                                    .then((res, activityType) => {
                                        console.log(activityType)
                                        if (res.action === Share.dismissedAction) console.log('Share dismissed');
                                        else console.log('Share successful');


                                    })
                                    .catch((err) => {
                                        err && console.log(err);
                                    });


                                let add_fav = await share_book(book.id);
                                console.log('Share', add_fav)
                            }}
                            style={[styles.headerItemView, {width: 40}]}>
                            <SvgUri style={styles.back_img} uri={svg_photo.book_menu}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.book.load && !book  && <ActivityIndicator
                    animating={this.props.book.load}
                    size="large"
                    color={colors.primary}
                    style={styles.indicator}
                /> }

                {(!this.props.book.load || !!book ) && (
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
                                        defaultRating={book?.rating || 0}
                                        size={14}
                                    />
                                </View>
                                <Text style={styles.light_font}>{`من ${
                                    (book?.rating||0).toFixed(1) || 0
                                    } تقييم`}</Text>
                            </View>
                        </View>

                        <View style={styles.address_view}>
                            <View>
                                <Text style={[styles.light_font]}>
                                    {book && book.author?.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.dark_font2,
                                        {
                                            textAlign: 'left',
                                            width: 250,
                                        },
                                    ]}>
                                    {book && book.title}
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
                            {!!book && book?.has_audio && <TouchableOpacity
                                onPress={async () => {
                                    let audio_books = await get_audio_books(book.id)
                                    this.setState({audio: !this.state.audio, audio_books})
                                }}
                                style={[styles.headerItemView, {width: 40}]}>
                                <SvgUri width={38} height={38} uri={svg_photo.play}/>
                            </TouchableOpacity>}
                            {!!book && book?.pdf && <TouchableOpacity
                                onPress={() => {
                                    if (book.pdf != null) {
                                        Linking.openURL(book.pdf)
                                    } else {
                                        alert('الملف غير  متاح')
                                    }

                                }
                                }
                                style={[styles.headerItemView, {width: 40, marginHorizontal: 5}]}>
                                <SvgUri style={styles.back_img} uri={svg_photo.download}/>
                            </TouchableOpacity>}
                            {/*</View>*/}
                        </View>
                        <TouchableOpacity onPress={()=>this.setState({lines:10})}>
                            <Text style={styles.description} numberOfLines={this.state.lines}>{book?.description}</Text>
                        </TouchableOpacity>

                        {!!book && this.state.access && (
                            <Button
                                title={'تقييم الكتاب'}
                                onPress={() => this.setState({book_review: true})}
                                textColor={colors.white}
                                style={[styles.btn, {backgroundColor: colors.primary}]}
                            />
                        )}
                        {this.props.book.home_books.reads &&
                        this.props.book.home_books.reads.length != 0 && (
                            <View style={styles.bar}>
                                <Text style={styles.headerTitle}>المستخدمون يقرأون أيضا</Text>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </View>
                        )}
                        {this.props.book?.books?.reads &&
                        this.props.book?.books?.reads.length != 0 && (
                            <FlatList
                                data={this.props.book?.books?.reads}
                                horizontal
                                renderItem={(item) => (
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('Book', {lookupId: item?.item?.id})
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
                        {!!this.props.book?.book && <Button
                            title={'قراءة الكتاب'}
                            style={styles.btn}
                            onPress={this.onPressReadBook}
                        />}

                        {bookReviews.length != 0 && (
                            <View style={styles.bar}>
                                <Text style={styles.headerTitle}>التقييمات</Text>
                                {/*<Text style={styles.headerTitle1}>عرض المزيد</Text>*/}
                            </View>
                        )}
                        <FlatList
                            data={bookReviews}
                            contentContainerStyle={{paddingHorizontal:"5%"}}
                            renderItem={({item, index}) => (
                                <BookItem item={item} id={book.id} index={index} onPress={() => this.start()}/>
                            )}
                        />
                    </Content>
                )}
                <BookReview
                    visible={this.state.book_review}
                    onRequestClose={() => this.setState({book_review: false})}
                    addReview={(comment, rating) => {
                        //alert(comment+' '+rating)
                        this.props.postReview({
                            lookupId,
                            body: {comment, rating},
                        });
                        this.setState({book_review: false});
                        this.start();
                    }}
                />
                <AudioFile visible={this.state.audio}
                           onRequestClose={() => this.setState({audio: false})}
                           audio_books={this.state.audio_books}/>
            </Container>
        );
    }

    onPressReadBook = () => {
        const {
            book: {book},
        } = this.props;
        !!book?.id && this.props.navigation.navigate('ReadingPage', {
            screen: 'ReadingPage',
            params: {
                lookupId: book?.id,
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
    clearBook: ()=>
        dispatch({
            type: CLEAR_BOOK_DATA
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
    clear: () =>
        dispatch({
            type: clear,
        }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Book);
