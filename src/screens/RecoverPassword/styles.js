import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    content: {
        marginTop: '10%'
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
    back_img: {
        width: 30,
        height: 25
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal:'3.5%'
    },
    headerTitle:{
        ...common.BlackFont,
        fontSize:18
    }
})
