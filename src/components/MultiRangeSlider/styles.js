import {StyleSheet} from 'react-native';
import {colors} from '../../config/styles';
import common from '../../styles/common.style';
/**
 * Creates a StyleSheet style reference from the given object.
 * @param {object} style - component styles object.
 * @return {object}
 */
export default StyleSheet.create({
    step: {
        flexDirection : 'column' , 
        justifyContent : 'center',
        alignContent : 'center',
        alignItems : 'center'
    },
    stepDash : {
        width : 1,
        height : 8,
        backgroundColor : colors.veryLightPinkTwo,
        borderRadius :1,
    } ,
    stepText :{
        ...common.RegularFont,
        fontSize : 10 , 
        color :colors.grey3
    },
    stepsContainer : {
        flexDirection : 'row' , 
        justifyContent : 'space-between',
        alignContent : 'flex-start',
        alignItems : 'flex-start' ,
    }
});
