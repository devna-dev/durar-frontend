import { StyleSheet, Dimensions } from 'react-native';
import common from '../../styles/common.style';
import { colors } from '../../config/styles';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    content: {
        // marginTop: '10%',
    },
    back_img: {
        width: 14,
        height: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: '3.5%',
    },
    headerTitle: {
        ...common.BoldFont,
        fontSize: 14,
        color: colors.grey3,
    },
    optionContainer: {
        borderColor: colors.grey3,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight / 5,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
    },
    selectedOptionContainer: {
        borderColor: colors.black,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: screenHeight / 5,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
    },
    image: {
        margin: 20,
    },
    title: {
        ...common.BoldFont,
        fontSize: 16,
    },
    subTitle: {
        ...common.RegularFont,
        fontSize: 13,
        color: colors.grey3,
    },
    btn: {
        width: '90%',
        backgroundColor: colors.primary,
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
    },
});
