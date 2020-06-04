import React, {Component} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import styles from './styles';
import Content from '../../components/Containers/Content';
import Container from '../../components/Containers/Container';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import {colors} from "../../config/styles";
import {svg_photo} from "../../assets/svg/svg";
import {SvgUri} from "react-native-svg";
import MultiSlider from "@ptomasroos/react-native-multi-slider/MultiSlider";
import MultiRangeSlider from "../../components/MultiRangeSlider/MultiRangeSlider";
import Button from "../../components/Button/Button";


export default class Sort extends Component {


    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: [0, 1]
        };
    }

    componentDidMount() {

    }


    render() {

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
                            <TouchableOpacity onPress={this.props.onRequestClose}
                                              style={styles.bar1}>
                                <View style={styles.item_view1}>
                                    <SvgUri style={styles.back_img}
                                            uri={svg_photo.active_sort}/>
                                    <Text style={styles.active_item_text1}> ترتيب حسب</Text>
                                </View>
                                <Text style={styles.text3}> إلغاء</Text>
                            </TouchableOpacity>

                            <FlatList data={[{}, {},{}, {},{}, {},{}, {},]}
                                      renderItem={(item) => <TouchableOpacity
                                          onPress={() => this.setState({index: item.index})}
                                          style={styles.bar2}>
                                          <Text
                                              style={[styles.text3, {color: this.state.index == item.index ? colors.primary : colors.grey3}]}> على
                                              محمد الصلابى</Text>
                                          <SvgUri style={styles.back_img}
                                                  uri={this.state.index == item.index ? svg_photo.checked_square : svg_photo.unchecked_square}/>
                                      </TouchableOpacity>}
                            />
                        </View>
                    </Content>
                    <Button title={'تطبيق'}
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate('RecoverPassword')}
                            textColor={colors.white}
                    />
                </Container>
            </Modal>
        );
    }


}
