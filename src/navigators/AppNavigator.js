import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Walkthrough from "../screens/Wallthrough/Wallthrough";
import {createStackNavigator} from '@react-navigation/stack';
import Login from "../screens/Login/Login";
import RecoverPassword from "../screens/RecoverPassword/RecoverPassword";
import {Text, View} from "react-native";
import VerificationCode from "../screens/VerificationCode/VerificationCode";
import Register from "../screens/Register/Register";
import RecoverVerificationCode from "../screens/RecoverVerificationCode/RecoverVerificationCode";
import Home from "../screens/Home/Home";
import {colors} from "../config/styles";
import common from "../styles/common.style";
import {SvgUri} from "react-native-svg";
import {svg_photo} from "../assets/svg/svg";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomDrawerContent from "../components/CustomDrawerContent/CustomDrawerContent";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from "../screens/Search/Search";
import Settings from "../screens/Settings/Settings";
import Search1 from "../screens/Search/Search1";
import UploadVoiceBook from "../screens/UploadVoiceBook/UploadVoiceBook";
import DonatedBook from "../screens/DonatedBook/DonatedBook";
import Notifications from "../screens/Notifications/Notifications";
import AboutApp from "../screens/AboutApp/AboutApp";
import SuggestionBooks from "../screens/SuggestionBooks/SuggestionBooks";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Walkthrough" headerMode={'none'}>
                <Stack.Screen name="Walkthrough" component={Walkthrough}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="RecoverPassword" component={RecoverPassword}/>
                <Stack.Screen name="VerificationCode" component={VerificationCode}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="RecoverVerificationCode" component={RecoverVerificationCode}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route, descriptors}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? svg_photo.active_home : svg_photo.not_active_home;
                    } else if (route.name === 'Register') {
                        iconName = focused ? svg_photo.active_search : svg_photo.not_active_search;
                    } else if (route.name === 'Activity') {
                        iconName = focused ? svg_photo.pages : svg_photo.not_active_pages;
                    } else if (route.name === 'SavingBooks') {
                        iconName = focused ? svg_photo.not_active_saved : svg_photo.active_shaved;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? svg_photo.not_active_books : svg_photo.my_books;
                    }
                    return <View
                        style={{alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column'}}>
                        <View>
                                <SvgUri width={20} height={20}
                                        uri={iconName}
                                        style={{marginTop: 10}}
                                />
                            {focused && <View style={{
                                width: 5,
                                height: 5,
                                backgroundColor: colors.textPrimary,
                                borderRadius: 2.5,
                                alignSelf: 'center',
                                marginTop: '5%'
                            }}/>
                            }
                        </View>

                    </View>;
                },
            })}
            tabBarOptions={{
                activeTintColor: colors.primary,
                inactiveTintColor: colors.grey3,
                showLabel: false,
                style: {
                    height: Platform.OS == 'ios' ? 100 : 60,
                    backgroundColor: 'white',
                },
            }}
        >

            <Tab.Screen name="Home" component={DrawerNavigator}/>
            <Tab.Screen name="Register" component={DrawerNavigator1}/>
            <Tab.Screen name="Activity" component={DrawerNavigator2}/>
            <Tab.Screen name="SavingBooks" component={DrawerNavigator3}/>
            <Tab.Screen name="Profile" component={DrawerNavigator4}/>

        </Tab.Navigator>
    );

}

export function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerPosition={'right'} initialRouteName="Home"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="UploadVoiceBook" component={UploadVoiceBook}/>
            <Drawer.Screen name="DonatedBook" component={DonatedBook}/>
            <Drawer.Screen name="Notifications" component={Notifications}/>
            <Drawer.Screen name="AboutApp" component={AboutApp}/>
            <Drawer.Screen name="SuggestionBooks" component={SuggestionBooks}/>
        </Drawer.Navigator>
    );
}
export function DrawerNavigator1() {
    return (
        <Drawer.Navigator drawerPosition={'right'} initialRouteName="Search1"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Search1" component={Search1}/>
            <Drawer.Screen name="Search" component={Search}/>
        </Drawer.Navigator>
    );
}
export function DrawerNavigator2() {
    return (
        <Drawer.Navigator drawerPosition={'right'} initialRouteName="Home"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}/>
        </Drawer.Navigator>
    );
}
export function DrawerNavigator3() {
    return (
        <Drawer.Navigator drawerPosition={'right'} initialRouteName="Home"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}/>
        </Drawer.Navigator>
    );
}
export function DrawerNavigator4() {
    return (
        <Drawer.Navigator drawerPosition={'right'} initialRouteName="Home"
                          drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}/>
        </Drawer.Navigator>
    );
}