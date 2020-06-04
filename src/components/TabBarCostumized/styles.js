import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../config/styles';
import common from '../../styles/common.style';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 24,
    },
    list: {
        width : '100%',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 10,
        backgroundColor: 'transparent',
    },
    listView: {
        width : '100%',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 75,
        shadowColor: '#293340',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.4,
        // shadowRadius: 5.00,

        elevation: 24,
    },
    itemText: {
        ...common.RegularFont,
        fontSize: 12,
        height: 15,
    },
    itemImage: {
        width: 17.64,
        height: 20.58,
    },
    itemImage1: {
        width: 22,
        height: 20.58,
    },
    backImage: {width: 75, height: 91, alignItems: 'center', justifyContent: 'center'},
});
