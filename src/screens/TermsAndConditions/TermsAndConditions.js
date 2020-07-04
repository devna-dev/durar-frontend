import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import styles from "./styles";
import {svg_photo} from "../../assets/svg/svg";
import {Image, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {SvgUri} from "react-native-svg";
import {get_terms} from "../../services/books";
import HTML from 'react-native-render-html';

export default class TermsAndConditions extends Component {

    constructor(props) {
        super(props)
        this.state={
            terms:''
        }
    }

   async componentDidMount(){
        let terms =await get_terms();
        this.setState({terms})
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
                    <ScrollView style={styles.subTitle}>
                        <HTML html={this.state.terms}/>
                    </ScrollView>
                </Content>
            </Container>
        )
    }

}