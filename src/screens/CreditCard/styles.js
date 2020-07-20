import { StyleSheet } from 'react-native';
import common from "../../styles/common.style";
import { colors } from "../../config/styles";

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
    small_input: {
        height: 70,
        width: '45%',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingHorizontal: '5%',
    },
    label: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: colors.primary,
        //paddingHorizontal: '5%',
        textAlignVertical: 'center',
        ...common.BoldFont,
        // backgroundColor:'red'
    },
    subContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        ...common.RegularFont,
        marginTop: '5%',
        paddingHorizontal: '5%',
        height: 50,
        textAlign: 'right'
    },
    btn1: {
        width: '90%',
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        marginVertical: '10%'
    },
    monthText: {
        alignSelf: 'center',
        paddingTop: '2%',
        ...common.RegularFont,
        color: colors.red
    }
})
