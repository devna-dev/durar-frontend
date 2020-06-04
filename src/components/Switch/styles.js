import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        width:52,
        height:32,
        backgroundColor:colors.green1,
        borderRadius:36.5,
        justifyContent:'center',
        paddingHorizontal:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    active:{
        width:28,
        height:28,
        borderRadius:14,
        backgroundColor:colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    not_active:{
        width:52,
        height:32,
        backgroundColor:colors.white,
        borderRadius:36.5,
        justifyContent:'center',
        paddingHorizontal:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

})