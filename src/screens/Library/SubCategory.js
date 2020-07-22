import React, { Component } from 'react';
import styles from './styles';
import Container from "../../components/Containers/Container";
import Content from "../../components/Containers/Content";
import { FlatList, TextInput, Image, ImageBackground, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import { SvgUri } from "react-native-svg";
import { svg_photo } from '../../assets/svg/svg'
import LibraryItem from "../../components/LibraryItem/LibraryItem";
import { colors } from "../../config/styles";
import { getSubCategories } from "../../services/books";

export default class SubCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            filter: false,
            sort: false,
            sub: this.props.route?.params?.sub ?? [],
            isLoading: false,
        }
    }


    async start() {
        if (this.state.sub?.length == 0 && !!this.props.route?.params?.id) {
            this.setState({ isLoading: true });
            const category = await getSubCategories(this.props.route?.params?.id);

            if (!!category?.sub_categories && category?.sub_categories?.length > 0)
                this.setState({ sub: category?.sub_categories });


            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.start();
    }


    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.header0}>
                    <SvgUri style={styles.back_img}
                        uri={svg_photo.back} />
                    <Text style={styles.headerTitle}> التصنيفات الفرعية</Text>
                </TouchableOpacity>
                <Content style={styles.content}>

                    <FlatList
                        data={this.state.sub}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                colors={[colors.primary]}
                                size={'large'}
                                onRefresh={() => this.start()}
                            />
                        }
                        ListEmptyComponent={<Text style={styles.headerTitle1}>لا يوجد تصنيفات فرعية</Text>}
                        style={{ alignSelf: 'center' }}
                        renderItem={(item) =>
                            <LibraryItem
                                sub
                                id={this.props.route.params.id}
                                navigation={this.props.navigation}
                                item={item.item} />} />




                </Content>
            </Container>
        )
    }

}
