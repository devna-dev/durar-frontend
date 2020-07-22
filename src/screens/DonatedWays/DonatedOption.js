import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

class DonatedOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={
                    this.props.selected
                        ? styles.selectedOptionContainer
                        : styles.optionContainer
                }
                onPress={() => this.onPress()}>
                <Image style={styles.image} source={this.props.image} />
                <Text style={styles.title}> {this.props.title}</Text>
                <Text style={styles.subTitle}>إضغط للإختيار</Text>
            </TouchableOpacity>
        );
    }

    onPress() {
        this.props.onPress(this.props.index);
    }
}

export default DonatedOption;
