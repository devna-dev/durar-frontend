import React,{Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {svg_photo} from "../../assets/svg/svg";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import HistoryCategories from "../../screens/HistoryCategories/HistoryCategories";


export default class LibraryItem extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('HistoryCategories')} style={styles.container}>
                <SvgUri style={styles.back_img}
                        uri={svg_photo.islam}/>
                <Text style={styles.headerTitle}>فقه المعاملات </Text>
            </TouchableOpacity>
        )
    }

}