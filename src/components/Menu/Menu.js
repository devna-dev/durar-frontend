import React, {Component} from 'react';
import Container from "../Containers/Container";
import Content from "../Containers/Content";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {svg_photo} from "../../assets/svg/svg";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import storage from "../../config/storage";
import {colors} from "../../config/styles";

let back = colors.white;
export default class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        // setTimeout(async function () {
        //     let moon = await storage.getItem('moon')
        //     switch (moon) {
        //         case 0:
        //             back = colors.white
        //             break;
        //         case 1:
        //             back = colors.black
        //             break;
        //         case 2:
        //             back = '#FFF4E6'
        //             break;
        //     }
        //
        // })
    }

    render() {
        setTimeout(async function () {
            let moon = await storage.getItem('moon')
            switch (moon) {
                case 0:
                    back = colors.white
                    break;
                case 1:
                    back = colors.black
                    break;
                case 2:
                    back = '#FFF4E6'
                    break;
                default:
                    back = colors.white
            }


        })
        return (
            <Container style={{backgroundColor: back}}>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}
                                  style={styles.svg_view}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.close}/>
                </TouchableOpacity>
                <Content>
                    <FlatList data={[{}, {}]}
                              renderItem={() => <View style={styles.item}>
                                  <Text style={styles.item_text}>الباب الأول</Text>
                                  <FlatList data={[{}, {}]}
                                            renderItem={() => <View style={styles.item1}>
                                                <Text style={styles.item1_text}>الفصل الأول</Text>
                                                <Text style={styles.item2_text}>من 01 إلى 50</Text>
                                            </View>}
                                  />
                              </View>}/>
                </Content>
            </Container>
        )
    }

}