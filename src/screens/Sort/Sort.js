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

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
    };
  }

  componentDidMount() {}
    onChangeSort = (sortId) => {
        this.setState({sortId});
    };
  render() {
      console.log(this.state);
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
              <View style={styles.bar1}>
                <View style={styles.item_view1}>
                  <SvgUri style={styles.back_img} uri={svg_photo.active_sort} />
                  <Text style={styles.active_item_text1}> ترتيب حسب</Text>
                </View>
                <TouchableOpacity onPress={this.props.onRequestClose}>
                  <Text style={styles.text3}> إلغاء</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={[
                  {
                    id: 'reads',
                    name: 'الأكثر قراءه',
                  },
                  {
                    id: 'add_date',
                    name: 'المضاف حديثا',
                  },
                  {
                    id: 'pages',
                    name: 'عدد الصفحات من الاٌقل',
                  },
                  {
                    id: '-pages',
                    name: 'عدد الصفحات من الأكثر',
                  },
                  {
                    id: 'rate',
                    name: 'أعلى التقييمات',
                  },
                  {
                    id: 'downloads',
                    name: 'الأكثر تحميلا',
                  },
                ]}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      this.setState({index});
                      this.props.onChangeValue('sort', item.id);
                    }}
                    style={styles.bar2}>
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
          <Button
            title={'تطبيق'}
            style={styles.btn}
            onPress={() => this.props.onSearch(this.props.data)}
            textColor={colors.white}
          />
        </Container>
      </Modal>
    );
  }
}
