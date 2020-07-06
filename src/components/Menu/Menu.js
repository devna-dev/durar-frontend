import React, {Component} from 'react';
import Container from '../Containers/Container';
import Content from '../Containers/Content';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {svg_photo} from '../../assets/svg/svg';
import styles from './styles';
import {SvgUri} from 'react-native-svg';
import storage from '../../config/storage';
import {colors} from '../../config/styles';
import {connect} from 'react-redux';

let back = colors.white;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // setTimeout(async function () {
    //     let moon = await storage.getItem('moon')
    //     switch (moon) {
    //         case 0:
    //             back = colors.white
    //             break;
    //         case 1:
    //             back = colors.black
    //             break;
    //         case 2:
    //             back = '#FFF4E6'
    //             break;
    //     }
    //
    // })
  }

  render() {
    setTimeout(async function () {
      let moon = await storage.getItem('moon');
      switch (moon) {
        case 0:
          back = colors.white;
          break;
        case 1:
          back = colors.black;
          break;
        case 2:
          back = '#FFF4E6';
          break;
        default:
          back = colors.white;
      }
    });

    const {
      bookDetail: {
        data,
        page_count,
      },
    } = this.props;

    return (
      <Container style={{backgroundColor: back}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.closeDrawer()}
          style={styles.svg_view}>
          <SvgUri style={styles.back_img} uri={svg_photo.close} />
        </TouchableOpacity>
        <Content>
          {data?.indexes?.headings && (
            <FlatList
              data={data?.indexes?.headings}
              renderItem={({item, index}) => {
                return item?.sub_heading ? (
                  <View style={styles.item}>
                    <Text style={styles.item_text}>{item.title}</Text>

                    <FlatList
                      data={[{}, {}]}
                      renderItem={(item) => (
                        <View style={styles.item1}>
                          <Text style={styles.item1_text}>{item.title}</Text>
                          <Text style={styles.item2_text}>
                            {this.getIndexing(
                              item,
                              index,
                              item.sub_heading,
                              page_count,
                            )}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.item}>
                    <View style={styles.item1}>
                      <Text style={styles.item1_text}>{item.title}</Text>
                      <Text style={styles.item2_text}>
                        {this.getIndexing(
                          item,
                          index,
                          data?.indexes?.headings,
                          page_count,
                        )}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </Content>
      </Container>
    );
  }
  getIndexing = (item, index, headings, pageCount) => {
    if (index + 1 < pageCount - 2 && headings[index + 1]) {
      return `من ${item.page} إلى ${
        (index + 1 < pageCount - 2 && headings[index + 1].page) || ''
      }`;
    }
    return `إلى ${item.page}`;
  };
}

const mapStateToProps = (state) => {
  // console.tron.display({
  //   name: 'LOG DATA OF state',
  //   value: state,
  //   preview: 'Click for details: ' + 'state',
  // });
  return {
    bookDetail: {...state.book.bookDetail},
  };
};

export default connect(mapStateToProps)(Menu);
