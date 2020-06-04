
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';


const Step = props => {
    return (
        <View style={[styles.step]}>
            <View style = {styles.stepDash}></View>
            <Text style={styles.stepText}>{props.title}</Text>
        </View>

    );

};

export default Step;
