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
        height: 25
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    back_img1: {
        width: 8,
        height: 8,
        position: 'absolute',
        zIndex: 0,
        top: 0,
        right: 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: '3.5%'
    },
    headerTitle: {
        ...common.BlackFont,
        fontSize: 16
    },
    headerTitle1: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3,
        textDecorationLine: 'underline'
    },
    leftHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    headerItemView: {
        backgroundColor: colors.grey1,
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    text2: {
        ...common.BoldFont,
        fontSize: 16,
        color: '#73726E'
    },
    item_img: {
        width: 327,
        height: 156,
        borderRadius: 5
    },
    item_view: {
        alignSelf: 'center',
        width: 360,
        flexDirection: 'row',
        alignItems: 'center'
    },
    right_side: {
        backgroundColor: colors.grey1,
        width: 10,
        height: 136,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    left_side: {
        backgroundColor: colors.grey1,
        width: 10,
        height: 136,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: '3%'
    },
    bar1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2.22,

        elevation: 8,
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        position:'absolute',
        bottom:0
    },
    btn: {
        width: 150,
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 25,
        marginTop: '2%',
        marginBottom: '5%'
    },
    text: {
        ...common.RegularFont,
        fontSize: 28,
        color: colors.white,
        alignSelf: 'center'
    },
    text1: {
        ...common.BoldFont,
        fontSize: 12,
        color: colors.grey1,
        alignSelf: 'center'
    },
    text3: {
        ...common.BoldFont,
        fontSize: 14,
        alignSelf: 'center'
    },
    bar_item_view: {
        flexDirection: 'row',
        borderRadius: 20,
        width: 150,
        height: 40,
        borderColor: colors.grey1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    }
})