import {Platform, StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";

export default StyleSheet.create({
    container: {
        height: Platform.OS=='ios'?220:187,
        backgroundColor: 'red',
        paddingHorizontal: 5
    },
    container1: {
        height: Platform.OS=='ios'?215:186.5,
        backgroundColor: 'red',
        marginHorizontal: 6
    },
    content: {
        height: 180,
        backgroundColor: colors.white,
        marginLeft: 40,
        width: 300,
    },
    address_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    address_text: {
        ...common.BlackFont,
        fontSize: 14
    },
    date_text: {
        ...common.SemiBoldFont,
        fontSize: 12,
        color: colors.grey3
    },
    review: {
        alignSelf: 'flex-start'
    },
    description:{
        ...common.SemiBoldFont,
        fontSize: 12,
        color: colors.grey3
    },
    img:{
        width:75,
        height:100,
        borderRadius:5,
        marginTop:'8%'
    }
})
