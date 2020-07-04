import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import styles from "./styles";
import {svg_photo} from "../../assets/svg/svg";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";


export default class TermsAndConditions extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img}
                                uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> الشروط والأحكام </Text>
                </View>
                <Content style={styles.content}>

                </Content>
            </Container>
        )
    }

}