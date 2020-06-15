import React, {Component} from 'react';
import {Modal, View, Text, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import styles from './styles';
import Content from '../../components/Containers/Content';
import Container from '../../components/Containers/Container';
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import {colors} from "../../config/styles";
import {svg_photo} from "../../assets/svg/svg";
import {SvgUri} from "react-native-svg";


export default class CurrentReadings extends Component {


    constructor(props) {
        super(props);
        this.state = {};
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
                                <Text style={[styles.text3, {color: colors.grey3}]}>قراءاتي الحاليه</Text>
                                <SvgUri uri={svg_photo.up}/>
                            </TouchableOpacity>
                            <FlatList data={[{}, {}, {}, {}, {}]}
                                      style={{marginLeft: '5%'}}
                                      renderItem={() => <HomeBookItem navigation={this.props.navigation} now
                                      read={this.props.read}/>}/>
                        </View>
                    </Content>
                </Container>
            </Modal>
        );
    }


}
