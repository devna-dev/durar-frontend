import {StyleSheet,Platform,NativeModules} from 'react-native';
import {colors} from '../../config/styles';
import common from '../../styles/common.style';

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
export default StyleSheet.create({
    back_img:{
        margin:20
    },
    text3: {
        ...common.BoldFont,
        fontSize: 14,
        alignSelf: 'center',
        color: colors.grey3
    },
    bar2: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        borderWidth: 1,
        borderTopColor: colors.grey1,
        borderBottomColor: colors.grey1,
    },
});