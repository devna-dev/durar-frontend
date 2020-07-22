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
        //resizeMode: 'contain',
        borderRadius:5
    },
    homeText: {
        ...common.BlackFont,
        fontSize: 12,
        height:50,
        width:'95%',
        textAlign:'left'
    },
    text1: {
        ...common.BlackFont,
        fontSize: 12,
        height:20,
        width:'95%'
    },
    text2: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color:colors.grey3,
        height:20,
        width:'95%'
    },
    text3: {
        ...common.BoldFont,
        fontSize: 12,
    },
    player:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-start'
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