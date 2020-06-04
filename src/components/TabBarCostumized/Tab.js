import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {SvgUri} from 'react-native-svg';

export const Tab = (props) => {
  return (
           <TouchableOpacity style={styles.tab}
                             onPress={() => {
                                 props.navigation.navigate(props.item['route']);
                             }}>
               <View style={styles.backImage}>
                   {/*<Image style={props.item['name'] === 'Home' ? styles.itemImage1 : styles.itemImage}*/}
                   {/*       source={props.item['image']}/>*/}
                   {  props.item['type']== 'Approvals'?
                       <SvgUri width={24} height={22.19}
                           uri={props.item['image']}
                   />:
                       <SvgUri width={18} height={22.19}
                               uri={props.item['image']}
                       />
                   }
                   <Text
                       style={[styles.itemText,{color:props.item['color']}]}>{props.item['name']}</Text>

               </View>
           </TouchableOpacity>
       );

};
