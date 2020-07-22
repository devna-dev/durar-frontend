import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, NavigationActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Walkthrough from '../screens/Wallthrough/Wallthrough';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import RecoverPassword from '../screens/RecoverPassword/RecoverPassword';
import { Text, TouchableOpacity, View } from 'react-native';
import VerificationCode from '../screens/VerificationCode/VerificationCode';
import Register from '../screens/Register/Register';
import RecoverVerificationCode from '../screens/RecoverVerificationCode/RecoverVerificationCode';
import Home from '../screens/Home/Home';
import { colors } from '../config/styles';
import common from '../styles/common.style';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../assets/svg/svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Search from '../screens/Search/Search';
import Settings from '../screens/Settings/Settings';
import Search1 from '../screens/Search/Search1';
import UploadVoiceBook from '../screens/UploadVoiceBook/UploadVoiceBook';
//import DonatedBook from '../screens/DonatedBook/DonatedBook';
import DonatedWays from '../screens/DonatedWays/DonatedWays';
import CreditCard from '../screens/CreditCard/CreditCard';
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
import TermsAndConditions from "../screens/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../screens/PrivacyPolicy/PrivacyPolicy";
import SubCategory from "../screens/Library/SubCategory";
import SeminarActivity from "../screens/Activity/SeminarActivity";
import AudioBook from "../screens/AudioBook/AudioBook";
import Badges from "../screens/Badges/Badges";

const Drawer = createDrawerNavigator();
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

const HomeStack = createStackNavigator();
function HomeStackNavigator() {

  return (
    <HomeStack.Navigator initialRouteName="Home" headerMode='none' >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <HomeStack.Screen name="DonatedWays" component={DonatedWays} />
      <HomeStack.Screen name="CreditCard" component={CreditCard} />
      <HomeStack.Screen name="Notifications" component={Notifications} />
      <HomeStack.Screen name="AboutApp" component={AboutApp} />
      <HomeStack.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <HomeStack.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <HomeStack.Screen name="Support" component={Support} />
      <HomeStack.Screen name="NotificationsList" component={NotificationsList} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="NotesBook" component={NotesBook} />
      <HomeStack.Screen name="Activities" component={Activities} />
      <HomeStack.Screen name="Activity" component={Activity} />
      <HomeStack.Screen name="SeminarActivity" component={SeminarActivity} />
      <HomeStack.Screen name="Badges" component={Badges} />
      <HomeStack.Screen name="Discussions" component={Discussions} />
      <HomeStack.Screen name="Thesis" component={Thesis} />
      <HomeStack.Screen name="SystemPoints" component={SystemPoints} />
      <HomeStack.Screen name="Book" component={Book} />
      <HomeStack.Screen name="ReadingPage" component={ReadingPageNavigator} />
      <HomeStack.Screen name="HistoryCategories" component={HistoryCategories} />
      <HomeStack.Screen name="MyBooks" component={MyBooks} />
      <HomeStack.Screen name="AudioBooks" component={AudioBooks} />
      <HomeStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <ActivityStack.Screen name="SubCategory" component={SubCategory} />
      <HomeStack.Screen name="AudioBook" component={AudioBook} />
    </HomeStack.Navigator>
  );
}

const RegisterStack = createStackNavigator();
function RegisterStackNavigator() {
  return (
    <RegisterStack.Navigator initialRouteName="Search1" headerMode='none' >
      <RegisterStack.Screen name="Search1" component={Search1} />
      <RegisterStack.Screen name="Search" component={Search} />
    </RegisterStack.Navigator>
  );
}

const ActivityStack = createStackNavigator();
function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator initialRouteName="Library" headerMode='none' >
      <ActivityStack.Screen name="HistoryCategories" component={HistoryCategories} />
      <ActivityStack.Screen name="Library" component={Library} />
      <ActivityStack.Screen name="SubCategory" component={SubCategory} />
      <ActivityStack.Screen name="AudioBook" component={AudioBook} />
      <SavingBoooksStack.Screen name="Book" component={Book} />
      <SavingBoooksStack.Screen name="ReadingPage" component={ReadingPageNavigator} />
    </ActivityStack.Navigator>
  );
}

const SavingBoooksStack = createStackNavigator();
function SavingBoooksStackNavigator() {
  return (
    <SavingBoooksStack.Navigator initialRouteName="Activities" headerMode='none' >
      <SavingBoooksStack.Screen name="Home" component={Home} />
      <SavingBoooksStack.Screen name="Settings" component={Settings} />
      <SavingBoooksStack.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <SavingBoooksStack.Screen name="DonatedWays" component={DonatedWays} />
      <SavingBoooksStack.Screen name="CreditCard" component={CreditCard} />
      <SavingBoooksStack.Screen name="Notifications" component={Notifications} />
      <SavingBoooksStack.Screen name="AboutApp" component={AboutApp} />
      <SavingBoooksStack.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <SavingBoooksStack.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <SavingBoooksStack.Screen name="Support" component={Support} />
      <SavingBoooksStack.Screen name="NotificationsList" component={NotificationsList} />
      <SavingBoooksStack.Screen name="Profile" component={Profile} />
      <SavingBoooksStack.Screen name="NotesBook" component={NotesBook} />
      <SavingBoooksStack.Screen name="Activities" component={Activities} />
      <SavingBoooksStack.Screen name="Activity" component={Activity} />
      <SavingBoooksStack.Screen name="SeminarActivity" component={SeminarActivity} />
      <SavingBoooksStack.Screen name="Discussions" component={Discussions} />
      <SavingBoooksStack.Screen name="Thesis" component={Thesis} />
      <SavingBoooksStack.Screen name="SystemPoints" component={SystemPoints} />
      <SavingBoooksStack.Screen name="Badges" component={Badges} />
      <SavingBoooksStack.Screen name="Book" component={Book} />
      <SavingBoooksStack.Screen name="ReadingPage" component={ReadingPageNavigator} />
      <SavingBoooksStack.Screen name="HistoryCategories" component={HistoryCategories} />
      <SavingBoooksStack.Screen name="MyBooks" component={MyBooks} />
      <SavingBoooksStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <SavingBoooksStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <SavingBoooksStack.Screen name="AudioBook" component={AudioBook} />
    </SavingBoooksStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="MyBooks" headerMode='none' >
      <ProfileStack.Screen name="MyBooks" component={MyBooks} />
      <ProfileStack.Screen name="Book" component={Book} />
      <ProfileStack.Screen name="ReadingPage" component={ReadingPageNavigator} />
      <ProfileStack.Screen name="NotificationsList" component={NotificationsList} />
      <ProfileStack.Screen name="Home" component={Home} />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="UploadVoiceBook" component={UploadVoiceBook} />
      <ProfileStack.Screen name="DonatedWays" component={DonatedWays} />
      <ProfileStack.Screen name="CreditCard" component={CreditCard} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen name="AboutApp" component={AboutApp} />
      <ProfileStack.Screen name="SuggestionBooks" component={SuggestionBooks} />
      <ProfileStack.Screen name="DownloadedBooks" component={DownloadedBooks} />
      <ProfileStack.Screen name="Support" component={Support} />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="NotesBook" component={NotesBook} />
      <ProfileStack.Screen name="Activities" component={Activities} />
      <ProfileStack.Screen name="SeminarActivity" component={SeminarActivity} />
      <ProfileStack.Screen name="Activity" component={Activity} />
      <ProfileStack.Screen name="Discussions" component={Discussions} />
      <ProfileStack.Screen name="Thesis" component={Thesis} />
      <ProfileStack.Screen name="SystemPoints" component={SystemPoints} />
      <ProfileStack.Screen name="Badges" component={Badges} />
      <ProfileStack.Screen name="HistoryCategories" component={HistoryCategories} />
      <ProfileStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <ProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <ProfileStack.Screen name="AudioBook" component={AudioBook} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const user = useSelector(state => state.user);
  const isLoggedIn = !!user?.token;
  return (
    <Tab.Navigator
      screenOptions={({ route, descriptors, jumpToIndex, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
                  style={{ marginTop: 10 }}
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Register" component={RegisterStackNavigator} />
      <Tab.Screen name="Activity" component={ActivityStackNavigator} />
      <Tab.Screen name="SavingBooks" component={SavingBoooksStackNavigator} />
      {isLoggedIn && <Tab.Screen name="Profile" component={ProfileStackNavigator} />}
    </Tab.Navigator>
  );
}

const MainDrawer = createDrawerNavigator();
function MainDrawerNavigator() {
  const user = useSelector(state => state.user);
  const isLoggedIn = !!user?.token;
  return (
    <MainDrawer.Navigator
      drawerPosition={'right'}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} token_fixed={isLoggedIn} />}>
      <MainDrawer.Screen name="Home" component={TabNavigator} />
    </MainDrawer.Navigator>
  );
}


const Stack = createStackNavigator();
const MainNavigator = ({ user }) => {
  const isLoggedIn = !!user?.token;
  return (
    <Stack.Navigator headerMode='none' initialRouteName={isLoggedIn ? "App" : "Walkthrough"}>
      {!isLoggedIn && <Stack.Screen name="Walkthrough" component={Walkthrough} />}
      {!isLoggedIn && <Stack.Screen name="Login" component={Login} />}
      {!isLoggedIn && <Stack.Screen name="RecoverPassword" component={RecoverPassword} />}
      {!isLoggedIn && <Stack.Screen name="VerificationCode" component={VerificationCode} />}
      {!isLoggedIn && <Stack.Screen name="Register" component={Register} />}
      {!isLoggedIn && <Stack.Screen name="RecoverVerificationCode" component={RecoverVerificationCode} />}

      <Stack.Screen name='App' component={MainDrawerNavigator} />
    </Stack.Navigator>
  )
};

export default AppNavigator = () => {
  const user = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <MainNavigator user={user} />
    </NavigationContainer>
  );
};
