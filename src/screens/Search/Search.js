import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import HomeBookItem from '../../components/HomeBookItem/HomeBookItem';
import SearchFilters from '../SearchFilters/SearchFilters';
import Sort from '../Sort/Sort';
import {
  clear,
  get_books,
  loading,
} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import { search_result } from '../../stores/saga/models/book-store/actions';
import {colors} from "../../config/styles";
// multiSliderValue: [0, 1],
// select: false,
// fromYear: 1446,
// yearTo: 2000,
// authorId: '',
// sortId: 0,
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      filter: false,
      sort: false,
      payload: {
        ...this.props.route.params,
      },
    };
    props.clear();
    this.start();
  }
  clearFilter = () => {
    if (this.state.payload.sort == 'undefined') {
      this.setState({
        ...this.state,
        payload: {
          ...this.props.route.params,
        },
      });
    } else {
      this.setState({
        ...this.state,
        payload: {
          ...this.props.route.params,
          sort: this.state.payload.sort,
        },
      });
    }

  }
  start = () => {
    const form = {
      ...this.props.route.params,
    };
    this.props.search_result(form);
  };
  onSearch = (data, isFilter) => {
    this.props.search_result(data);
    isFilter ? this.onRequestCloseFilter() : this.onRequestClose();
  };
  onChangeValue = (key, value, obj) => {
    if (key !== '') {
      this.setState({
        ...this.state,
        payload: {
          ...this.state.payload,
          [key]: value,
        },
      });
    }
    if (typeof obj === 'object') {
      this.setState({
        ...this.state,
        payload: {
          ...this.state.payload,
          ...obj,
        },
      });
    }
  };
  onRequestClose = () => this.setState({sort: false});
  onRequestCloseFilter = () => this.setState({filter: false});
  render() {
    const num = this.props.searchedBooks.length > 0  ? this.props.searchedBooks.length : 0 ;
    const form = {
      ...this.props.route.params,
    };
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.header0}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <SvgUri style={styles.back_img} uri={svg_photo.back} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}> {form.title}</Text>
          </View>
          <View style={styles.header2}>
            <TouchableOpacity
              onPress={() => this.setState({filter: true})}
              style={styles.item_view1}>
              <SvgUri style={styles.back_img} uri={svg_photo.filter} />
              <Text style={styles.active_item_text1}> فلتر</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({sort: true})}
              style={styles.item_view1}>
              <SvgUri style={styles.back_img} uri={svg_photo.sort} />
              <Text style={styles.active_item_text1}> ترتيب حسب</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.find}>وجدنا لك {num} كتاب</Text>
                  <Text style={styles.active_item_text2}>مرتبه حسب الأكثر مشاهدة</Text>
          {this.props.searchedBooks &&
            this.props.searchedBooks.length > 0 ?
              (
                <View>
                  <FlatList
                    data={this.props.searchedBooks}
                    style={{ marginLeft: '5%' }}
                    renderItem={({ item }) => (
                      <HomeBookItem navigation={this.props.navigation} item={item} search />
                    )}
                  />
                </View>)
              : (
              <ActivityIndicator animating={this.props.searchedBooks.length !== 0} color={colors.primary} size={'large'} />
              )}

        </Content>
        <SearchFilters
          visible={this.state.filter}
          onSearch={this.onSearch}
          onChangeValue={this.onChangeValue}
          onRequestClose={this.onRequestCloseFilter}
          data={this.state.payload}
          clearFilter={this.clearFilter}
        />
        <Sort
          visible={this.state.sort}
          onSearch={this.onSearch}
          onChangeValue={this.onChangeValue}
          onRequestClose={this.onRequestClose}
          data={this.state.payload}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    searchedBooks: state.book.searched_books,
  };
};
const mapDispatchToProps = (dispatch) => ({
  clear: () =>
    dispatch({
      type: clear,
    }),

  loading: (form) =>
    dispatch({
      type: loading,
      form,
    }),
  search_result: (form) =>
      dispatch({
        type: search_result,
        form,
      }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
