import {StyleSheet, Dimensions, Platform,NativeModules } from 'react-native';
import {colors} from '../../config/styles';
import common from '../../styles/common.style';


const deviceHeight = Dimensions.get('window').height;

// iOS:
const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;/**
 * Creates a StyleSheet style reference from the given object.
 * @param {object} style - component styles object.
 * @return {object}
 */
export default StyleSheet.create({
    card1: {
        //backgroundColor: 'transparent',
        height: 60,
        marginTop: 5,
       // width: '90%',
        marginBottom: '5%',
    },
    label: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: colors.primary,
        //paddingHorizontal: '5%',
        textAlignVertical: 'center',
        ...common.BoldFont,
        // backgroundColor:'red'
    },
    label1: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: colors.primary,
        width: 270,
        textAlignVertical: 'center',
        ...common.BoldFont
        // backgroundColor:'red'
    },
    image: {
        zIndex: 0,
        marginTop: -35,
        alignItems: deviceLanguage!=='en'?'flex-end':'flex-start',
        marginHorizontal: 10,
    },
    text: {

        zIndex: 0,
        color: colors.orange,
        fontSize: 13,
        ...common.RegularFont,
    },
    inputStyle: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
       // paddingHorizontal: '20%',
       // backgroundColor:'red',
        ...common.BoldFont,
        fontSize:13,
        color:colors.grey3,
        textAlign:'right'
    },
    error: {
        alignSelf: 'flex-start',
        color: colors.error,
        fontSize: 13,
        ...common.BoldFont,
        bottom: 0,
        position:'absolute'
    },
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'transparent',
       // paddingHorizontal: 5,
        // backgroundColor: 'red',
        height: 50,
    },
});
