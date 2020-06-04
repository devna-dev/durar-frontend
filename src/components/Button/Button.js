import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors} from '../../config/styles';

/**
 * Text component
 * @param {object} props - component props.
 * @return {component}
 */

const Button = props => {
    const {children, ...rest} = props;
    return (

        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.btn, {}, props.style]}>
                <Text style={[styles.text, {
                    color: props.textColor,
                }, props.textStyle]}
                      text={props.title}>{props.title}
                </Text>
                <ActivityIndicator
                    animating={props.load || false}
                    size="large"
                    color={colors.white}
                    style={styles.indicator}
                />

            </View>
        </TouchableOpacity>
    );


};

export default Button;
