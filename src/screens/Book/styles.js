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
    leftHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%'
    },
    headerItemView: {
        // backgroundColor: colors.grey1,
        height: 40,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    text: {
        ...common.RegularFont,
        fontSize: 32,
        color: colors.white,
        alignSelf: 'center'
    },
    upper: {
        height: 226,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    book: {
        width: 160,
        height: '100%',
        marginLeft:10,
        borderRadius:5
    },
    light_font: {
        ...common.SemiBoldFont,
        fontSize: 14,
        color: colors.grey3,
        width: '100%',
        textAlign: 'left',
        height:35
    },
    dark_font: {
        ...common.SemiBoldFont,
        fontSize: 14,
        color: colors.primary,
        width: '100%',
        textAlign: 'left',
        height:35
    },
    dark_font1: {
        ...common.SemiBoldFont,
        fontSize: 14,
        color: colors.primary,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 111,
        borderRadius: 13,
        borderColor: colors.grey2,
        borderWidth: 1,
        height:35
    },
    dark_font2: {
        ...common.BlackFont,
        fontSize: 22,
        color: colors.primary,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    address_view:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        alignSelf:'center',
        marginTop:'5%'
    },
    description:{
        ...common.SemiBoldFont,
        fontSize: 12,
        color: colors.grey3,
        width:'90%',
        alignSelf:'center'
    },
    headerTitle1: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3,
        textDecorationLine: 'underline'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: '3%'
    },
    btn:{
        width:'90%',
        backgroundColor:colors.secondary,
        alignSelf:'center',
        height:50,
        borderRadius:10,
        marginTop:'10%',
        marginBottom:'5%'
    },
    img:{
        width:90,
        height:130,
        marginHorizontal:5,
        borderRadius:5
    }
})