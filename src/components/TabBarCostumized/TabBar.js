import {Image, Text, View, FlatList} from 'react-native';
import React, {Component} from 'react';
import {Tab} from './Tab';
import styles from './styles';
import {colors} from '../../config/styles';
import svg_photo from '../../assets/images/svg/svg_photo';

export const TabBar =  (props) => {
    console.log(props.type);

    return (
        <View style={styles.listView}>
            <Tab type={props} item={{
                name: 'Dashboard',
                route: 'Home',
                type: 'Home',
                image: props.type == 'Home' ? svg_photo.play
                    : svg_photo.play,
                back: props.type === 'Home' ? require('../../assets/images/bg6.png') : null,
                color: props.type !== 'Home' ? colors.black : colors.twitter
            }} navigation={props.navigation}/>
            <Tab item={{
                name: 'Inbox',
                route: 'Inbox',
                type: 'Inbox',
                image: props.type == 'Inbox' ? svg_photo.play
                    : svg_photo.play,
                back: props.type === 'Inbox' ? require('../../assets/images/bg6.png') : null,
                color: props.type !== 'Inbox' ? colors.black : colors.twitter
            }} navigation={props.navigation}/>
            <Tab item={{
                name: 'Create',
                route: 'Create',
                type: 'Create',
                image: props.type == 'Create' ? svg_photo.play
                    : svg_photo.play,
                back: props.type === 'Create' ? require('../../assets/images/bg6.png') : null,
                color: props.type !== 'Create' ? colors.black : colors.twitter
            }} navigation={props.navigation}/>
            <Tab item={{
                name: 'Alerts',
                route: 'Approvals',
                type: 'Approvals',
                image: props.type == 'Approvals' ? svg_photo.play
                    : svg_photo.play,
                back: props.type === 'Approvals' ? require('../../assets/images/bg6.png') : null,
                color: props.type !== 'Approvals' ? colors.black : colors.twitter
            }} navigation={props.navigation}/>
            <Tab item={{
                name: 'Profile',
                route: 'Profile',
                type: 'Profile',
                image: props.type == 'Profile' ? svg_photo.play
                    : svg_photo.play,
                back: props.type === 'Profile' ? require('../../assets/images/bg6.png') : null,
                color: props.type !== 'Profile' ? colors.black : colors.twitter
            }} navigation={props.navigation}/>
        </View>
    );


};
