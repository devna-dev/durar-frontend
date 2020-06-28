import React, {Component} from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import styles from './styles';
import {svg_photo} from '../../assets/svg/svg';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Rating, AirbnbRating} from 'react-native-ratings';
import BookItem from '../../components/BookItem/BookItem';
import Button from '../../components/Button/Button';
import {colors} from '../../config/styles';
import BookReview from '../BookReview/BookReview';
// import EditBookReview from '../BookReview/EditBookReview'

import {GET_BOOK_PENDING} from '../../stores/saga/models/book-store/actions';
import {connect} from 'react-redux';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_review: false,
      EditBookReview: false,
    };
  }
  componentDidMount() {
    const {
      params: {lookupId},
    } = this.props.route;
    console.tron.log(lookupId, 'lookupId');
    this.props.getBook({lookupId});
  }

  render() {
    const {
      book: {book, comments},
    } = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <SvgUri style={styles.back_img} uri={svg_photo.back} />
          </TouchableOpacity>
          <View style={styles.leftHeader}>
            <View style={[styles.headerItemView, {flexDirection: 'row'}]} />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationsList')
              }
              style={[styles.headerItemView, {width: 40}]}>
              <SvgUri style={styles.back_img} uri={svg_photo.favourite_book} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationsList')
              }
              style={[styles.headerItemView, {width: 40}]}>
              <SvgUri style={styles.back_img} uri={svg_photo.book_menu} />
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
          <Content>
            <View style={styles.upper}>
              <Image
                style={styles.book}
                source={{
                  uri: book?.cover_image,
                }}
              />
              <View style={styles.book}>
                <Text style={styles.light_font}>عدد الصفحات</Text>
                <Text style={styles.dark_font}>{book && book.page_count}</Text>
                <Text style={styles.light_font}>القسم</Text>
                <Text style={styles.dark_font1}>
                  {book && book.category.name}
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
                <Text style={[styles.light_font, {height: 20}]}>
                  {book && book.author.name}
                </Text>
                <Text style={styles.dark_font2}>{book && book.title}</Text>
              </View>
              <View style={styles.leftHeader}>
                <View style={[styles.headerItemView, {flexDirection: 'row'}]} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('NotificationsList')
                  }
                  style={[styles.headerItemView, {width: 40}]}>
                  <SvgUri
                    style={styles.back_img}
                    uri={svg_photo.favourite_book}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('NotificationsList')
                  }
                  style={[styles.headerItemView, {width: 40}]}>
                  <SvgUri style={styles.back_img} uri={svg_photo.book_menu} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.description}>{book?.description}</Text>
            <View style={styles.bar}>
              <Text style={styles.headerTitle}>التقييمات</Text>
              <Text style={styles.headerTitle1}>عرض المزيد</Text>
            </View>
            <FlatList
              data={comments}
              renderItem={(item) => <BookItem item={item} />}
            />
            <Button
              title={'تقييم الكتاب'}
              onPress={() => this.setState({book_review: true})}
              textColor={colors.white}
              style={[styles.btn, {backgroundColor: colors.primary}]}
            />
            <View style={styles.bar}>
              <Text style={styles.headerTitle}>المستخدمون يقرأون أيضا</Text>
              <Text style={styles.headerTitle1}>عرض المزيد</Text>
            </View>
            <FlatList
              data={[{}, {}, {}, {}, {}, {}]}
              horizontal
              renderItem={(item) => (
                <Image
                  style={styles.img}
                  source={{
                    uri:
                      'https://www.kutubpdfbook.com/kutubpdfcafe/cover/safwat-altfasser.jpg',
                  }}
                />
              )}
            />
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
        />
      </Container>
    );
  }
  onPressReadBook = () => {
    const {
      book: {book, comments},
    } = this.props;
    this.props.navigation.navigate('ReadingPage', {
      screen: 'ReadingPage',
      params: {lookupId: book.id},
    });
  };
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    book: {...state.book},
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBook: (form) =>
    dispatch({
      type: GET_BOOK_PENDING,
      form,
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Book);
