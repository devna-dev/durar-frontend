import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8'
    },
    logo: {
        alignSelf: 'center',
        marginTop: '10%'
    },
    address: {
        alignSelf: 'center',
        ...common.RegularFont,
        fontSize: 26
    },
    title: {
        alignSelf: 'center',
        ...common.BlackFont,
        fontSize: 18
    },
    input: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#727272",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
        ...common.RegularFont,
        marginTop: '5%',
        paddingHorizontal: '5%',
        height:50,
        textAlign: 'right'
    },
    btn: {
        width: '90%',
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: '10%',
        marginBottom: '5%'
    },
    btn1: {
        width: '90%',
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: '5%'
    },
    text2: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3,
        textAlign: 'center',
        marginTop: '5%',

    },
    error: {
        color: colors.error,
        ...common.BoldFont,
        fontSize: 12,
        width: '85%',
        alignSelf: 'center',
    },
    eye: {

        marginHorizontal: '5%',
    },
    view:{
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: "#727272",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
        ...common.RegularFont,
        marginTop: '5%',
        paddingHorizontal: '5%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input1: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        ...common.RegularFont,
        paddingHorizontal: '5%',
        height: 50,
        textAlign:'right'
    },
})
