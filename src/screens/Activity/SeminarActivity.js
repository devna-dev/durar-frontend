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
    Linking,
    RefreshControl
} from "react-native";
import {SvgUri} from "react-native-svg";
import {svg_photo} from '../../assets/svg/svg'
import Button from "../../components/Button/Button";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {connect} from "react-redux";
import {get_activity_details} from "../../stores/saga/models/activities-store/actions";
import {
    get_discussion_details,
    get_sem_details,
    regiter_to_activity,
    regiter_to_discussions
} from "../../services/books";
import {colors} from "../../config/styles";
import common from "../../styles/common.style";
import Moment from 'moment/moment';
import storage from "../../config/storage";

class SeminarActivity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
            note: false,
            id: props.route.params.id,
            success: false,
            loading: false,
            discussion: '',
            access: true
        }
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            this.start()
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    async start() {
        if (await storage.getItem('token')) {
            this.setState({access: true})
        } else {
            this.setState({access: false})
        }
        console.log(this.props.route)
        const {id, dis} = this.props.route.params;
        this.setState({loading: true})

            let discussion = await get_sem_details(id)
            this.setState({discussion})
            console.log('dddddd', discussion)
            //this.props.get_activity_details({id});

        this.setState({loading: false})
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}
                         refreshControl={
                             <RefreshControl
                                 refreshing={this.state.loading}
                                 colors={[colors.primary]}
                                 size={'large'}
                                 onRefresh={async () => {
                                     this.start();
                                 }}
                             />
                         }>
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
                        {/*<TouchableOpacity onPress={() => this.setState({note: true})}>*/}
                        {/*<Button title={'الدروس العلمية'}*/}
                        {/*style={styles.btn}*/}
                        {/*textStyle={styles.text}/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <Image style={styles.cover_img}
                           source={{
                               uri: this.state.discussion.image ? this.state.discussion.image : 'https://alkbraquran.com/wp-content/uploads/2017/03/%D9%A2%D9%A0%D9%A1%D9%A6%D9%A0%D9%A9%D9%A0%D9%A6_%D9%A1%D9%A7%D9%A0%D9%A3%D9%A4%D9%A2.jpg'
                           }}/>
                    <Text style={styles.item_text}>{this.state.discussion.title}</Text>
                    <View style={styles.header1}>
                        <View style={[styles.item_view, {}]}>
                            <Text
                                style={styles.active_item_text}>{this.state.discussion.lecturer}</Text>
                        </View>
                        <View style={[styles.item_view, {}]}>
                            <Text
                                style={styles.active_item_text}>المدة:{this.state.discussion.duration}</Text>
                        </View>
                    </View>
                    <Text
                        style={[styles.active_item_text1,]}>{this.state.discussion.description}</Text>

                    <ImageBackground source={require('../../assets/images/time_date_back.png')}
                                     style={styles.header}>
                        <View style={{width: '60%'}}>
                            <Text style={[styles.active_item_text, {
                                height: 20,
                                marginTop: 5, textAlign: 'left'
                            }]}>{this.state.discussion.day}</Text>
                            <Text style={[styles.item_text, {
                                marginVertical: 0,
                                textAlign: 'left'
                            }]}>{this.state.discussion.date}</Text>
                        </View>
                        <View>
                            <Text style={[styles.active_item_text, {height: 20, marginTop: 5}]}>الساعة</Text>
                            <Text style={[styles.item_text, {
                                marginVertical: 0,
                                textAlign: 'left'
                            }]}>{this.state.discussion.from_time}</Text>
                        </View>
                    </ImageBackground>
                    {this.state.success && <Text style={{
                        color: this.state.success ? colors.green1 : colors.error, ...common.RegularFont,
                        fontSize: 16,
                        alignSelf: 'center'
                    }}>{this.state.success ? 'تم تسجيلك للمشاركة بالنشاط' : 'أنت مسجل فعلياً في النشاط'}</Text>}
                    {Moment(this.state.discussion.date).format('DD-MMM-YYYY') == Moment(new Date()).format('DD-MMM-YYYY') && this.state.access  ?
                        <Button title={'مشاركة'}
                                load={this.state.loading}
                                onPress={async () => {
                                    Linking.openURL(this.state.discussion.url)
                                }}
                                style={styles.btn1}/>
                        :
                        !this.state.discussion.registered && this.state.access && <Button title={'تسجيل'}
                                                                                          load={this.state.loading}
                                                                                          onPress={async () => {
                                                                                              if (this.props.route.params.dis) {
                                                                                                  this.setState({loading: true})
                                                                                                  let result = await regiter_to_discussions(this.props.route.params.id)
                                                                                                  console.log('registered', result)
                                                                                                  this.start()
                                                                                                  this.setState({
                                                                                                      success: true,
                                                                                                      loading: false
                                                                                                  })


                                                                                              } else {
                                                                                                  this.setState({loading: true})
                                                                                                  let result = await regiter_to_activity(this.props.route.params.id)
                                                                                                  console.log('registered', result)
                                                                                                  this.start()
                                                                                                  this.setState({
                                                                                                      success: true,
                                                                                                      loading: false
                                                                                                  })
                                                                                              }

                                                                                          }}
                                                                                          style={styles.btn1}/>
                    }

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


export default connect(mapStateToProps, mapDispatchToProps)(SeminarActivity);