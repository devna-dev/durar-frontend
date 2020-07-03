import React, {Component} from 'react';
import styles from './styles';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import {FlatList, TextInput, Text, View, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {svg_photo} from '../../assets/svg/svg';
import {colors} from '../../config/styles';
import Button from '../../components/Button/Button';

import {connect} from 'react-redux';
import {
    get_categories,
    clear,
    search_result,
} from '../../stores/saga/models/book-store/actions';
import {loading} from '../../stores/saga/models/user-store/actions';

class Search1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            index: '',
            index1: 0,
            show_sub_categories: false,
            sub_categories: [],
            show_categories: false,
            loading: false,
            payload: {
                category_id: '',
                title: '',
            },
        };
    }

    componentDidMount() {
        this.start();
    }

    start() {
        this.props.clear();
        this.props.get_categories();
    }

    render() {
        const {state} = this;
        console.log(state);
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        placeholder={'البحث'}
                        style={styles.input}
                        onChangeText={(text) =>
                            this.setState({...state, payload: {title: text}})
                        }
                    />
                    <SvgUri style={styles.back_img} uri={svg_photo.voice}/>
                </View>
                <Content style={styles.content}>
                    <View style={styles.header1}>
                        <TouchableOpacity
                            onPress={() => this.setState({...state, selected: 0})}
                            style={[
                                styles.item_view,
                                {
                                    backgroundColor:
                                        this.state.selected == 0 ? colors.secondary : colors.white,
                                    borderColor:
                                        this.state.selected == 0 ? colors.secondary : colors.grey1,
                                    borderWidth: 1,
                                },
                            ]}>
                            {this.state.selected == 0 && (
                                <SvgUri style={styles.back_img} uri={svg_photo.checked}/>
                            )}
                            <Text
                                style={
                                    this.state.selected == 0
                                        ? styles.item_text
                                        : styles.active_item_text
                                }>
                                {' '}
                                بحث كتاب
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.setState({...state, selected: 1})}
                            style={[
                                styles.item_view,
                                {
                                    backgroundColor:
                                        this.state.selected == 1 ? colors.secondary : colors.white,
                                    borderColor:
                                        this.state.selected == 1 ? colors.secondary : colors.grey1,
                                    borderWidth: 1,
                                },
                            ]}>
                            {this.state.selected == 1 && (
                                <SvgUri style={styles.back_img} uri={svg_photo.checked}/>
                            )}
                            <Text
                                style={
                                    this.state.selected == 1
                                        ? styles.item_text
                                        : styles.active_item_text
                                }>
                                {' '}
                                بحث محتوى
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({...state, selected: 2})}
                        style={[
                            styles.item_view,
                            {
                                backgroundColor:
                                    this.state.selected == 2 ? colors.secondary : colors.white,
                                borderColor:
                                    this.state.selected == 2 ? colors.secondary : colors.grey1,
                                borderWidth: 1,
                                alignSelf: 'flex-start',
                                marginHorizontal: '6%',
                            },
                        ]}>
                        {this.state.selected == 2 && (
                            <SvgUri style={styles.back_img} uri={svg_photo.checked}/>
                        )}
                        <Text
                            style={
                                this.state.selected == 2
                                    ? styles.item_text
                                    : styles.active_item_text
                            }>
                            {' '}
                            بحث عن كاتب
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.item_text1}>التصنيف الرئيسي</Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({show_categories: !this.state.show_categories})
                        }
                        style={[styles.bar4, {borderColor: colors.grey1}]}>
                        <Text style={[styles.text3, {color: colors.grey3}]}>
                            إختر تصنيفات معينه
                        </Text>
                        <SvgUri
                            style={styles.back_img}
                            uri={
                                this.state.show_categories
                                    ? svg_photo.down_arrow
                                    : svg_photo.up_arrow
                            }
                        />
                    </TouchableOpacity>
                    {this.state.show_categories && (
                        <FlatList
                            data={this.props.book.categories}
                            style={{marginHorizontal: '3.5%'}}
                            numColumns={2}
                            renderItem={(item) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.props.navigation.navigate('Search')
                                        console.log(item.item.sub_category)
                                        this.setState({
                                            ...state,
                                            index: item.index,
                                            payload: {
                                                ...this.state.payload,
                                                category_id: item.item.id,
                                            },
                                        });
                                    }}
                                    style={[
                                        styles.item_view,

                                        {
                                            marginBottom: 5,
                                            backgroundColor:
                                                this.state.index == item.index
                                                    ? colors.secondary
                                                    : colors.white,
                                            borderColor:
                                                this.state.index == item.index
                                                    ? colors.secondary
                                                    : colors.grey1,
                                            borderWidth: 1,
                                            marginHorizontal: '2%',
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.text3,
                                            {color: colors.primary, fontWeight: '900'},
                                        ]}>
                                        {item.item.name}
                                    </Text>
                                    {/*<SvgUri style={styles.back_img1} uri={svg_photo.active_close}/>*/}
                                </TouchableOpacity>
                            )}
                        />
                    )}
                    <Text style={styles.item_text1}>التصنيف الفرعي</Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({show_sub_categories: !this.state.show_sub_categories})
                        }
                        style={[styles.bar4, {borderColor: colors.grey1}]}>
                        <Text style={[styles.text3, {color: colors.grey3}]}>
                            إختر تصنيفات معينه
                        </Text>
                        <SvgUri
                            style={styles.back_img}
                            uri={
                                this.state.show_sub_categories
                                    ? svg_photo.down_arrow
                                    : svg_photo.up_arrow
                            }
                        />
                    </TouchableOpacity>

                    {this.state.show_sub_categories && (
                        <FlatList
                            data={this.props.book.categories}
                            style={{marginHorizontal: '3.5%'}}
                            numColumns={2}
                            renderItem={(item) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.props.navigation.navigate('Search')
                                        this.setState({
                                            ...state,
                                            index: item.index,
                                            payload: {
                                                ...this.state.payload,
                                                sub_category_id: item.item.id,
                                            },
                                        });
                                    }}
                                    style={[
                                        styles.item_view,

                                        {
                                            marginBottom: 5,
                                            backgroundColor:
                                                this.state.index1 == item.index
                                                    ? colors.secondary
                                                    : colors.white,
                                            borderColor:
                                                this.state.index1 == item.index
                                                    ? colors.secondary
                                                    : colors.grey1,
                                            borderWidth: 1,
                                            marginHorizontal: '2%',
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.text3,
                                            {color: colors.primary, fontWeight: '900'},
                                        ]}>
                                        {item.item.name}
                                    </Text>
                                    {/*<SvgUri style={styles.back_img1} uri={svg_photo.active_close}/>*/}
                                </TouchableOpacity>
                            )}
                        />
                    )}
                    {(this.state.payload.category_id != '' && this.state.payload.title != '') &&
                    <Button
                        title={'بحث'}
                        load={this.props.book.load}
                        style={styles.btn1}
                        onPress={() => {
                            let form = {
                                category_id: this.state.payload.category_id,
                                title: this.state.payload.title,
                                content: this.state.selected,
                            };
                            this.props.search_result(form);
                            this.props.navigation.navigate('Search', {
                                category_id: this.state.payload.category_id,
                            });
                        }}
                        textColor={colors.white}
                    />
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clear: () =>
        dispatch({
            type: clear,
        }),
    get_categories: () =>
        dispatch({
            type: get_categories,
        }),
    loading: (form) =>
        dispatch({
            type: loading,
            form,
        }),
    search_result: (form) =>
        dispatch({
            type: search_result,
            form,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search1);
