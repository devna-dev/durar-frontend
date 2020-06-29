import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import Button from "../../components/Button/Button";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {connect} from "react-redux";
import {get_activity_details} from "../../stores/saga/models/activities-store/actions";

class Activity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
            note: false,
            id: props.route.params.id
        }
    }

    componentDidMount() {
        console.log(this.props.route)
        const {id} = this.props.route.params;
        this.props.get_activity_details({id});
        console.log(this.props.activity.activity_details)
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: '5%'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({note: true})}>
                            <Button title={'الدروس العلمية'}
                                    style={styles.btn}
                                    textStyle={styles.text}/>
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.cover_img}
                           source={{
                               uri: this.props.activity.activity_details.image == null ? 'https://www.hiamag.com/sites/default/files/styles/ph2_960_600/public/article/07/03/2019/7841791-1090336005.jpg'
                                   : this.props.activity.activity_details
                           }}/>
                    <Text style={styles.item_text}>{this.props.activity.activity_details.title}</Text>
                    <View style={styles.header1}>
                        <View style={[styles.item_view, {}]}>
                            <Text style={styles.active_item_text}>{this.props.activity.activity_details.lecturer}</Text>
                        </View>
                        <View style={[styles.item_view, {}]}>
                            <Text style={styles.active_item_text}>المدة:{this.props.activity.activity_details.from_time}-{this.props.activity.activity_details.to_time}</Text>
                        </View>
                    </View>
                    <Text style={[styles.active_item_text1,]}>{this.props.activity.activity_details.description}</Text>

                    <ImageBackground source={require('../../assets/images/time_date_back.png')}
                                     style={styles.header}>
                        <View style={{width: '60%'}}>
                            <Text style={[styles.active_item_text, {height: 20, marginTop: 5}]}>الثلاثاء</Text>
                            <Text style={[styles.item_text, {marginVertical: 0}]}>12مايو</Text>
                        </View>
                        <View>
                            <Text style={[styles.active_item_text, {height: 20, marginTop: 5}]}>الساعة</Text>
                            <Text style={[styles.item_text, {marginVertical: 0}]}>5 مساءاً</Text>
                        </View>
                    </ImageBackground>
                    <Button title={'تسجيل'}
                            style={styles.btn1}/>

                </Content>
            </Container>
        )
    }

}


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () => dispatch({
        type: clear,
    }),
    get_activity_details: (form) => dispatch({
        type: get_activity_details,
        form
    }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Activity);