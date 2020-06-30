import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {
    FlatList,
    TextInput,
    Image,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import HomeBookItem from "../../components/HomeBookItem/HomeBookItem";
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";
import {get_activities} from "../../stores/saga/models/book-store/actions";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {connect} from "react-redux";
import {get_thesis} from "../../stores/saga/models/activities-store/actions";
import Activity from "../Activity/Activity";
import {colors} from "../../config/styles";

class Thesis extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.get_thesis()
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.back_view}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                            <Text style={styles.item_text1}>أطروحات</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.activity.thesis.length != 0 ?
                        <Text style={styles.item_text}> {this.props.activity.thesis.length} أطروحة</Text>
                        :
                        <Text style={styles.item_text}> لا يوجد أي أطروحة</Text>
                    }
                    {this.props.activity.load &&
                    <ActivityIndicator animating={this.props.activity.load} color={colors.primary} size={'large'}/>}
                    {this.props.activity.thesis.length != 0 && <FlatList data={this.props.activity.thesis}
                                                                         renderItem={(item) => <HomeBookItemLoaded
                                                                             search item={item}/>}/>}
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
    get_thesis: () => dispatch({
        type: get_thesis,
    }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Thesis);