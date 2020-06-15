import {StyleSheet} from 'react-native'
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default StyleSheet.create({
    container:{
        width:155,
        height:120,
        backgroundColor:colors.grey2,
        margin:5,
        borderRadius:5,
        paddingLeft:'8%',
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