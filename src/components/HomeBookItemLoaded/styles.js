import {StyleSheet} from 'react-native';
import common from "../../styles/common.style";
import {colors} from "../../config/styles";

export default StyleSheet.create({
    container: {
        height: 120,
        width: '90%',
        marginRight: 7,
        backgroundColor: colors.grey1,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: '2%'
    },
    img: {
        height: 130,
        width: 100,
        resizeMode: 'contain',
        borderRadius: 5
    },
    text1: {
        ...common.BlackFont,
        fontSize: 12
    },
    text2: {
        ...common.SemiBoldFont,
        fontSize: 13,
        color: colors.grey3
    },
    text3: {
        ...common.BoldFont,
        fontSize: 13,
    },
    player: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        width: 100,
        height: 3,
        backgroundColor: colors.grey1,
        borderRadius: 1.5
    },
    progress: {
        height: '100%'
    },
    headerItem: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: colors.grey2,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        flex: 1,
        backgroundColor: colors.grey0,
        justifyContent: 'flex-start',

    },
    modalContainer: {

        paddingVertical: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        //position: 'absolute', //Here is the trick
        //bottom: 0,
        width: 340,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    modal_header: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    modal_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 15,

    },
    modal_img: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    modal_text: {
        ...common.MeduimFont,
        fontSize: 16,
        marginLeft: 10,
        alignSelf: 'center',
        width: '90%'
    },
    files: {
        width: '90%',
        alignSelf: 'center',
        height: 35,
        flexDirection:'row',
        justifyContent:'space-between'
    }
})