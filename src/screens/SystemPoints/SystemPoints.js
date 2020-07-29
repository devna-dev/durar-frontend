import React, { Component } from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import HomeBookItemLoaded from '../../components/HomeBookItemLoaded/HomeBookItemLoaded';
import { get_points } from '../../stores/saga/models/user-store/actions';
import { colors } from '../../config/styles';
import { connect } from 'react-redux';

const data = [
  { title: 'من  0 إلى  199 ', subTitle: 'عضو جديد', from: 0, to: 199 },
  { title: 'من  200 إلى  499', subTitle: 'عضو نشيط', from: 200, to: 499 },
  { title: 'من  500 إلى  999', subTitle: 'عضو ذهبي', from: 500, to: 999 },
  {
    title: 'من  1000 و أكثر ',
    subTitle: 'عضو بلاتيني',
    from: 1000,
    to: Number.MAX_SAFE_INTEGER,
  },
];

class SystemPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getPoints();
  }

  render() {
    console.log('data', data);
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.back_view}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.header0}>
              <SvgUri style={styles.back_img} uri={svg_photo.back} />
              <Text style={styles.text3}>نظام النقاط</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SystemPoints')}
              style={styles.headerItemView}>
              <SvgUri style={styles.back_img} uri={svg_photo.cup} />
              {this.props.user.points && (
                <Text style={styles.text2}>{this.props.user.points.total}</Text>
              )}
            </TouchableOpacity>
          </View>
          {this.props.user.load ? (
            <ActivityIndicator
              animating={this.props.load}
              color={colors.primary}
              size={'large'}
            />
          ) : (
              this.props.user.points && (
                <View>
                  <Text style={styles.item_text}>نقاطك الحالية</Text>
                  <Text style={styles.item_text1}>
                    {this.props.user.points.total}
                  </Text>
                  <FlatList
                    data={data}
                    renderItem={({ item }) => (
                      <View
                        style={[
                          styles.view_item_list,
                          {
                            backgroundColor:
                              this.props.user.points.total >= item.from &&
                                this.props.user.points.total <= item.to
                                ? colors.white
                                : colors.grey2,
                          },
                        ]}>
                        <View style={{ width: 50 }}>
                          <SvgUri uri={svg_photo.cup} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={[
                              styles.item_text1,
                              { fontSize: 14, width: 250 },
                            ]}>
                            {item.title}
                          </Text>
                          <Text
                            style={[styles.text3, { fontSize: 13, width: 250 }]}>
                            {item.subTitle}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              )
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
  getPoints: () =>
    dispatch({
      type: get_points,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemPoints);
