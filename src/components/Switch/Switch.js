import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";


export default class Switch extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>this.onChange()} style={this.props.value==true?styles.container:styles.not_active}>
               <View style={styles.active}></View>
            </TouchableOpacity>
        )
    }

}