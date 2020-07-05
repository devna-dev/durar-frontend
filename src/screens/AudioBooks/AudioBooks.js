import React, {Component} from 'react';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import styles from "./styles";
import {svg_photo} from "../../assets/svg/svg";
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";
import {Rating, AirbnbRating} from 'react-native-ratings';
import BookItem from "../../components/BookItem/BookItem";
import Button from "../../components/Button/Button";
import {colors} from "../../config/styles";
import {clear, loading} from "../../stores/saga/models/user-store/actions";
import {connect} from "react-redux";
import {get_thesis} from "../../stores/saga/models/activities-store/actions";
import {get_audio_books} from "../../services/books";
import HomeBookItemLoaded from "../../components/HomeBookItemLoaded/HomeBookItemLoaded";


class AudioBooks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audio_books: [],
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({loading: true})
        let audio_books = await get_audio_books();
        console.log(audio_books)
        this.setState({audio_books})
        this.setState({loading: false})
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <View style={styles.back_view}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                            <SvgUri style={styles.back_img}
                                    uri={svg_photo.back}/>
                            <Text style={styles.item_text1}>كتب صوتية</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.audio_books.length != 0  ?
                        <Text style={styles.item_text}> {this.state.audio_books.length} كتاب</Text>
                        :
                        !this.state.loading &&<Text style={styles.item_text}> لا يوجد أي كتاب صوتي</Text>
                    }
                    {this.state.loading &&
                    <ActivityIndicator animating={this.state.loading} color={colors.primary} size={'large'}/>}
                    {this.state.audio_books.length != 0 && <FlatList data={this.state.audio_books}
                                                                     renderItem={(item) => <HomeBookItemLoaded
                                                                         search
                                                                         audio
                                                                         navigation={this.props.navigation}
                                                                         item={item}/>}/>}

                </Content>
            </Container>
        )
    }

}


export default AudioBooks