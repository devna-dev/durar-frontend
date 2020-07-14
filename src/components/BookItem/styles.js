import {StyleSheet,I18nManager} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default StyleSheet.create({
    container: {
      //  height: 191,
        //marginBottom: '5%',
        width: '100%',
        alignSelf: 'center',
        //borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey1
    },
    upper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    right: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    left: {
        width: '50%',
        height: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    text: {
        ...common.BoldFont,
        fontSize: 14
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    description: {
        color: colors.grey3,
        ...common.SemiBoldFont,
        fontSize: 13,
        //marginLeft:40,
        marginVertical:5,
        width:'95%',
        alignSelf:'center'
    },
    right_footer:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    edit:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        height:191,
        backgroundColor:'#CB3F24',
        alignSelf:'center',
        width:'100%'
    },
    edit1:{
        flex: 1, 
        alignSelf: "stretch", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "red",
        width: 65, 
        borderRadius: 5, 
        marginVertical: 5,

        /* alignItems:'center',
        justifyContent:'center',
        //marginBottom:20,
        // height:191,
        backgroundColor:'white',
        alignSelf:'center',
        width:'100%' */
    },
    swipe:{
        backgroundColor:'transparent',


    }
})