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
        paddingHorizontal: '3.5%',
        marginVertical: '5%'
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
    label: {
        fontSize: 14,
        color: colors.primary,
        marginVertical: '5%',
        textAlignVertical: 'center',
        ...common.BoldFont,
        textAlign: 'left',
        width: '92%',
        alignSelf: 'center'
    },
    book_view: {
        height: 70,
        width: '90%',
        borderRadius: 10,
        borderColor: colors.grey1,
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%',
        marginBottom: '5%'
    },
    book_view1: {
        height: 110,
        width: '90%',
        borderRadius: 10,
        borderColor: colors.grey1,
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '3%',
        borderStyle: 'dashed',
        marginTop: '5%'
    },
    book_label: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3
    },
    book_label1: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3,
        textAlign: 'left',
        width: '80%',
        alignSelf: 'flex-start',
        marginHorizontal: '5%'
    },
    add: {
        height: 82,
        width: 60,
        backgroundColor: colors.grey1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn1: {
        width: '90%',
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        marginVertical: '10%'
    },
    input: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3,
        width: '100%'
    },
    labelStyle: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color:colors.grey3
    }
})
