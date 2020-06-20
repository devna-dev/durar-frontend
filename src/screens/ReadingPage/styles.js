import {Platform, StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default StyleSheet.create({
    header: {
        height: 60,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    headerItem: {
        height: 40,
        width: 40,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.grey2
    },
    footer: {
        height: 60,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center',
        borderColor: colors.grey2,
        borderTopWidth: 1
    },
    diff_view: {
        width: '90%',
        height: 115,
        borderRadius: 5,
        borderColor: colors.grey2,
        borderWidth: 1,
        marginVertical: 5,
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    address_text: {
        ...common.BoldFont,
        fontSize: 16,
        color: colors.grey3,

    },
    search_bar: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginTop: Platform.OS=='ios'?90:60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        ...common.RegularFont,
        fontSize: 14,
        paddingHorizontal: 15,
        width: '90%',
        textAlign:'right',
    },
    item1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        height: 50,
        alignItems: 'center',
        width:'90%',
        alignSelf:'center'
    },
    item_text: {
        borderBottomColor: colors.grey2,
        borderBottomWidth: 1,
        height: 50,
        textAlignVertical: 'center',
        ...common.BoldFont,
        fontSize: 16,
    },
    item1_text: {
        height: 50,
        textAlignVertical: 'center',
        ...common.BoldFont,
        fontSize: 14,
        color:colors.grey3
    },
    item2_text: {

        height: 50,
        textAlignVertical: 'center',
        ...common.SemiBoldFont,
        fontSize: 13,
        color:colors.grey3
    }
})
