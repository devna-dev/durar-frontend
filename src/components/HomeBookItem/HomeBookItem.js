import React, { Component } from 'react';
import styles from './styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import { colors } from '../../config/styles';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReadingPage from '../../screens/ReadingPage/ReadingPage';

export default class HomeBookItem extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   // alert(error, errorInfo);
  // }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          try {

            this.props.navigation.push('Book', {
              lookupId: this.props.item?.id,
            });
          } catch (e) {
            // alert(e);
          }
        }}
        style={[
          styles.container,
          {
            flexDirection:
              this.props.now || this.props.search ? 'row' : 'column',
            width: this.props.now || this.props.search ? '100%' : 100,
            height: this.props.now || this.props.search ? 100 : 181,
            marginVertical: this.props.now || this.props.search ? 5 : 0,
          },
        ]}>
        <Image
          style={[
            styles.img,
            {
              width: this.props.now || this.props.search ? 75 : 100,
              height: this.props.now || this.props.search ? 100 : 130,
            },
          ]}
          source={{
            uri: this.props.image
              ? this.props.image
              : this.props.item?.cover_image
          }}
        />
        <View
          style={{
            justifyContent:
              this.props.now || this.props.search ? 'flex-start' : 'center',
            marginTop: this.props.now || this.props.search ? 15 : 0,
            marginHorizontal: this.props.now || this.props.search ? '5%' : 0,
          }}>
          {this.props.now || this.props.search ? (
            <Text style={styles.text1}> {this.props.item?.title}</Text>
          ) : (
              <Text style={styles.homeText} numberOfLines={2}> {this.props.item?.title}</Text>
            )}
          {this.props.now || this.props.search && (
            <Text style={styles.text2} numberOfLines={2}>
              تأليف: {this.props.item?.author.name}
            </Text>
          )}
          {this.props.now && (
            <View style={styles.player}>
              <View style={[styles.view]}>
                <View
                  style={[
                    styles.progress,
                    { backgroundColor: colors.secondary, width: '80%' },
                  ]}
                />
              </View>
              <Text style={styles.text3}> {(this.props.item?.item?.read_progress || 0) * 100}% </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.read(this.props.item?.id);
                  this.props.navigation.navigate('ReadingPage', {
                    screen: 'ReadingPage',
                    params: {
                      lookupId: this.props.item?.id,
                    }
                  });
                }}>
                <SvgUri uri={svg_photo.play || ''} />
              </TouchableOpacity>
            </View>
          )}
          {this.props.search && (
            <View
              style={[
                styles.player,
                { width: 220, justifyContent: 'space-between' },
              ]}>
              <AirbnbRating
                isDisabled
                count={5}
                showRating={false}
                defaultRating={this.props.item.rating != null ? this.props.item.rating : 0}
                size={20}
              />
              <Text style={styles.text2}>{this.props.item.page_count} صفحة</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
