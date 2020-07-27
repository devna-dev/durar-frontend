import React, { Component } from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import { svg_photo } from '../../assets/svg/svg';
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";
import { colors } from "../../config/styles";

export default class SystemPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              <SvgUri style={styles.back_img} uri={svg_photo.gift} />
              <Text style={styles.text2}>160 </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.item_text}>نقاطك الحالية</Text>
          <Text style={styles.item_text1}>160</Text>
          <FlatList
            data={[{}, {}, {}, {}, {}]}
            renderItem={(item) => (
              <View
                style={[
                  styles.view_item_list,
                  {
                    backgroundColor:
                      item.index == 1 ? colors.white : colors.grey2,
                  },
                ]}>
                <View style={{ width: 50 }}>
                  <SvgUri uri={svg_photo.cup} />
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Text style={[styles.item_text1, { fontSize: 14, width: 250 }]}>
                    {' '}
                    من 1 إلى 100 نقطة
                  </Text>
                  <Text style={[styles.text3, { fontSize: 13, width: 250 }]}>
                    نظام النقاطعند قراءة كتاب أونلاين
                  </Text>
                </View>
              </View>
            )}
          />
        </Content>
      </Container>
    );
  }
}
