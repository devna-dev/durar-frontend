import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        width: 194,
        height: 185,
        marginHorizontal:5
    },
    img: {
        width: 194,
        height: 130,
        //resizeMode: 'contain',
        borderRadius:5
    },
    img1: {
        width: '100%',
        height: '100%',
        //resizeMode: 'contain',
        borderRadius:5
    },
    text1: {
        ...common.BoldFont,
        fontSize: 14
    },
    text2: {
        ...common.SemiBoldFont,
        fontSize: 12,
        color:colors.grey3
    },
    text3: {
        ...common.BoldFont,
        fontSize: 12,
        color:colors.white,
        marginBottom:'5%'
    },
    player:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    view:{
        width:100,
        height:3,
        backgroundColor:colors.grey1,
        borderRadius:1.5
    },
    progress:{
        height:'100%'
    }
})