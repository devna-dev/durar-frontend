import React,{Component} from 'react';
import {Text, View} from "react-native";
import {svg_photo} from "../../assets/svg/svg";
import styles from "./styles";
import {SvgUri} from "react-native-svg";


export default class LibraryItem extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <SvgUri style={styles.back_img}
                        uri={svg_photo.islam}/>
                <Text style={styles.headerTitle}>فقه المعاملات </Text>
            </View>
        )
    }

}