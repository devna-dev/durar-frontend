import React from 'react';
import {ActivityIndicator, Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors, fonts} from '../../config/styles';
import {Hoshi} from 'react-native-textinput-effects';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SvgUri} from 'react-native-svg';

/**
 * Text component
 * @param {object} props - component props.
 * @return {component}
 */



const TextInput = props => {
    const {children, ...rest} = props;
    return (
        <View style={[styles.card1, props.style]}>
            <Hoshi label={props.label}
                   style={styles.container}
                   inputStyle={[styles.inputStyle,]}
                   borderColor={props.borderColor ? props.borderColor : colors.grey1}
                   labelStyle={[Platform.OS == 'ios' ? styles.label : styles.label1,props.labelStyle]}
                   inputPadding={16}
                   labelHeight={24}
                   borderHeight={0.5}
                   defaultValue={props.value}
                   value={props.value}
                   onChangeText={props.onChangeText}
                   keyboardType={props.numeric ? 'numeric' : null}
                   secureTextEntry={props.secureTextEntry}
                   multiline={props.multiline}/>
            <TouchableOpacity onPress={props.onPress}
                              style={styles.image}>
                {props.text ? <Text style={styles.text}>{props.text}</Text> :
                    props.img ?
                        <TouchableOpacity onPress={props.secureTextEntryChange}>
                            {/*<SvgUri width={17.52} height={25.41}*/}
                                    {/*uri={svg_photo.secure}*/}
                                    {/*style={{}}*/}
                            {/*/>*/}
                        </TouchableOpacity> : null}
            </TouchableOpacity>
            <Text style={styles.error}>{props.errors}</Text>
        </View>
    );


};

export default TextInput;
