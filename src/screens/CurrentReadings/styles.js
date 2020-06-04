import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";

export default StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: colors.grey0,
        justifyContent: 'flex-start',

    },
    modalContainer: {
        height: 323,
        //paddingTop: 20,
        backgroundColor: colors.white,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        position: 'absolute', //Here is the trick
        bottom: 0,
        width: '100%',
    },
    bar1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width:0,
        //     height: 2,
        // },
        // shadowOpacity: 0.8,
        // shadowRadius: 2.22,
        //
        // elevation: 8,
        height:50,
        paddingVertical:5,
        backgroundColor:'white',
        paddingHorizontal:'5%'
    },
    text3: {
        ...common.BoldFont,
        fontSize: 14,
        alignSelf: 'center'
    },
})