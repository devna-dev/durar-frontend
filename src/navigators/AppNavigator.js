import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, NavigationActions} from '@react-navigation/native';
import Walkthrough from '../screens/Wallthrough/Wallthrough';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import RecoverPassword from '../screens/RecoverPassword/RecoverPassword';
import {Text, TouchableOpacity, View} from 'react-native';
import VerificationCode from '../screens/VerificationCode/VerificationCode';
import Register from '../screens/Register/Register';
import RecoverVerificationCode from '../screens/RecoverVerificationCode/RecoverVerificationCode';
import Home from '../screens/Home/Home';
import {colors} from '../config/styles';
import common from '../styles/common.style';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../assets/svg/svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Search from '../screens/Search/Search';
import Settings from '../screens/Settings/Settings';
import Search1 from '../screens/Search/Search1';
import UploadVoiceBook from '../screens/UploadVoiceBook/UploadVoiceBook';
import DonatedBook from '../screens/DonatedBook/DonatedBook';
import Notifications from '../screens/Notifications/Notifications';
import AboutApp from '../screens/AboutApp/AboutApp';
import SuggestionBooks from '../screens/SuggestionBooks/SuggestionBooks';
import Support from '../screens/Support/Support';
import DownloadedBooks from '../screens/DownloadedBooks/DownloadedBooks';
import MyBooks from '../screens/MyBooks/MyBooks';
import HistoryCategories from '../screens/HistoryCategories/HistoryCategories';
import Library from '../screens/Library/Library';
import NotificationsList from '../screens/NotificationsList/NotificationsList';
import Profile from '../screens/Profile/Profile';
import Book from '../screens/Book/Book';
import NotesBook from '../screens/NotesBook/NotesBook';
import Activities from '../screens/Activities/Activities';
import Activity from '../screens/Activity/Activity';
import Discussions from '../screens/Discussions/Discussions';
import Thesis from '../screens/Thesis/Thesis';
import SystemPoints from '../screens/SystemPoints/SystemPoints';
import ReadingPage from '../screens/ReadingPage/ReadingPage';
import Menu from '../components/Menu/Menu';
import storage from '../config/storage';
import AudioBooks from '../screens/AudioBooks/AudioBooks';
import Splash from '../screens/Splash/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let user = await storage.getItem('token');
      console.log(user, 'userdfsdf');
      if (user) {
        setUserLoggedIn(true);
      }
    }
    fetchData();
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator initialRouteName="Splash" headerMode={'none'}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ReadingPage" component={ReadingPageNavigator} />
          <Stack.Screen name="Walkthrough" component={Walkthrough} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Splash"
          initialParams={{setUserLoggedIn, isLoggedIn}}
          headerMode={'none'}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Walkthrough" component={Walkthrough} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="VerificationCode" component={VerificationCode} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

          <Stack.Screen
            name="RecoverVerificationCode"
            component={RecoverVerificationCode}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export function ReadingPageNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition={'left'}
      initialRouteName="ReadingPage"
      drawerContent={(props) => <Menu {...props} />}>
      <Drawer.Screen name="ReadingPage" component={ReadingPage} />
    </Drawer.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route, descriptors, jumpToIndex, navigation}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? svg_photo.active_home
              : svg_photo.not_active_home;
          } else if (route.name === 'Register') {
            iconName = focused
              ? svg_photo.active_search
              : svg_photo.not_active_search;
          } else if (route.name === 'Activity') {
            iconName = focused ? svg_photo.pages : svg_photo.not_active_pages;
          } else if (route.name === 'SavingBooks') {
            iconName = focused
              ? svg_photo.not_active_saved
              : svg_photo.active_shaved;
          } else if (route.name === 'Profile') {
            iconName = focused
              ? svg_photo.not_active_books
              : svg_photo.my_books;
          }
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                flexDirection: 'column',
              }}>
              <View>
                <SvgUri
                  width={20}
                  height={20}
                  uri={iconName}
                  style={{marginTop: 10}}
                />
                {focused && (
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: colors.textPrimary,
                      borderRadius: 2.5,
                      alignSelf: 'center',
                      marginTop: '5%',
                    }}
                  />
                )}
              </View>
            </View>
          );
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
      }}>
      <Tab.Screen name="Home" component={DrawerNavigator} />
      <Tab.Screen name="Register" component={DrawerNavigator1} />
      <Tab.Screen name="Activity" component={DrawerNavigator2} />
      <Tab.Screen name="SavingBooks" component={DrawerNavigator3} />
      <Tab.Screen name="Profile" component={DrawerNavigator4} />
    </Tab.Navigator>
  );
}

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <Drawer.Screen name="DonatedBook" component={DonatedBook} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="AboutApp" component={AboutApp} />
      <Drawer.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <Drawer.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="NotificationsList" component={NotificationsList} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="NotesBook" component={NotesBook} />
      <Drawer.Screen name="Activities" component={Activities} />
      <Drawer.Screen name="Activity" component={Activity} />
      <Drawer.Screen name="Discussions" component={Discussions} />
      <Drawer.Screen name="Thesis" component={Thesis} />
      <Drawer.Screen name="SystemPoints" component={SystemPoints} />
      <Drawer.Screen name="Book" component={Book} />
      <Drawer.Screen name="HistoryCategories" component={HistoryCategories} />
      <Drawer.Screen name="MyBooks" component={MyBooks} />
      <Drawer.Screen name="AudioBooks" component={AudioBooks} />
    </Drawer.Navigator>
  );
}

export function DrawerNavigator1() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      initialRouteName="Search1"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Search1" component={Search1} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
}

export function DrawerNavigator2() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      initialRouteName="HistoryCategories"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HistoryCategories" component={HistoryCategories} />
      <Drawer.Screen name="Library" component={Library} />
    </Drawer.Navigator>
  );
}

export function DrawerNavigator3() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <Drawer.Screen name="DonatedBook" component={DonatedBook} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="AboutApp" component={AboutApp} />
      <Drawer.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <Drawer.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="NotificationsList" component={NotificationsList} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="NotesBook" component={NotesBook} />
      <Drawer.Screen name="Activities" component={Activities} />
      <Drawer.Screen name="Activity" component={Activity} />
      <Drawer.Screen name="Discussions" component={Discussions} />
      <Drawer.Screen name="Thesis" component={Thesis} />
      <Drawer.Screen name="SystemPoints" component={SystemPoints} />
      <Drawer.Screen name="Book" component={Book} />
      <Drawer.Screen name="HistoryCategories" component={HistoryCategories} />
      <Drawer.Screen name="MyBooks" component={MyBooks} />
    </Drawer.Navigator>
  );
}

export function DrawerNavigator4() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      initialRouteName="MyBooks"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MyBooks" component={MyBooks} />
      <Drawer.Screen name="Book" component={Book} />
      <Drawer.Screen name="NotificationsList" component={NotificationsList} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <Drawer.Screen name="DonatedBook" component={DonatedBook} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="AboutApp" component={AboutApp} />
      <Drawer.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <Drawer.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="NotesBook" component={NotesBook} />
      <Drawer.Screen name="Activities" component={Activities} />
      <Drawer.Screen name="Activity" component={Activity} />
      <Drawer.Screen name="Discussions" component={Discussions} />
      <Drawer.Screen name="Thesis" component={Thesis} />
      <Drawer.Screen name="SystemPoints" component={SystemPoints} />
      <Drawer.Screen name="HistoryCategories" component={HistoryCategories} />
    </Drawer.Navigator>
  );
}
