import {StyleSheet} from 'react-native'
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default StyleSheet.create({
    container_key1:{
        width:331,
        height:70,
        backgroundColor:colors.white,
        margin:5,
        borderRadius:5,
        paddingHorizontal:'8%',
        flexDirection:'row',
        alignItems:'center'
    },
    container_key2:{
        width:331,
        height:150,
        backgroundColor:colors.white,
        margin:5,
        borderRadius:5,
        paddingHorizontal:'8%',
        alignItems:'center',
        paddingTop:'5%'
    },
    container_key2_upper:{
        width:'100%',
        margin:5,
        backgroundColor:colors.white,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:'5%'
    },
    container_key2_lawer:{
        width:'100%',
        margin:5,
        backgroundColor:colors.white,
        flexDirection:'row',
        alignItems:'center',
    },
    img:{
        width:20,
        height:20,
        borderRadius:10
    },
    img_key_2:{
        width:50,
        height:70,
        borderRadius:5,
        marginHorizontal:2.5
    },
    back_img:{
        marginTop:'25%',
        marginBottom:'15%',
        width:36,
        height:36
    },
    headerTitle:{
        ...common.BoldFont,
        fontSize:16,
        color:colors.primary
    }
})