import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    content: {
        //  marginTop: '5%',
        backgroundColor: 'white'
    },
    back_img: {
        width: 30,
        height: 25,
        marginHorizontal: '5%'
    },
    back_img1: {
        width: 30,
        height: 30,
        marginHorizontal: '5%',
        borderRadius: 15,
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        // paddingHorizontal: '1.5%',
        width: 333,
        alignSelf: 'center',
        backgroundColor: colors.grey1,
        marginBottom: '3%',
        borderRadius: 5
    },
    item_view: {
        width: 157,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    item_view1: {
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.grey1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
        marginHorizontal: 3,
        flexDirection: 'row',
    },
    item_text: {
        fontSize: 14,
        ...common.BlackFont,
    },
    item_text1: {
        fontSize: 14,
        ...common.BlackFont,
        marginVertical: '5%',
        marginHorizontal: '7%'
    },
    active_item_text: {
        fontSize: 14,
        ...common.BoldFont,
        color: colors.grey3
    },
    active_item_text1: {
        fontSize: 13,
        ...common.BoldFont,
        color: colors.grey3
    },
    active_item_text2: {
        fontSize: 13,
        ...common.BoldFont,
        color: colors.grey3,
        marginHorizontal: '10%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: '2%',
        width: 281,
        alignSelf: 'center',
        backgroundColor: colors.grey1,
        borderRadius: 5
    },
    input: {
        ...common.BoldFont,
        width: 230,
        textAlignVertical: 'center',
        fontSize:14
    },
    search_view: {
        flexDirection: 'row',
        alignItems:'center',
        alignSelf:'center',
        marginTop: '6%',
        marginBottom: '3%',
        justifyContent:'space-between',
        width:331
    },
    sort:{
backgroundColor:colors.grey1,
        alignSelf:'center',
        width:40,
        height:40,
        justifyContent:'center',
        borderRadius: 5,
        alignItems:'center'
    }
})