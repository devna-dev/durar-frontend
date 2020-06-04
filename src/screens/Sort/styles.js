import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";

export default StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: colors.grey0,
        justifyContent: 'flex-start',

    },
    modalContainer: {
        height: 412,
        //paddingTop: 20,
        backgroundColor: colors.white,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        position: 'absolute', //Here is the trick
        bottom: 0,
        width: '100%',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '98%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },
    bar1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        // paddingHorizontal:'5%'
        borderBottomWidth: 1,
        borderBottomColor: colors.grey1
    },
    bar2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey1,
    },
    bar3: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
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
        color: colors.grey3
    },
    active_item_text1: {
        fontSize: 13,
        ...common.BoldFont,
    },
    active_item_text: {
        fontSize: 16,
        ...common.BoldFont,
    },
    item_view1: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginHorizontal: 3,
        flexDirection: 'row',
    },
    footer: {
        backgroundColor: colors.white,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: colors.primary,
        width: 333,
        borderRadius: 10,
        height: 50,
        alignSelf:'center',
        marginBottom:5
    },
    btn1: {
        backgroundColor: colors.white,
        width: 150,
        borderRadius: 10,
        height: 50,
        borderWidth: 1,
        borderColor: colors.grey1,
    }
})