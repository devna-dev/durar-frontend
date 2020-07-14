import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {FlatList, TextInput, Text, View, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';

import {connect} from 'react-redux';
import {
  get_categories,
  clear,
  search_result,
  get_authors,
} from '../../stores/saga/models/book-store/actions';
import {loading} from '../../stores/saga/models/user-store/actions';

class Search1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      index: 0,
      index1: 0,
      sub_index: 0,
      show_sub_categories: false,
      sub_categories: [],
      show_categories: false,
      show_authers: false,
      loading: false,
      payload: {
        category_id: '',
        title: '',
        sub_category_id: '',
        auther_id: '',
      },
    };
  }

  start() {
    this.props.clear();
    this.props.get_categories();
    this.props.get_authors();
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
  render() {
    const {
      state,
      state: {payload},
    } = this;
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <TextInput
            placeholder={'البحث'}
            style={styles.input}
            onChangeText={(text) =>
              this.setState({...state, payload: {title: text}})
            }
            onFocus={() => this.setState({...state, selected: 0})}
          />
          <SvgUri style={styles.back_img} uri={svg_photo.voice} />
        </View>
        <Content style={styles.content}>
          <View style={styles.header1}>
            <TouchableOpacity
              onPress={() => this.setState({...state, selected: 0})}
              style={[
                styles.item_view,
                {
                  backgroundColor:
                    this.state.selected == 0 ? colors.secondary : colors.white,
                  borderColor:
                    this.state.selected == 0 ? colors.secondary : colors.grey1,
                  borderWidth: 1,
                },
              ]}>
              {this.state.selected == 0 && (
                <SvgUri style={styles.back_img} uri={svg_photo.checked} />
              )}
              <Text
                style={
                  this.state.selected == 0
                    ? styles.item_text
                    : styles.active_item_text
                }>
                {' '}
                بحث كتاب
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.setState({...state, selected: 1})}
              style={[
                styles.item_view,
                {
                  backgroundColor:
                    this.state.selected == 1 ? colors.secondary : colors.white,
                  borderColor:
                    this.state.selected == 1 ? colors.secondary : colors.grey1,
                  borderWidth: 1,
                },
              ]}>
              {this.state.selected == 1 && (
                <SvgUri style={styles.back_img} uri={svg_photo.checked} />
              )}
              <Text
                style={
                  this.state.selected == 1
                    ? styles.item_text
                    : styles.active_item_text
                }>
                {' '}
                بحث محتوى
              </Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            onPress={() => this.setState({...state, selected: 2})}
            style={[
              styles.item_view,
              {
                backgroundColor:
                  this.state.selected == 2 ? colors.secondary : colors.white,
                borderColor:
                  this.state.selected == 2 ? colors.secondary : colors.grey1,
                borderWidth: 1,
                alignSelf: 'flex-start',
                marginHorizontal: '6%',
              },
            ]}>
            {this.state.selected == 2 && (
              <SvgUri style={styles.back_img} uri={svg_photo.checked} />
            )}
            <Text
              style={
                this.state.selected == 2
                  ? styles.item_text
                  : styles.active_item_text
              }>
              {' '}
              بحث عن كاتب
            </Text>
          </TouchableOpacity>
          {this.state.selected == 2 && (
            <View style={{paddingTop : 10}}>
             <TouchableOpacity
             onPress={() =>
               this.setState({show_authers: !this.state.show_authers})
             }
             style={[styles.bar4, {borderColor: colors.grey1}]}>
             <Text style={[styles.text3, {color: colors.grey3}]}>
               اختر اسم الكاتب
             </Text>
             <SvgUri
               style={styles.back_img}
               uri={
                 this.state.show_authers
                   ? svg_photo.down_arrow
                   : svg_photo.up_arrow
               }
             />
           </TouchableOpacity>
           {this.state.show_authers && (
             <FlatList
               data={this.props.book.authors}
               style={{marginHorizontal: '3.5%'}}
               numColumns={2}
               renderItem={({item, index}) => (
                 <TouchableOpacity
                   onPress={() => {
                     this.setState({
                       ...state,
                       index: index,
                       payload: {
                        ...this.state.payload,
                        auther_id: item.id,
                      },
                     });
                   }}
                   style={[
                     styles.item_view,
 
                     {
                      width: 160,
                      borderRadius: 10,
                       marginBottom: 5,
                       paddingHorizontal:5,
                       backgroundColor:
                         this.state.index == index
                           ? colors.secondary
                           : colors.white,
                       borderColor:
                         this.state.index == index
                           ? colors.secondary
                           : colors.grey1,
                       borderWidth: 1,
                       marginHorizontal: '2%',
                     },
                   ]}>
                   <Text
                     style={[
                       styles.text3,
                       {color: colors.primary, fontWeight: '900'},
                     ]}>
                     {item.name}
                   </Text>
                 </TouchableOpacity>
               )}
             />
           )}
           </View>
          )}
          <Text style={styles.item_text1}>التصنيف الرئيسي</Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({show_categories: !this.state.show_categories})
            }
            style={[styles.bar4, {borderColor: colors.grey1}]}>
            <Text style={[styles.text3, {color: colors.grey3}]}>
              إختر تصنيفات معينه
            </Text>
            <SvgUri
              style={styles.back_img}
              uri={
                this.state.show_categories
                  ? svg_photo.down_arrow
                  : svg_photo.up_arrow
              }
            />
          </TouchableOpacity>
          {this.state.show_categories && (
            <FlatList
              data={this.props.book.categories}
              style={{marginHorizontal: '3.5%'}}
              numColumns={2}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      ...state,
                      index: index,
                      sub_categories: item.sub_categories,
                      payload: {
                        ...this.state.payload,
                        category_id: item.id,
                      },
                    });
                  }}
                  style={[
                    styles.item_view,

                    {
                      marginBottom: 5,
                      backgroundColor:
                        this.state.index == index
                          ? colors.secondary
                          : colors.white,
                      borderColor:
                        this.state.index == index
                          ? colors.secondary
                          : colors.grey1,
                      borderWidth: 1,
                      marginHorizontal: '2%',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text3,
                      {color: colors.primary, fontWeight: '900'},
                    ]}>
                    {item.name}
                  </Text>
                  {/*<SvgUri style={styles.back_img1} uri={svg_photo.active_close}/>*/}
                </TouchableOpacity>
              )}
            />
          )}
          <Text style={styles.item_text1}>التصنيف الفرعي</Text>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                show_sub_categories: !this.state.show_sub_categories,
              })
            }
            style={[styles.bar4, {borderColor: colors.grey1}]}>
            <Text style={[styles.text3, {color: colors.grey3}]}>
              إختر تصنيفات معينه
            </Text>
            <SvgUri
              style={styles.back_img}
              uri={
                this.state.show_sub_categories
                  ? svg_photo.down_arrow
                  : svg_photo.up_arrow
              }
            />
          </TouchableOpacity>

          {this.state.show_sub_categories && (
            <FlatList
              data={this.state.sub_categories}
              style={{marginHorizontal: '3.5%'}}
              numColumns={2}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.navigate('Search')
                    this.setState({
                      ...state,
                      sub_index: index,
                      payload: {
                        ...this.state.payload,
                        sub_category_id: item.id,
                      },
                    });
                  }}
                  style={[
                    styles.item_view,
                    {
                      marginBottom: 5,
                      backgroundColor:
                        this.state.sub_index == index
                          ? colors.secondary
                          : colors.white,
                      borderColor:
                        this.state.sub_index == index
                          ? colors.secondary
                          : colors.grey1,
                      borderWidth: 1,
                      marginHorizontal: '2%',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.text3,
                      {color: colors.primary, fontWeight: '900'},
                    ]}>
                    {item.name}
                  </Text>
                  {/*<SvgUri style={styles.back_img1} uri={svg_photo.active_close}/>*/}
                </TouchableOpacity>
              )}
            />
          )}
          {(payload.category_id != '' ||
            payload.title != '' ||
            payload.sub_category_id != '' ||
            payload.auther_id != '') && (
            <Button
              title={'بحث'}
              load={this.props.book.load}
              style={styles.btn1}
              onPress={() => {
                let form = {
                  category_id: this.state.payload.category_id,
                  sub_category: this.state.payload.sub_category_id,
                  title: this.state.payload.title,
                  content: this.state.selected,
                  author: this.state.payload.auther_id,
                };
                this.props.search_result(form);
                this.props.navigation.navigate('Search', form);
              }}
              textColor={colors.white}
            />
          )}
        </Content>
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
  clear: () =>
    dispatch({
      type: clear,
    }),
  get_categories: () =>
    dispatch({
      type: get_categories,
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
    get_authors: () =>
    dispatch({
      type: get_authors,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search1);
