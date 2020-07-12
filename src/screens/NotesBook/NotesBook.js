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
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import SearchFilters from '../SearchFilters/SearchFilters';
import Sort from '../Sort/Sort';
import HomeBookItemLoaded from '../../components/HomeBookItemLoaded/HomeBookItemLoaded';
import AddNotes from '../AddNotes/AddNotes';
import { connect } from 'react-redux';
import {
  CLEAR_NOTES,
  PENDING_REQUEST_NOTES,
  PENDING_REQUEST_BOOKS_NOTES,
  PENDING_ADD_NOTES,
  PENDING_DELETE_NOTES,
} from '../../stores/saga/models/notes-store/actions';
import reactotron from 'reactotron-react-native';

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

  /* shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.booksNotes !== this.props.booksNotes ||
      nextProps.notes !== this.props.notes ||
      nextState.selected !== this.state.selected ||
      nextState.note !== this.state.note
    )
      return true;
    else
      return false;
  } */


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
        <SwipeRow
          disableRightSwipe={true}
          style={{ alignItems: "stretch" }}
          rightOpenValue={-75}
          closeOnRowPress={true}>

          <TouchableOpacity
            onPress={() => { this.props.deleteNote(item, () => this.onStart()) }}
            style={styles.swipeDelete}>
            <SvgUri uri={svg_photo.trash} />
          </TouchableOpacity>

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
        </SwipeRow>);

    else if (selected == 1)
      return (
        <SwipeRow
          disableRightSwipe={true}
          style={{ alignItems: "stretch" }}
          rightOpenValue={-75}
          closeOnRowPress={true}>

          <TouchableOpacity
            onPress={() => { this.props.deleteNote(item, () => this.onStart()) }}
            style={styles.swipeDelete}>
            <SvgUri uri={svg_photo.trash} />
          </TouchableOpacity>

          <View style={styles.diff_view1}>
            <Text style={[styles.address_text, { fontSize: 13 }]}>
              {item?.note}
            </Text>
          </View>
        </SwipeRow>
      );
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
            onRefresh={this.start}
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
            {selected == 1 && <TouchableOpacity onPress={() => this.setState({ note: true })}>
              <SvgUri style={styles.back_img1} uri={svg_photo.fill_add} />
            </TouchableOpacity>}
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
            data={this.state.selected == 0 ? this.props.booksNotes : this.props.notes}
            style={{}}
            contentContainerStyle={{ paddingHorizontal: "5%" }}
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
          addNote={(note) => { this.props.addNote(note, () => { this.setState({ note: false }, () => this.onStart()) }) }}
          isAdding={this.props.isAdding}
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
    isAdding: state.notesStore.isAdding,
  };
};
const mapDispatchToProps = (dispatch) => ({
  clear: () =>
    dispatch({
      type: CLEAR_NOTES,
    }),

  addNote: (note, callback) =>
    dispatch({
      type: PENDING_ADD_NOTES,
      note,
      callback
    }),

  deleteNote: (note, callback) =>
    dispatch({
      type: PENDING_DELETE_NOTES,
      note,
      callback
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
