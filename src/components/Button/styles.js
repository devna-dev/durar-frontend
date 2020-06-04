import {StyleSheet,  Platform} from 'react-native';
import common from '../../styles/common.style';



/**
 * Creates a StyleSheet style reference from the given object.
 * @param {object} style - component styles object.
 * @return {object}
 */
export default StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        //flex: 1,
        flexDirection:'row',
       // height: 54,

    }, text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        ...common.BoldFont,

    },
    tt:{
        width: 14,
        height: '100%',
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
    },
    tt1:{
        width: 14,
        height: '100%',
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
    },
    indicator:{
        position: 'absolute',
        zIndex: 0,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        height: 50,
        right:(Platform.OS == 'ios') ? 10 : 60,

    }
});
