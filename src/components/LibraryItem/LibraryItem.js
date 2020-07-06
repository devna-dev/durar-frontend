import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {svg_photo} from "../../assets/svg/svg";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import HistoryCategories from "../../screens/HistoryCategories/HistoryCategories";
import SubCategory from "../../screens/Library/SubCategory";


export default class LibraryItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                if(this.props.sub){
                    this.props.navigation.navigate('HistoryCategories',{sub:this.props.item.id,name:this.props.item.name,id:this.props.id})
                }else{
                    this.props.navigation.navigate('SubCategory',{sub:this.props.item.sub_categories,id:this.props.id})
                }

            }} style={styles.container}>
                <SvgUri style={styles.back_img}
                        uri={svg_photo.islam}/>
                <Text style={styles.headerTitle}>{this.props.item.name} </Text>
            </TouchableOpacity>
        )
    }

}
