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
    logo: {
        alignSelf: 'center',
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
        height: 70,
        paddingHorizontal: '3.5%',
        borderColor:colors.grey2,
        borderBottomWidth:1
    },
    headerTitle: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3
    },
    headerTitle1: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3,
        width:'90%',
        alignSelf:'center',
        textAlign:'center'
    },
    find: {
        ...common.BlackFont,
        fontSize: 16,
        alignSelf:'center'
    },
    btn1:{
        width:'90%',
        backgroundColor:colors.primary,
        alignSelf:'center',
        height:50,
        borderRadius:10,
        marginTop:'5%'
    },
})
