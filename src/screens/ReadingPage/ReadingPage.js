import React, {Component} from 'react';
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
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import {colors} from '../../config/styles';
import Swipeout from 'react-native-swipeout';
import storage from '../../config/storage';
import HTML from 'react-native-render-html';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
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
  increase_page,
  post_note,
  SEARCH_IN_BOOK_PENDING,
  CLEAR_SEARCH_IN_BOOK, GET_BOOK_NOTES_PENDING,
} from '../../stores/saga/models/book-store/actions';
import {connect} from 'react-redux';
import AddNotes from '../AddNotes/AddNotes';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
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
  start = async () => {
    // this.setState({
    //   moon: 0,
    //   moon_icon: svg_photo.read_moon,
    //   back: colors.white,
    // });
    await storage.setItem('moon', 0);
    const {lookupId} = this.props.route.params;

    this.props.getBookDetail({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
    // alert(lookupId)
  };
  renderContent = () => {
    const {book} = this.props;
    if (
      this.state.search &&
      book.searchedContent.length !== 0 &&
      this.state.searchText != ''
    ) {
      console.log(
        book.searchedContent[this.state.index].text,
        'book.searchedContent[this.state.index].text',
      );
      return book.searchedContent[this.state.index].text;
    }
    console.log(book?.bookPageContent, 'book?.bookPageContent');
    return book?.bookPageContent;
  };
  renderText = (htmlAttribs, children, moon) => {
    return (
      <SelectableText
        menuItems={['Copy', 'Add Note', 'Voice']}
        onHighlightPress={() => alert('g')}
        style={{
          textAlign: 'right',
          width: '90%',
          alignSelf: 'center',
          color: this.state.color,//moon == 2 ? colors.white : colors.black,
          fontSize: 50,
        }}
        TextComponent={(value) => (
          <Text style={{fontSize: 100, color: 'red'}}>{value}</Text>
        )}
        textValueProp={{style: {fontSize: 100, color: 'red'}}}
        onSelection={({eventType, content, selectionStart, selectionEnd}) => {
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
    const {search, searchText} = this.state;
    return (
      <Container style={{backgroundColor: this.state.back}}>
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
              <SvgUri uri={svg_photo.shape} style={{marginTop: '80%'}} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({menu: !this.state.menu});
              if (this.props.book?.book_notes.length === 0) this.getNotes();
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
              refreshing={this.props.book.load}
              colors={[colors.primary]}
              size={'large'}
              onRefresh={async () => {
                this.start();
              }}
            />
          }>
          {this.state.menu ? (
            <View>
              {this.props.book?.book_notes.length !== 0 ? (
                <FlatList
                  data={this.props.book?.book_notes}
                  style={{}}
                  renderItem={({item}) => (
                    <Swipeout
                      style={styles.swipe}
                      right={[
                        {
                          component: (
                            <TouchableOpacity
                              onPress={() => {}}
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
                          وجه الإختلاف بين
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
                          {item?.comment}
                        </Text>
                        {/*<Text style={[styles.address_text,{color:colors.primary}]}>كتاب: تاريح الخلفاء</Text>*/}
                        <TouchableOpacity
                          onPress={() => {}}
                          style={styles.edit1}>
                          <Text style={{underlineColorAndroid: '#000'}}>
                            عرض الملاحظة
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Swipeout>
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
            <ScrollView style={{flex: 1}}>
              {(!this.props.book.load ||
                this.renderContent()?.length !== 0 ) && (
                  <PageView
                    color={this.state.color}
                    back={this.state.back}
                    font={this.state.font}
                    moon={this.state.moon}
                    index={this.state.index}
                    renderContent={this.renderContent}
                    renderText={this.renderText}
                    onOpenAddNoteModal={this.onOpenAddNoteModal}
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
                {color: this.state.moon == 2 ? colors.white : colors.black},
              ]}>
              {search && searchText != ''
                ? this.props.book.searchedContent[this.state.index]?.page || 1
                : this.props.book.page}
            </Text>
            <Text
              style={[
                styles.item2_text,
                {color: this.state.moon == 2 ? colors.white : colors.black},
              ]}>{`${
              search && searchText != ''
                ? this.props.book.searchedContent[this.state.index]?.page || 1
                : this.props.book.page
            } / ${
              this.props.book?.book?.page_count ||
              this.props.book?.bookDetail?.page_count
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
                  });
                  //await storage.setItem('moon', 1);
                  break;
                case 1:
                  this.setState({
                    moon: 2,
                    moon_icon: svg_photo.read_moon,
                    back: colors.black,
                    color: colors.white,
                  });
                  //await storage.setItem('moon', 2);
                  this.start();
                  break;

                case 2:
                  this.setState({
                    moon: 0,
                    moon_icon: svg_photo.sun,
                    back: '#FFF4E6',
                    color: "#333333",
                  });
                  //await storage.setItem('moon', 0);
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
              this.setState({font: 16});
            } else if (this.state.font == 16) {
              this.setState({font: 20});
            } else if (this.state.font == 20) {
              this.setState({font: 13});
            }
            this.start();
          }} style={styles.headerItem}>
            <SvgUri uri={svg_photo.format}/>
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
          addNote={this.addNote}
        />
      </Container>
    );
  }
  handlePressTashkeel = () => {
    const {lookupId} = this.props.route.params;
    this.setState({isWithTashkeel: !this.state.isWithTashkeel});
    this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  getNotes = () => {
    const {lookupId} = this.props.route.params;
    this.props.getNotes({lookupId});
  };
  goNextPage = async () => {
    await this.props.toNextPage();
    const {lookupId} = this.props.route.params;
    // alert(this.props.book.page)
    await this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  getPage = () => {
    const {lookupId} = this.props.route.params;
    this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  goPreviousPage = async () => {
    await this.props.toPreviousPage();
    const {lookupId} = this.props.route.params;
    await this.props.getPageContent({
      lookupId,
      isWithTashkeel: this.state.isWithTashkeel,
      page: this.props.book.page,
    });
  };
  nextSearchPage = () => {
    const {searchedContent} = this.props.book;
    const {index} = this.state;
    this.setState({
      index: index + 1 > searchedContent.length - 1 ? index : index + 1,
    });
  };
  prevSearchPage = () => {
    const {index} = this.state;
    this.setState({index: index - 1 < 0 ? index : index - 1});
  };
  onCloseAddNoteModal = () => {
    this.setState({isAddNoteModalVisible: false});
  };

  onOpenAddNoteModal = () => {
    this.setState({isAddNoteModalVisible: true});
  };
  addNote = (note) => {
    const {lookupId} = this.props.route.params;
    const {isWithTashkeel, start, end} = this.state;
    const form = {
      lookupId,
      body: {
        tashkeel_on: isWithTashkeel,
        title: 'string',
        note,
        page: this.props.book.page,
        start,
        end,
      },
    };
    this.props.createNote(form, ()=>{this.setState({isAddNoteModalVisible : false})});
  };
  searchContent = (text) => {
    const {lookupId} = this.props.route.params;
    const {isWithTashkeel} = this.state;
    const data = {
      lookupId,
      tashkeel: isWithTashkeel,
      word: text,
    };
    this.props.searchContent(data);
  };
  handleTextChange = (text) => {
    this.setState({searchText: text});
    text ? this.searchContent(text) : this.getPage();
  };
  onPressShowSearch = () => {
    this.setState({search: !this.state.search});
    if (!this.state.search) {
      this.props.clearSearch();
    }
  };
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    book: {...state.book},
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
  toNextPage: () =>
    dispatch({
      type: increase_page,
    }),
  toPreviousPage: () =>
    dispatch({
      type: decrease_page,
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
  clearSearch: () =>
    dispatch({
      type: CLEAR_SEARCH_IN_BOOK,
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReadingPage);
