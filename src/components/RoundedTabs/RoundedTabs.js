import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import styles from './styles';
import common from '../../styles/common.style';
import {colors} from '../../config/styles';


const Item = ({item, active, onPress, tab, tab1, style}) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={[styles.item, style]}
        >
                <Text
                    style={[
                        styles.tabName,
                        active ? styles.activeItem1:styles.activeItem]}
                >
                    {item.label}
                </Text>
        </TouchableOpacity>
    );
};

class RoundedTabs extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selected: props.selected,
            tab: props.tab,
            enableScrolling: props.enableScrolling,
            widthOfItem: props.tab1 ? 130 : 120,
        };
    }

    find_dimesions(layout) {
        const {x, y, width, height} = layout;
        this.setState({
            widthOfItem: this.props.two ? width/2 : width/2.7,
        });
    }


    renderItem = ({item, index}) => {
        const {selected, tab} = this.state;
        const active = selected === item.key;
        return <Item item={item} active={active} tab={tab} tab1={this.props.tab1} onPress={this.onChangeSelectedTab}
                     style={{width: this.state.widthOfItem}}/>;
    };

    onChangeSelectedTab = item => {
        this.setState({
            selected: item.key,
        }, () => {
            this.props.onChange(item);
        });
    };

    render() {

        return (
            <View style={[styles.bar, this.props.style]} onLayout={(event) => {
                this.find_dimesions(event.nativeEvent.layout);
            }}>
                <FlatList
                    horizontal={true}
                    data={this.props.list}
                    keyExtractor={item => `tab_${item.key}`}
                    renderItem={this.renderItem}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={this.props.enableScrolling}
                />
            </View>
        );
    }
}

export default RoundedTabs;
