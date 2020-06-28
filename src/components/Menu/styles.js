import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";
import common from "../../styles/common.style";

export default StyleSheet.create({
    svg_view: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.grey2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    item: {
        paddingHorizontal: 5,
    justifyContent: 'center',
        // height:55,
        //alignItems:'center'
    },
    item1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderBottomColor: colors.grey2,
        borderBottomWidth: 1,
        height: 50,
        alignItems: 'center'
    },
    item_text: {
        borderBottomColor: colors.grey2,
        borderBottomWidth: 1,
        height: 50,
        textAlignVertical: 'center',
        ...common.BoldFont,
        fontSize: 16,
    },
    item1_text: {
        // height: 50,
        textAlignVertical: 'center',
        ...common.BoldFont,
        fontSize: 14,
        color:colors.grey3,
    },
    item2_text: {
        // height: 50,
        textAlignVertical: 'center',
        ...common.SemiBoldFont,
        fontSize: 13,
        color:colors.grey3
    }
})
