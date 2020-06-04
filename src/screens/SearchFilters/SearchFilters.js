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


export default class SearchFilters extends Component {


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
                                            uri={svg_photo.active_filter}/>
                                    <Text style={styles.active_item_text1}> فلتر</Text>
                                </View>
                                <Text style={styles.text3}> إلغاء</Text>
                            </TouchableOpacity>
                            <View style={[styles.bar2]}>
                                <Text style={styles.text3}> المتاح صوتيا فقط</Text>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.empty_circle}/>
                            </View>
                            <View style={[styles.bar]}>
                                <Text style={styles.active_item_text1}> الحقبة الزمنيه</Text>
                            </View>
                            <MultiRangeSlider value={[3, 7]} onRangeChanged={(values) => alert(values)}/>
                            <View style={[styles.bar3]}>
                                <Text style={styles.active_item_text}>2000م</Text>
                                <Text style={styles.active_item_text}>1446م</Text>
                            </View>
                            <View style={[styles.bar2, {borderBottomWidth: 0}]}>
                                <Text style={styles.active_item_text1}> الكاتب</Text>
                            </View>
                            <View style={[styles.bar4, {marginBottom: 15}]}>
                                <Text style={styles.text3}> بحث</Text>
                                <SvgUri style={styles.back_img}
                                        uri={svg_photo.not_active_search}/>
                            </View>
                            <FlatList data={[{}, {},]}
                                      renderItem={(item) => <TouchableOpacity
                                          onPress={() => this.setState({index: item.index})}
                                          style={[styles.bar4, {borderColor: this.state.index == item.index ? colors.primary : colors.grey1}]}>
                                          <Text
                                              style={[styles.text3, {color: this.state.index == item.index ? colors.primary : colors.grey3}]}> على
                                              محمد الصلابى</Text>
                                          <SvgUri style={styles.back_img}
                                                  uri={this.state.index == item.index ? svg_photo.checked_square : svg_photo.unchecked_square}/>
                                      </TouchableOpacity>}
                            />
                        </View>
                    </Content>
                    <View style={styles.footer}>
                        <Button title={'مسح'}
                                style={styles.btn1}
                                onPress={() => this.props.navigation.navigate('RecoverPassword')}
                                textColor={colors.primary}
                        />
                        <Button title={'تطبيق'}
                                style={styles.btn}
                                onPress={() => this.props.navigation.navigate('RecoverPassword')}
                                textColor={colors.white}
                        />
                    </View>
                </Container>
            </Modal>
        );
    }


}
