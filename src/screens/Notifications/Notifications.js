import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import Switch from "../../components/Switch/Switch";
import {colors} from "../../config/styles";
import common from "../../styles/common.style";


export default class Notifications extends Component {


    constructor(props) {
        super(props);
        this.state = {
            all:true,
            version:true,
            recommended:false,

        };
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                    <SvgUri style={styles.back_img}
                            uri={svg_photo.back}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> إعدادات الإشعارات</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <Text style={styles.find}>وضع الإشعارات</Text>
                        <Switch value={this.state.all}
                                onChange={(value)=>{
                                    this.setState({all:!this.state.all})
                                if(this.state.all!==false){
                                    this.setState({
                                        version:false,
                                        recommended:false,
                                    })
                                }
                                }}/>
                    </View>

                    <View style={styles.header1}>
                        <Text style={[styles.find,{...common.BoldFont,fontSize:14}]}>عند وصول أي إصدارات جديده</Text>
                        <Switch value={this.state.version}
                                onChange={()=>{this.setState({version:!this.state.version})}}/>
                    </View>

                    <View style={[styles.header1,{backgroundColor:colors.grey1}]}>
                        <Text style={styles.headerTitle}>عن التوصيه ببعض الكتب</Text>
                        <Switch value={this.state.recommended}
                                onChange={()=>{this.setState({recommended:!this.state.recommended})}}/>
                    </View>

                    {/*<View style={[styles.header1,{backgroundColor:colors.grey1}]}>*/}
                        {/*<Text style={styles.headerTitle}>عند وصول أي إصدارات جديده</Text>*/}
                        {/*<Switch value={false}*/}
                                {/*onChange={()=>{}}/>*/}
                    {/*</View>*/}

                    {/*<View style={[styles.header1,{backgroundColor:colors.grey1}]}>*/}
                        {/*<Text style={styles.headerTitle}>عن التوصيه ببعض الكتب</Text>*/}
                        {/*<Switch value={false}*/}
                                {/*onChange={()=>{}}/>*/}
                    {/*</View>*/}
                </Content>
            </Container>
        )
    }
}