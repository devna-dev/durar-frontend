import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    content: {
       // marginTop: '10%',

    },
    active_item_text1: {
        fontSize: 13,
        ...common.BoldFont,
        color: colors.grey3
    },
    back_img: {
        width: 14,
        height: 14
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: '3.5%'
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: '3.5%'
    },
    headerTitle: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3
    },
    find: {
        ...common.BlackFont,
        fontSize: 16,
    },
    item_view1: {
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.grey1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,

        marginHorizontal: 3,
        flexDirection: 'row',
    },
    input: {
        alignSelf: 'center',
        width: '95%'
    },
    avatar_view: {
        borderBottomWidth: 1,
        borderColor: colors.grey1,
        paddingVertical: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        paddingRight: 20,
        paddingLeft:15,
        alignItems:'center',
        alignSelf:'center'
    },
    input1: {
        alignSelf: 'center',
    },
    label: {
        fontSize: 14,
        color: colors.primary,
        //paddingHorizontal: '5%',
        textAlignVertical: 'center',
        ...common.BoldFont,
        textAlign: 'left',
        width: '100%',
        alignSelf: 'center'
    },
    inputStyle: {
        ...common.BoldFont,
        fontSize: 13,
        color: colors.grey3,
        textAlign: 'left',
        width: '100%',
        alignSelf: 'center'
    },
    error:{
        ...common.BoldFont,
        fontSize: 12,
        width: '85%',
        alignSelf: 'center',
        color:colors.error
    },
    toast:{
        alignItems:'center'
    }
})
