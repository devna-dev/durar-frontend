import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        height: 181,
        width: 100,
        marginRight: 7
    },
    img: {
        height: 130,
        width: 100,
        resizeMode: 'contain',
        borderRadius:5
    },
    text1: {
        ...common.BlackFont,
        fontSize: 12
    },
    text2: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color:colors.grey3
    },
    text3: {
        ...common.BoldFont,
        fontSize: 12,
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