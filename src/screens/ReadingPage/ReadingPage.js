import React, { Component } from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import { colors } from '../../config/styles';
import { SwipeRow } from 'react-native-swipe-list-view';
import Swipeout from 'react-native-swipeout';
import storage from '../../config/storage';
import HTML from 'react-native-render-html';
import { SelectableText } from '@astrocoders/react-native-selectable-text';
import Clipboard from '@react-native-community/clipboard';
import Tts from 'react-native-tts';
import PageView from './PageView';
import AudioBooks from '../AudioBooks/AudioBooks';
import AudioPlayer from 'react-native-play-audio';
import Sound from 'react-native-sound';

import {
  decrease_page,
  GET_BOOK_CONTENT_PENDING,
  GET_BOOK_DETAIL_PENDING,
  set_page,
  increase_page,
  post_note,
  SEARCH_IN_BOOK_PENDING,
  CLEAR_SEARCH_IN_BOOK, GET_BOOK_NOTES_PENDING,
  CLEAR_SEARCH_CACHE,
  SET_CURRENT_READING_BOOK,
} from '../../stores/saga/models/book-store/actions';
import {
  PENDING_DELETE_NOTES,
} from '../../stores/saga/models/notes-store/actions';
import { connect } from 'react-redux';
import AddNotes from '../AddNotes/AddNotes';


Tts.setDefaultLanguage('ar-SA');


class ReadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moon: 0,
      moon_icon: svg_photo.read_moon,
      back: colors.white,
      menu: false,
      search: false,
      searchText: '',
      isWithTashkeel: false,
      isAddNoteModalVisible: false,
      selectedText: '',
      start: 0,
      end: 0,
      index: 0,
      font: 13,
      color: colors.black,
      play: false,
    };

    this.searchWaiting = null;

    const { lookupId, page } = this.props.route.params;
    this.props.setPage(page || 1, lookupId);
    this.props.setCurrentReading(lookupId);
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      const { lookupId } = this.props.route.params;
      this.props.setCurrentReading(lookupId);
      this.start();
    });
  }
  componentWillUnmount() {
    const { lookupId } = this.props.route.params;
    this._unsubscribe();
    this.props.clearBookCache(lookupId);
  }
  componentDidUpdate(prevProps) {
    if (this.props?.route?.params !== prevProps?.route?.params) {
      this.setState({ index: this.props?.route?.params?.page || 1 }, () => {
        const { lookupId } = this.props.route.params;
        this.props.setPage(this.props?.route?.params?.page || 1, lookupId);
        //setTimeout(() => this.start(), 200);
      });
    }
  }

  start = async () => {
    const { lookupId } = this.props.route.params;
    this.props.getBookDetail({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
    // alert(lookupId)
  };


  renderContent = () => {
    const { book } = this.props;
    const { lookupId } = this.props.route.params;
    const { moon } = this.state;
    if (
      this.state.search &&
      book.searchedContent.length > 0 &&
      this.state.searchText != ''
    ) {
      /* console.log(
        book.searchedContent[this.state.index].text,
        'book.searchedContent[this.state.index].text',
      ); */

      switch (moon) {
        case 1:
          return book.searchedContent[this.state.index].text; + " ";
        case 2:
          return book.searchedContent[this.state.index].text; + "  ";
        case 3:
          return book.searchedContent[this.state.index].text; + "   ";

        default:
          return book.searchedContent[this.state.index].text;;
      }
    }
    //console.log(book?.bookPageContent?.[lookupId], 'book?.bookPageContent');
    //console.log(book?.bookDetail?.[lookupId]?.content?.[this.props.book.page], 'book?.bookPageContent');
    //return book?.bookPageContent?.[lookupId];

    // Force html to rerender
    switch (moon) {
      case 1:
        return book?.bookDetail?.[lookupId]?.content?.[this.props.book.page - 1]?.text + " ";
      case 2:
        return book?.bookDetail?.[lookupId]?.content?.[this.props.book.page - 1]?.text + "  ";
      case 3:
        return book?.bookDetail?.[lookupId]?.content?.[this.props.book.page - 1]?.text + "   ";

      default:
        return book?.bookDetail?.[lookupId]?.content?.[this.props.book.page - 1]?.text;
    }
  };


  renderText = (htmlAttribs, children, moon) => {
    const { lookupId } = this.props.route.params;

    return (
      <SelectableText
        menuItems={['Copy', 'Add Note', 'Voice']}
        onHighlightPress={() => alert('g')}
        style={{
          textAlign: 'left',
          width: '90%',
          alignSelf: 'center',
          color: this.state.color,//moon == 2 ? colors.white : colors.black,
          fontSize: 50,
        }}
        TextComponent={(value) => (
          <Text style={{ fontSize: 100, color: 'red' }}>{value}</Text>
        )}
        textValueProp={{ style: { fontSize: 100, color: 'red' } }}
        onSelection={({ eventType, content, selectionStart, selectionEnd }) => {
          if (eventType === 'Copy') {
            Clipboard.setString(content);
          } else if (eventType === 'Add Note') {
            const str = content.split('').reverse().join('');
            this.setState({
              selectedText: str,
              start: selectionStart,
              end: selectionEnd,
            });
            console.log(str, 'content');
            this.onOpenAddNoteModal();
          } else if (eventType === 'Voice') {
            Tts.speak(content);
          }
        }}
        value={children}
      />
    );
  };

  render() {
    const { search, searchText } = this.state;
    const { lookupId } = this.props.route.params;

    return (
      <Container style={{ backgroundColor: this.state.back }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.headerItem}>
            <SvgUri uri={svg_photo.arrow_back} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressShowSearch}
            style={[
              styles.headerItem,
              {
                backgroundColor: this.state.search ? '#FFCA2E' : 'transparent',
                borderColor: this.state.search ? '#FFCA2E' : colors.grey2,
              },
            ]}>
            <SvgUri
              uri={
                !this.state.search
                  ? svg_photo.not_active_search
                  : svg_photo.white_search
              }
            />
          </TouchableOpacity>
          <View style={styles.headerItem}>
            <TouchableOpacity onPress={this.handlePressTashkeel}>
              <SvgUri uri={svg_photo.shape} style={{ marginTop: '80%' }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ menu: !this.state.menu });
              if (this.props.book?.book_notes?.[lookupId]?.length == 0) this.getNotes();
            }}
            style={[
              styles.headerItem,
              {
                backgroundColor: this.state.menu ? '#FFCA2E' : 'transparent',
                borderColor: this.state.menu ? '#FFCA2E' : colors.grey2,
              },
            ]}>
            <SvgUri
              uri={
                this.state.menu == true
                  ? svg_photo.white_menu
                  : svg_photo.read_menu
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              this.props.navigation.openDrawer();
            }}
            style={styles.headerItem}>
            <SvgUri uri={svg_photo.menu} />
          </TouchableOpacity>
        </View>


        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.book.bookDetailLoading}
              colors={[colors.primary]}
              size={'large'}
              onRefresh={async () => {
                if (this.state.search) {
                  this.state.searchText && this.searchContent(this.state.searchText);
                } else
                  this.start();
              }}
            />
          }>
          {this.state.menu ? (
            <View>
              {this.props.book?.book_notes?.[lookupId]?.length > 0 ? (
                <FlatList
                  data={this.props.book?.book_notes?.[lookupId]}
                  style={{}}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  renderItem={({ item }) => (
                    <SwipeRow
                      disableRightSwipe={true}
                      style={{ alignItems: "stretch" }}
                      rightOpenValue={-75}
                      closeOnRowPress={true}>

                      <TouchableOpacity
                        onPress={() => { this.props.deleteNote(item, () => { this.start(); }) }}
                        style={styles.swipeDelete}>
                        <SvgUri uri={svg_photo.trash} />
                      </TouchableOpacity>

                      <View style={styles.diff_view}>
                        <Text
                          style={[
                            styles.address_text,
                            {
                              color:
                                this.state.moon == 2
                                  ? colors.white
                                  : colors.primary,
                              textAlign: 'left',
                            },
                          ]}>
                          {item?.title}
                        </Text>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={[
                            styles.address_text,
                            {
                              fontSize: 13,
                              textAlign: 'left',
                              color:
                                this.state.moon == 2
                                  ? colors.grey2
                                  : colors.grey3,
                            },
                          ]}>
                          {item?.note}
                        </Text>
                        {/*<Text style={[styles.address_text,{color:colors.primary}]}>كتاب: تاريح الخلفاء</Text>*/}
                        <TouchableOpacity
                          onPress={() => { this.props.setPage(item?.page, lookupId); this.setState({ menu: !this.state.menu }); }}
                          style={styles.edit1}>
                          <Text style={{ underlineColorAndroid: '#000' }}>
                            عرض الملاحظة
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SwipeRow>
                  )}
                />
              ) : (
                  <Text
                    style={[
                      styles.address_text,
                      {
                        color:
                          this.state.moon == 2 ? colors.white : colors.primary,
                        textAlign: 'center',
                      },
                    ]}>
                    لا يوجد ملاحظات على هذا الكتاب
                  </Text>
                )}
            </View>
          ) : (
              <ScrollView style={{ flex: 1 }}>
                {(!this.props.book.load ||
                  this.renderContent()?.length !== 0) && (
                    <PageView
                      color={this.state.color}
                      back={this.state.back}
                      font={this.state.font}
                      moon={this.state.moon}
                      index={this.state.index}
                      renderContent={this.renderContent}
                      renderText={this.renderText}
                      onOpenAddNoteModal={this.onOpenAddNoteModal}
                      onSelectText={(state) => this.setState(state)}
                    />
                  )}
                {/*{!this.props.book.load &&*/}
                {/*  this.renderContent(this.state.index)?.length === 0 && (*/}
                {/*    <Text*/}
                {/*      style={[*/}
                {/*        styles.item1_text,*/}
                {/*        {*/}
                {/*          color:*/}
                {/*            this.state.moon == 2 ? colors.white : colors.primary,*/}
                {/*          textAlign: 'center',*/}
                {/*        },*/}
                {/*      ]}>*/}
                {/*      هناك مشكلة في عرض المحتوى رجاءً اسحب مرة اخرى لتحديث المحتوى*/}
                {/*    </Text>*/}
                {/*  )}*/}
              </ScrollView>
            )}
        </Content>
        {!this.state.menu && (
          <View style={styles.item1}>
            <Text
              style={[
                styles.item1_text,
                { color: this.state.moon == 2 ? colors.white : colors.black },
              ]}>
              {search && searchText != ''
                ? this.props.book.searchedContent[this.state.index]?.page || 1
                : this.props.book.page}
            </Text>
            <Text
              style={[
                styles.item2_text,
                { color: this.state.moon == 2 ? colors.white : colors.black },
              ]}>{`${
                search && searchText !== ''
                  ? (this.props?.book?.searchedContent[this.state.index]?.page + 1)
                  : this.props?.book?.page
                } / ${
                search && searchText !== '' ?
                  this.props.book?.searchedContent?.length :
                  (this.props.book?.book?.page_count || this.props.book?.bookDetail?.[lookupId]?.page_count || 0)
                } صفحة`}</Text>
          </View>
        )}
        {this.state.search && (
          <View style={styles.search_bar}>
            <TextInput
              placeholder={'بحث عن كتاب'}
              style={styles.input}
              value={this.state.searchText}
              onChangeText={this.handleTextChange}
            />
            <TouchableOpacity>
              <SvgUri uri={svg_photo.not_active_search} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.state.search ? this.prevSearchPage() : this.goPreviousPage();
            }}
            style={styles.headerItem}>
            <SvgUri uri={svg_photo.read_back} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              switch (this.state.moon) {
                case 0:
                  this.setState({
                    moon: 1,
                    moon_icon: svg_photo.read_moon,
                    back: colors.white,
                    color: colors.black,
                  }, () => this.forceUpdate());
                  break;
                case 1:
                  this.setState({
                    moon: 2,
                    moon_icon: svg_photo.read_moon,
                    back: colors.black,
                    color: colors.white,
                  }, () => this.forceUpdate());
                  break;

                case 2:
                  this.setState({
                    moon: 0,
                    moon_icon: svg_photo.sun,
                    back: '#FFF4E6',
                    color: "#333333",
                  }, () => this.forceUpdate());
                  break;
              }
            }}
            style={[
              styles.headerItem,
              {
                backgroundColor:
                  this.state.moon == 2 ? '#FFCA2E' : 'transparent',
                borderColor: this.state.moon == 2 ? '#FFCA2E' : colors.grey2,
              },
            ]}>
            <SvgUri uri={this.state.moon_icon} />
          </TouchableOpacity>
          {/*                    <TouchableOpacity*/}
          {/*                        onPress={() => {*/}
          {/*                            this.setState({play: !this.state.play})*/}
          {/*                                Sound.setCategory('Playback');*/}
          {/*let url='http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4'*/}
          {/*// Load the sound file 'whoosh.mp3' from the app bundle*/}
          {/*// See notes below about preloading sounds within initialization code below.*/}
          {/*                                var whoosh = new Sound(url, Sound.MAIN_BUNDLE, (error) => {*/}
          {/*                                    if(!this.state.play){*/}
          {/*                                        whoosh.release()*/}
          {/*                                        this.setState({play: false})*/}
          {/*                                        url=null*/}
          {/*                                    }else {*/}
          {/*                                        alert(this.state.play)*/}
          {/*                                        if (error) {*/}
          {/*                                        console.log('failed to load the sound', error);*/}
          {/*                                        return;*/}
          {/*                                    }*/}
          {/*                                    // loaded successfully*/}
          {/*                                    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());*/}
          {/*                                    // Play the sound with an onEnd callback*/}
          {/*                                    whoosh.play((success) => {*/}
          {/*                                        if (success) {*/}
          {/*                                            this.setState({play: true})*/}
          {/*                                            console.log('successfully finished playing');*/}
          {/*                                        } else {*/}
          {/*                                            console.log('playback failed due to audio decoding errors');*/}
          {/*                                        }*/}
          {/*                                    });*/}
          {/*                                    }*/}
          {/*                                });*/}
          {/*                                // Pause the sound*/}
          {/*// Stop the sound and rewind to the beginning*/}
          {/*// Release the audio player resource*/}
          {/*                                whoosh.release();*/}
          {/*                            // AudioPlayer.onEnd(() => {*/}
          {/*                            //     console.log('on end');*/}
          {/*                            // });*/}
          {/*                            //*/}
          {/*                            // const url ='http://95.111.251.63:8000/media/books/1/audio/WhatsApp_Audio_2020-07-05_at_12.36.22_PM.mp4';*/}
          {/*                            // AudioPlayer.prepare(url, () => {*/}
          {/*                            //     AudioPlayer.play();*/}
          {/*                            //*/}
          {/*                            //     AudioPlayer.getDuration((duration) => {*/}
          {/*                            //         console.log(duration);*/}
          {/*                            //     });*/}
          {/*                            //     setInterval(() => {*/}
          {/*                            //         AudioPlayer.getCurrentTime((currentTime) => {*/}
          {/*                            //             console.log(currentTime);*/}
          {/*                            //         });*/}
          {/*                            //     }, 1000);*/}
          {/*                            //     AudioPlayer.stop();*/}
          {/*                            //     AudioPlayer.pause();*/}
          {/*                            //    // AudioPlayer.setCurrentTime(50.5);*/}
          {/*                            // })*/}
          {/*                        }}*/}
          {/*                        style={styles.headerItem}>*/}
          {/*                        <SvgUri uri={svg_photo.read_paly}/>*/}
          {/*                    </TouchableOpacity>*/}
          <TouchableOpacity onPress={() => {
            if (this.state.font == 13) {
              this.setState({ font: 16 });
            } else if (this.state.font == 16) {
              this.setState({ font: 20 });
            } else if (this.state.font == 20) {
              this.setState({ font: 13 });
            }
            //this.start();
          }} style={styles.headerItem}>
            <SvgUri uri={svg_photo.format} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.state.search ? this.nextSearchPage() : this.goNextPage();
            }}
            style={styles.headerItem}>
            <SvgUri uri={svg_photo.read_forward} />
          </TouchableOpacity>
        </View>
        <AddNotes
          visible={this.state.isAddNoteModalVisible}
          onRequestClose={this.onCloseAddNoteModal}
          isBookNotes={true}
          addNote={this.addNote}
        />
      </Container>
    );
  }
  handlePressTashkeel = () => {
    const { lookupId } = this.props.route.params;
    this.setState({ isWithTashkeel: !this.state.isWithTashkeel });
    this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  getNotes = () => {
    const { lookupId } = this.props.route.params;
    this.props.getNotes({ lookupId });
  };
  goNextPage = () => {
    const { lookupId } = this.props.route.params;
    this.props.toNextPage(lookupId);
    /* const { lookupId } = this.props.route.params;
    await this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    }); */
  };
  getPage = () => {
    const { lookupId } = this.props.route.params;
    this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  goPreviousPage = () => {
    const { lookupId } = this.props.route.params;
    this.props.toPreviousPage(lookupId);
    /* const { lookupId } = this.props.route.params;
    await this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    }); */
  };
  nextSearchPage = () => {
    const { searchedContent } = this.props.book;
    const { index } = this.state;
    this.setState({
      index: index + 1 > searchedContent.length - 1 ? index : index + 1,
    });
  };
  prevSearchPage = () => {
    const { index } = this.state;
    this.setState({ index: index - 1 < 0 ? index : index - 1 });
  };
  onCloseAddNoteModal = () => {
    this.setState({ isAddNoteModalVisible: false });
  };

  onOpenAddNoteModal = () => {
    this.setState({ isAddNoteModalVisible: true });
  };

  addNote = (note, title) => {
    const { lookupId } = this.props.route.params;
    const { isWithTashkeel, start, end } = this.state;
    const form = {
      lookupId,
      body: {
        tashkeel_on: isWithTashkeel,
        title: title,
        note,
        page: this.props.book.page,
        start,
        end,
      },
    };
    this.props.createNote(form, () => { this.setState({ isAddNoteModalVisible: false }, () => this.start()) });
  };

  searchContent = (text) => {
    const { lookupId } = this.props.route.params;
    const { isWithTashkeel } = this.state;
    const data = {
      lookupId,
      tashkeel: isWithTashkeel,
      word: text,
    };
    this.setState({ index: 0 });
    this.props.searchContent(data);
  };

  handleTextChange = (text) => {
    this.setState({ searchText: text });

    if (this.searchWaiting)
      clearTimeout(this.searchWaiting);
    this.searchWaiting = setTimeout(() => {
      this.searchWaiting = null;
      text && this.searchContent(text);// : this.getPage();
    }, 500);
  };

  onPressShowSearch = () => {
    this.setState({ search: !this.state.search });
    if (!this.state.search) {
      this.props.clearSearch();
    }
  };
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    book: { ...state.book },
  };
};

const mapDispatchToProps = (dispatch) => ({
  getBookDetail: (form) =>
    dispatch({
      type: GET_BOOK_DETAIL_PENDING,
      form,
    }),
  getPageContent: (form) =>
    dispatch({
      type: GET_BOOK_CONTENT_PENDING,
      form,
    }),

  setPage: (page, lookupId) =>
    dispatch({
      type: set_page,
      page,
      lookupId,
    }),
  toNextPage: (lookupId) =>
    dispatch({
      type: increase_page,
      lookupId
    }),
  toPreviousPage: (lookupId) =>
    dispatch({
      type: decrease_page,
      lookupId,
    }),
  createNote: (form, callback) =>
    dispatch({
      type: post_note,
      form,
      callback
    }),
  searchContent: (form) =>
    dispatch({
      type: SEARCH_IN_BOOK_PENDING,
      form,
    }),
  getNotes: (form) =>
    dispatch({
      type: GET_BOOK_NOTES_PENDING,
      form,
    }),
  setCurrentReading: (lookupId) =>
    dispatch({
      type: SET_CURRENT_READING_BOOK,
      lookupId,
    }),
  clearSearch: () =>
    dispatch({
      type: CLEAR_SEARCH_IN_BOOK,
    }),
  clearBookCache: (lookupId) =>
    dispatch({
      type: CLEAR_SEARCH_CACHE,
      lookupId
    }),

  deleteNote: (note, callback) =>
    dispatch({
      type: PENDING_DELETE_NOTES,
      note,
      callback
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReadingPage);
