import {
    StyleSheet,
    Platform,
} from 'react-native';

export const colors = {
    primary: '#21242E',
    secondary: '#FFCA2E',
    green: '#A6CE39',
    lightOliveGreen: '#9eb659',
    orange: '#F26F21',
    orange10 : '#f26f2110',
    orange1: '#f5e9dc',
    gray: '#565656',
    grey0: '#F4F4F4',
    grey1: '#F2F2F2',
    grey2: '#E6E6E6',
    grey3: '#949494',
    grey4: '#707070',
    grey5: '#4b4b4b',
    disabled: '#dadee0',
    white: '#FFFFFF',
    black: '#000000',
    blackWithOpacity : '#00000050',
    facebook: '#2672CB',
    twitter: '#76C0CC',
    twitter1: '#95dce4',
    googlePlus: '#FC3850',
    error: '#ff190c',
    red: '#e82006',
    textPrimary: '#293340',
    dateGreen: '#6d7b6e',
    addressGreen: '#9eb659',
    rateColor: '#274c6d',
    test: '#000077',
    green1: '#4CD964',
    green2:'#0EAD69',
    green3:'#A6CE39',
    darkText : '#293340',
    iceblue : '#f4f6f6',
    orangeRed40: '#f75d34',
    iceGray : '#F4F6F6',
    iceGray1 : '#F4F6F6',
    veryLightPink : '#fff8f3',
    HeavyBlue:'#293340',
    brownisGray : '#70707050',
    paleLilac :'#eaeaeb',
    veryLightPinkTwo : '#e5e5e5',
    errorBackGround:'red',
    SuccessAlertBackGround: 'blue',
    border:'#E0E0E0'
};

export const navigatorStyle = {
    navigationBarColor: 'black',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    navBarBackgroundColor: '#163258',
    statusBarTextColorScheme: 'light',
    navBarHidden: true,
};

export const theme = StyleSheet.create({
    btnLinkTextPrimary: {},
    btnLinkTextSecondary: {
        color: colors.grey3,
        textAlign: 'center',
    },
});


