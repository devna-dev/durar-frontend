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
        //height: 323,
        //paddingTop: 20,
        backgroundColor: colors.white,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        position: 'absolute', //Here is the trick
        bottom: 0,
        width: '100%',
    },
    bar1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },
    text3: {
        ...common.BoldFont,
        fontSize: 14,
        alignSelf: 'center'
    },
    text: {
        ...common.BoldFont,
        fontSize: 14,
        marginHorizontal: '6%'
    },
    text1: {
        ...common.SemiBoldFont,
        fontSize: 13,
        marginHorizontal: '6%',
        color: colors.grey3
    },
    upload_view: {
        width: '90%',
        alignSelf: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: colors.grey2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 50,
        marginBottom:'20%'
    },
    book_view: {
        height: 125,
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
    input: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3,
        width: '100%',
        textAlignVertical:'top',
        height:'100%'
    },
    btn:{
        width:'90%',
        backgroundColor:colors.primary,
        alignSelf:'center',
        height:50,
        borderRadius:10,
        marginBottom:'5%'
    }
})