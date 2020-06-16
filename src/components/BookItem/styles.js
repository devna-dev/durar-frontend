import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default StyleSheet.create({
    container: {
        height: 191,
        marginBottom: '5%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey1
    },
    upper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    right: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    left: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    text: {
        ...common.BoldFont,
        fontSize: 14
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    description: {
        color: colors.grey3,
        ...common.SemiBoldFont,
        fontSize: 13,
        marginLeft:40,
        marginVertical:5
    },
    right_footer:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    }
})