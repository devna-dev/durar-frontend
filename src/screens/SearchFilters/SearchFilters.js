import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './styles';
import Content from '../../components/Containers/Content';
import Container from '../../components/Containers/Container';
import HomeBookItem from '../../components/HomeBookItem/HomeBookItem';
import {colors} from '../../config/styles';
import {svg_photo} from '../../assets/svg/svg';
import {SvgUri} from 'react-native-svg';
import MultiSlider from '@ptomasroos/react-native-multi-slider/MultiSlider';
import MultiRangeSlider from '../../components/MultiRangeSlider/MultiRangeSlider';
import Button from '../../components/Button/Button';
import {
  clear,
  loading,
  login,
} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';
import {
  get_authors,
  get_categories,
} from '../../stores/saga/models/book-store/actions';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  componentDidMount() {
    this.props.get_authors();
    console.log(this.props.get_authors());
  }

  render() {
    const {has_audio, from_year, to_year} = this.props.data;
    return (
      <Modal
        propagateSwipe={true}
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <Container>
          <Content style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={this.props.onRequestClose}
                style={styles.bar1}>
                <View style={styles.item_view1}>
                  <SvgUri
                    style={styles.back_img}
                    uri={svg_photo.active_filter}
                  />
                  <Text style={styles.active_item_text1}> فلتر</Text>
                </View>
                <Text style={styles.text3}> إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.onChangeValue('has_audio', !has_audio)}
                style={[styles.bar2]}>
                <Text style={styles.text3}> المتاح صوتيا فقط</Text>
                <SvgUri
                  style={styles.back_img}
                  uri={
                    has_audio
                      ? svg_photo.checked_square
                      : svg_photo.unchecked_square
                  }
                />
              </TouchableOpacity>
              <View style={[styles.bar]}>
                <Text style={styles.active_item_text1}> الحقبة الزمنيه</Text>
              </View>
              <MultiRangeSlider
                value={[from_year ? from_year : 1446, to_year ? to_year : 2000]}
                onRangeChanged={(values) => {
                  console.log(values);
                  this.props.onChangeValue('', '', {
                    from_year: values[0],
                    to_year: values[1],
                  });
                }}
              />
              <View style={[styles.bar3]}>
                <Text style={styles.active_item_text}>{`${
                  to_year ? to_year : 2000
                }م`}</Text>
                <Text style={styles.active_item_text}>{`${
                  from_year ? from_year : 1446
                }م`}</Text>
              </View>
              <View style={[styles.bar2, {borderBottomWidth: 0}]}>
                <Text style={styles.active_item_text1}> الكاتب</Text>
              </View>
              <View style={[styles.bar4, {marginBottom: 15}]}>
                <Text style={styles.text3}> بحث</Text>
                <SvgUri
                  style={styles.back_img}
                  uri={svg_photo.not_active_search}
                />
              </View>
              <FlatList
                data={this.props.book.authors}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      this.setState({index});
                      this.props.onChangeValue('authorId', item.id);
                    }}
                    style={[
                      styles.bar4,
                      {
                        borderColor:
                          this.state.index == index
                            ? colors.primary
                            : colors.grey1,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.text3,
                        {
                          color:
                            this.state.index == index
                              ? colors.primary
                              : colors.grey3,
                        },
                      ]}>
                      {item.name}
                    </Text>
                    <SvgUri
                      style={styles.back_img}
                      uri={
                        this.state.index == index
                          ? svg_photo.checked_square
                          : svg_photo.unchecked_square
                      }
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </Content>
          <View style={styles.footer}>
            <Button
              title={'مسح'}
              style={styles.btn1}
              textColor={colors.primary}
              onPress={this.props.clearFilter}
            />
            <Button
              title={'تطبيق'}
              style={styles.btn}
              onPress={() => {
                this.props.onSearch(this.props.data, true);
              }}
              textColor={colors.white}
            />
          </View>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('State for error', state);
  // console.log(state);
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => ({
  clear: () =>
    dispatch({
      type: clear,
    }),
  get_authors: () =>
    dispatch({
      type: get_authors,
    }),
  loading: (form) =>
    dispatch({
      type: loading,
      form,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
