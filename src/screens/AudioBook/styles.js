import {StyleSheet} from 'react-native';
import {colors} from "../../config/styles";

export default StyleSheet.create({
    labelButtonStyle: {
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundedButton: {
        width: '90%',
    },
    recordTextStyle: {
        width: '90%',
        marginTop: '5%',
        marginBottom: '2%',
        textAlign: 'center',
        lineHeight: 28,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'right',
        paddingRight: 40,
    },
});
