import React, {Component} from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import {FlatList, Text, View, TouchableOpacity,Image,ActivityIndicator} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";
import {colors} from "../../config/styles";
import {get_points} from '../../stores/saga/models/user-store/actions';
import {connect} from 'react-redux';

class Badges extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

     componentDidMount() {
        this.props.getPoints();
    }

    _renderItem = ({item}) => {
        return (
            <View style={[styles.view_item_list,!item.points && {opacity:0.5}]}>
                <Image
                    style={{ width: 80 ,height:80}}
                    source={{uri:item.icon ? item.icon : `https://drr.smartpace.co.uk${item.default_icon}`}}

                />
                <Text style={[styles.item_text1, { fontSize: 13, alignSelf: 'center', width: '100%', textAlign: 'center', paddingHorizontal:2 }]}> {item.title}</Text>
                {item.points && <Text style={[styles.text3, { fontSize: 13 }]}>{item.points}</Text>}
            </View>
        )
    };

    render() {
        let  data = []
        if (this.props.user.points){
         data = [...this.props.user.points.badges, ...this.props.user.points.unfulfilled_achievements];
        }
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.back_view}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                            <Text style={styles.text3}>أوسمتى</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('SystemPoints') }}
                                          style={styles.headerItemView}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.cup}/>
                            <Text style={styles.text2}>{this.props.user.points ? this.props.user.points.total : 0} </Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.user.points && data.length > 0 ? (
                         <FlatList data={data}
                              numColumns={3}
                              style={{alignSelf: 'center',marginTop:10}}
                              renderItem={(item) =>  this._renderItem(item)}
                              /> 
                             
                    ) :
                    (
                        <ActivityIndicator animating={this.props.user.load} color={colors.primary} size={'large'} />
                    )}

                </Content>
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    getPoints: () => dispatch({
        type: get_points,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Badges);
