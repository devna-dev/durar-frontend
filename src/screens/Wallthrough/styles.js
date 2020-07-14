import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";

export default StyleSheet.create({
    item_img: {
        height: 270,
        width: 270,
        resizeMode: 'contain'
    },
    paginationContainer: {
        flex: 1,
        alignSelf: 'center',
        // width:'90%',
        //height: 50,
        //backgroundColor: 'yellow',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: colors.grey3,
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colors.primary
    },
    inactiveDotStyle: {
        //backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.grey3
    },
    pagination: {},
    item_view: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent:"center"
    },
    text: {
        ...common.RegularFont,
        fontSize: 24
    },
    text1: {
        ...common.RegularFont,
        fontSize: 14,
        color:colors.grey3,
        textAlign:'center'
    },
    text2: {
        ...common.SemiBoldFont,
        fontSize: 14,
        color:colors.grey3,
        textAlign:'center',
        marginTop:'5%'
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
    btn1:{
        width:'90%',
        backgroundColor:colors.primary,
        alignSelf:'center',
        height:50,
        borderRadius:10
    }
})