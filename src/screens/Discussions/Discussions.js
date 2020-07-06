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
import {connect} from "react-redux";
import {get_activities} from "../../stores/saga/models/book-store/actions";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {get_discussions, get_seminars} from "../../stores/saga/models/activities-store/actions";
import {colors} from "../../config/styles";
import {get_discussions_in, get_seminar_in} from "../../services/books";

class Discussions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            loading: true,
            count: 2
        }
        this.page = 1
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.setState({
               activities: [],
               loading: true,
               count: 2
           })
            this.load_more();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    async load_more() {
        if (this.state.count < this.page) {

        }
        else {
            this.setState({loading: true})
            if (this.props.route.params.type == 0) {
                let result = await get_discussions_in(this.page)
                if (result['count'] && result['count'] !== this.page) {
                    ++this.page;
                    this.setState({
                        activities: [...this.state.activities, ...result.results],
                        loading: false,
                        count: result['count']
                    })
                } else {

                }
            } else {
                console.log('sem')
                let result = await get_seminar_in(this.page)
                if (result['count'] && result['count'] !== this.page) {
                    ++this.page;
                    this.setState({
                        activities: [...this.state.activities, ...result.results],
                        loading: false,
                        count: result['count']
                    })
                } else {

                }
            }
            this.setState({loading: false})
        }


        // console.log('d')
        // if (this.props.route.params.type == 0) {
        //     this.props.get_discussions(this.page)
        // } else {
        //     this.props.get_seminars(this.page)
        // }
        // // console.log(this.props.activity.activities.count)
        // if (this.page > this.props.activity.activities.count || this.props.activity.activities.count == 'undefined') {
        //
        // } else {
        //     if (this.props.activity.activities == 'undefined') {
        //         alert('d')
        //     } else {
        //         this.setState({activities: [...this.state.activities, ...this.props.activity.activities.results]})
        //         ++this.page;
        //         console.log('ddddd', this.props.activity.activities)
        //     }
        // }


    }

    render() {
        // alert(this.props.route.params.type)
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.back_view}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.item_text}>{this.props.route.params.type == 0 ? 'مناقشات' : 'ندوات'}</Text>
                    {!this.state.loading && this.state.activities.length == 0 &&
                    <Text style={styles.item_text}>{this.props.route.params.type == 0 ? 'لا توجد أي مناقشات' : 'لا توجد أي ندوات'}</Text>}
                    <FlatList data={this.state.activities}
                              onEndReached={() => this.load_more()}
                              renderItem={(item) => <TouchableOpacity onPress={()=>{
                                  if(this.props.route.params.type == 0){
                                          this.props.navigation.navigate('Activity', {id: item.item.id, dis: this.props.dis})
                                      }else{
                                          this.props.navigation.navigate('SeminarActivity', {id: item.item.id})
                                      }

                              }}
                                  style={{alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
                                  <Image style={styles.cover_img}
                                         source={{uri: item.item.image != null ? item.item.image : 'https://www.hiamag.com/sites/default/files/styles/ph2_960_600/public/article/07/03/2019/7841791-1090336005.jpg'}}/>
                                  <Text style={styles.item_text}>{item.item.title}</Text>
                                  <View style={styles.header1}>
                                      <View style={[styles.item_view, {}]}>
                                          <Text
                                              style={styles.active_item_text}>{item.item.day} / {item.item.date}</Text>
                                      </View>
                                      <View style={[styles.item_view, {}]}>
                                          <Text style={styles.active_item_text}>الساعة: {item.item.from_time}</Text>
                                      </View>
                                  </View>
                              </TouchableOpacity>}/>
                    <ActivityIndicator color={colors.primary} size={'large'} animating={this.state.loading}/>
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
    get_discussions: (form) => dispatch({
        type: get_discussions,
        form
    }),
    get_seminars: (form) => dispatch({
        type: get_seminars,
        form
    }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
});


export default Discussions;
