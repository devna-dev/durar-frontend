import React, { Component } from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
  FlatList,
  TextInput,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import { colors } from '../../config/styles';
import Swipeout from 'react-native-swipeout';
import SearchFilters from '../SearchFilters/SearchFilters';
import Sort from '../Sort/Sort';
import HomeBookItemLoaded from '../../components/HomeBookItemLoaded/HomeBookItemLoaded';
import AddNotes from '../AddNotes/AddNotes';
import { connect } from 'react-redux';
import {
  CLEAR_NOTES,
  PENDING_REQUEST_NOTES,
  PENDING_REQUEST_BOOKS_NOTES,
} from '../../stores/saga/models/notes-store/actions';

class NotesBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      filter: false,
      sort: false,
      note: false,
    };
  }
  componentDidMount() {
    this.onStart();
  }

  onStart = () => {
    const { selected } = this.state;
    if (selected == 0)
      this.props.getBooksNotes();
    else if (selected == 1)
      this.props.getNotes();
  };

  _renderNoteItem = ({ item, index }) => {
    const { selected } = this.state;
    if (selected == 0)
      return (
        <Swipeout
          style={styles.swipe}
          right={[
            {
              component: (
                <TouchableOpacity
                  onPress={() => { }}
                  style={styles.edit1}>
                  <View style={styles.edit}>
                    <SvgUri uri={svg_photo.trash} />
                  </View>
                </TouchableOpacity>
              ),
            },
          ]}>
          <View style={styles.diff_view}>
            <Text
              style={[styles.address_text, { color: colors.primary }]}>
              وجه الإختلاف بين
        </Text>
            <Text style={[styles.address_text, { fontSize: 13 }]}>
              هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن
              الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو
              الكلمات
        </Text>
            <Text
              style={[styles.address_text, { color: colors.primary }]}>
              كتاب: تاريح الخلفاء
        </Text>
          </View>
        </Swipeout>);

    else if (selected == 1)
      return (
        <Swipeout
          style={styles.swipe}
          left={[
            {
              component: (
                <TouchableOpacity
                  onPress={() => { }}
                  style={styles.edit1}>
                  <View style={styles.edit}>
                    <SvgUri uri={svg_photo.trash} />
                  </View>
                </TouchableOpacity>
              ),
            },
          ]}>
          <View style={[styles.diff_view, {height: ""}]}>
            <Text style={[styles.address_text, { fontSize: 13 }]}>
              {item.note}
            </Text>
          </View>
        </Swipeout>);
    else
      return (null);
  }


  render() {
    const { selected } = this.state;
    const { notes, booksNotes, load } = this.props;
    return (
      <Container style={styles.container}>
        <Content style={styles.content} refreshControl={
          <RefreshControl
            refreshing={this.props.load}
            colors={[colors.primary]}
            size={'large'}
            onRefresh={async () => {
              this.start();
            }}
          />
        }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <View style={styles.header0}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <SvgUri style={styles.back_img} uri={svg_photo.back} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>دفتر الملاحظات</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({ note: true })}>
              <SvgUri style={styles.back_img1} uri={svg_photo.fill_add} />
            </TouchableOpacity>
          </View>
          <View style={styles.header1}>
            <TouchableOpacity
              onPress={() => this.setState({ selected: 0 }, () => this.onStart())}
              style={[
                styles.item_view,
                {
                  backgroundColor:
                    this.state.selected !== 0 ? colors.grey1 : colors.white,
                  borderColor:
                    this.state.selected !== 0 ? colors.grey1 : colors.white,
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={
                  this.state.selected == 0
                    ? styles.item_text
                    : styles.active_item_text
                }>
                ملاحظات من الكتب
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ selected: 1 }, () => this.onStart())}
              style={[
                styles.item_view,
                {
                  backgroundColor:
                    this.state.selected !== 1 ? colors.grey1 : colors.white,
                  borderColor:
                    this.state.selected !== 1 ? colors.grey1 : colors.white,
                  borderWidth: 1,
                },
              ]}>
              <Text
                style={
                  this.state.selected == 1
                    ? styles.item_text
                    : styles.active_item_text
                }>
                ملاحظات خاصه
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.selected == 0 && <View style={styles.header}>
            <SvgUri style={styles.back_img} uri={svg_photo.not_active_search} />
            <TextInput placeholder={'إسم الكتاب'} style={styles.input} />
            <SvgUri style={styles.back_img} uri={svg_photo.down_arrow} />
          </View>}

          <FlatList
            data={selected == 0 ? booksNotes : notes}
            style={{}}
            renderItem={this._renderNoteItem}
            ListEmptyComponent={
              <Text
                style={[
                  styles.address_text,
                  { color: colors.primary, alignSelf: 'center' },
                ]}>
                لا يوجد ملاحظات
                </Text>
            }

          />

        </Content>
        <SearchFilters
          visible={this.state.filter}
          onRequestClose={() => this.setState({ filter: false })}
        />
        <Sort
          visible={this.state.sort}
          onRequestClose={() => this.setState({ sort: false })}
        />
        <AddNotes
          visible={this.state.note}
          onRequestClose={() => this.setState({ note: false })}
        />
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    notes: state.notesStore.notes,
    booksNotes: state.notesStore.booksNotes,
    load: state.notesStore.load,
  };
};
const mapDispatchToProps = (dispatch) => ({
  clear: () =>
    dispatch({
      type: CLEAR_NOTES,
    }),

  getNotes: (form) =>
    dispatch({
      type: PENDING_REQUEST_NOTES,
      form,
    }),

  getBooksNotes: (form) =>
    dispatch({
      type: PENDING_REQUEST_BOOKS_NOTES,
      form,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesBook);
