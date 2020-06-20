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
    },
    back_img1: {
        width: 30,
        height: 30,
        marginHorizontal: 15
    },
    header0: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: '3.5%'
    },
    headerTitle: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 10,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.grey1,
        //marginTop: '6%',
        marginBottom: '3%',
        borderRadius: 5
    },
    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        // paddingHorizontal: '1.5%',
        width: 331,
        alignSelf: 'center',
        backgroundColor: colors.grey1,
        marginBottom: '3%',
        borderRadius: 5
    },
    header2: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: '1.5%',
        width: '90%',
        alignSelf: 'center',
        marginBottom: '3%',
        borderRadius: 25
    },
    input: {
        ...common.RegularFont,
        width: '80%',
        textAlignVertical: 'center'
    },
    item_view: {
        width: 160,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        alignSelf: 'center',
        flexDirection: 'row',
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
    find: {
        ...common.BlackFont,
        fontSize: 16,
        marginHorizontal: '10%'
    },
    bar4: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        borderWidth: 1,
        borderColor: colors.grey1,
        borderRadius: 10,
        marginBottom: 10
    },
    text3: {
        ...common.BoldFont,
        fontSize: 14,
        alignSelf: 'center',
        color: colors.grey3,
        textAlignVertical: 'center'
    },
    diff_view: {
        width: '90%',
        height: 150,
        borderRadius: 5,
        borderColor: colors.grey2,
        borderWidth: 1,
        marginVertical: 5,
        alignSelf: 'center',
        paddingHorizontal:10
    },
    address_text: {
        ...common.BoldFont,
        fontSize: 16,
        color: colors.grey3
    },
    edit:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        height:191,
        backgroundColor:'red',
        alignSelf:'center',
        width:'100%'
    },
    edit1:{
        alignItems:'center',
        justifyContent:'center',
        //marginBottom:20,
        // height:191,
        backgroundColor:'white',
        alignSelf:'center',
        width:'100%'
    },
    swipe:{
        backgroundColor:'transparent',

    }

})