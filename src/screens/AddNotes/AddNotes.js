import React, { Component } from 'react';
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
import { colors } from '../../config/styles';
import { svg_photo } from '../../assets/svg/svg';
import { SvgUri } from 'react-native-svg';
import Button from '../../components/Button/Button';

/**
 * @name AddNotes
 * @param {function} onRequestClose
 * @param {boolean} visible
 */
export default class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      title: '',
    };
  }
  componentDidMount() { }
  handleChanges = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <Modal
        propagateSwipe={true}
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View style={styles.modalContainer}>
            <View style={styles.bar1}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <SvgUri uri={svg_photo.active_add} />

                <Text style={[styles.text3]}>إضافة ملاحظه</Text>
              </View>
              <TouchableOpacity onPress={this.props.onRequestClose}>
                <Text style={[styles.text3, { color: colors.grey3 }]}>إلغاء</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.text]}>الملاحظات</Text>
            {!!this.props.isBookNotes &&
              <View style={[styles.book_view, { height: 60 }]}>
                <TextInput
                  placeholder={'العنوان'}
                  // value={'ذكر'}
                  onChangeText={(text) => this.handleChanges('title', text)}
                  style={styles.input}
                />
              </View>}
            <View style={styles.book_view}>
              <TextInput
                placeholder={'الملاحظة'}
                // value={'ذكر'}
                onChangeText={(text) => this.handleChanges('note', text)}
                style={styles.input}
              />
            </View>
            {/*<View style={styles.upload_view}>*/}
            {/*  <SvgUri uri={svg_photo.upload} />*/}
            {/*  <Text style={[styles.text1]}>إدراج صورة أو فديو</Text>*/}
            {/*</View>*/}
            <Button
              title={'إضافة'}
              style={styles.btn}
              textColor={colors.white}
              load={this.props.isAdding}
              onPress={() => { this.props.addNote(this.state.note, this.state.title); this.handleChanges('title', ""); this.handleChanges('note', "") }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
