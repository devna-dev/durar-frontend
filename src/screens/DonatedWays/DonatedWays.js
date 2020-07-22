import React, { Component } from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';
import Button from '../../components/Button/Button';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import DonatedOption from './DonatedOption';

class DonatedWays extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            selected: 0,
        };
    }

    render() {
        console.log('this.state.selected', this.state.selected);
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.back} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> وسائل التبرع</Text>
                </View>
                <Content style={styles.content}>
                    <DonatedOption
                        image={require('../../assets/images/Card.png')}
                        title={'بطاقة الائتمان'}
                        index={1}
                        onPress={this.onPress}
                        selected={this.state.selected === 1}
                    />
                    <DonatedOption
                        image={require('../../assets/images/googlePay.png')}
                        title={'محفظة جوجل'}
                        index={2}
                        onPress={this.onPress}
                        selected={this.state.selected === 2}
                    />
                    <DonatedOption
                        image={require('../../assets/images/ApplePay.png')}
                        title={'أبل باي'}
                        index={3}
                        onPress={this.onPress}
                        selected={this.state.selected === 3}
                    />
                    <Button
                        title={'التالي'}
                        style={styles.btn}
                        onPress={() => this.next()}
                        textColor={colors.white}
                    />
                </Content>
            </Container>
        );
    }

    onPress = (value) => {
        this.setState({ selected: value });
    };

    next = () => {
        if (this.state.selected === 1) {
            this.props.navigation.navigate('CreditCard');
        }
    };
}

export default DonatedWays;
