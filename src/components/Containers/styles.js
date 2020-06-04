import {StyleSheet} from 'react-native';
import {colors} from '../../config/styles';

/**
 * Creates a StyleSheet style reference from the given object.
 * @param {object} style - component styles object.
 * @return {object}
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS ==='ios'?40:0

    },
    drawerContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',

    },
    avatarContainer: {
        height: '20%',
        paddingHorizontal: 30,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    drawerContent: {
        paddingHorizontal: 20,
        paddingVertical:10
    },

    profileInfo: {},
    text: {
        color: colors.textPrimary,
        alignSelf: 'center',
        fontSize: 18
    },
    navBtn: {
        paddingVertical: 12,
        flexDirection: 'row',
        marginHorizontal: '10%'

    },
    lastNavBtn: {},
    drawerFooter: {
        alignItems: 'center',
        padding: 30
    },
    signoutBtn: {
        paddingHorizontal: 50,
        borderRadius: 3
    },
    contentFooter: {
        flex: 1,
        marginHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: colors.grey0,
        marginTop: '10%'
    },
    footerBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 40
    },
    iconStyle: {
        marginHorizontal: 8,
        color: '#82848A'
    },
    image: {width: 24, height: 24, marginHorizontal:5},
    imageSocial: {width: 45, height: 45, marginHorizontal:5},

});
