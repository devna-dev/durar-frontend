import React, { Component } from 'react';
import Container from '../../components/Containers/Container';
import Content from '../../components/Containers/Content';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';
import Button from '../../components/Button/Button';
import { SvgUri } from 'react-native-svg';
import { svg_photo } from '../../assets/svg/svg';
import { clear } from '../../stores/saga/models/user-store/actions';
import { connect } from 'react-redux';
import { creditCardDonate } from '../../stores/saga/models/book-store/actions';

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            expiryYear: '',
            expiryMonth: '',
            amount: '',
            cvc: '',
            currency: 'USD',
            cardNumberError: false,
            expiryYearError: false,
            expiryMonthrror: false,
            amountError: false,
            cvcError: false,
            currencyError: false,
            donateSuccess: false,
            donateFaile: false,
            dateError: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.book.donation_success &&
            this.props.book.donation_success !== prevProps.book.donation_success
        ) {
            this.setState({ donateSuccess: true });
            setTimeout(() => {
                this.reset();
                this.props.navigation.goBack();
            }, 2000);
        }
        if (this.props.book.donation_error && this.props.book.donation_error !== prevProps.book.donation_error
        ) {
            this.setState({ donateFaile: true });
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <SvgUri style={styles.back_img} uri={svg_photo.back} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>معلومات بطاقة الائتمان</Text>
                </View>
                <Content style={styles.content}>
                    <View style={styles.subContainer}>
                        <Text style={styles.label}>رقم البطاقة</Text>
                        <TextInput
                            style={[
                                styles.input,
                                this.state.cardNumberError && { borderColor: colors.red },
                            ]}
                            value={this.state.cardNumber}
                            onChangeText={(value) => this.setState({ cardNumber: value })}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.subContainer, { width: '50%' }]}>
                            <Text style={styles.label}>شهر الانتهاء</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    this.state.expiryMonthrror && { borderColor: colors.red },
                                ]}
                                placeholder={'e.g. : 5'}
                                value={this.state.expiryMonth}
                                onChangeText={(value) =>
                                    this.setState({ expiryMonth: value, expiryMonthrror: false })
                                }
                                keyboardType={'numeric'}
                                maxLength={2}
                            />
                        </View>
                        <View style={[styles.subContainer, { width: '50%' }]}>
                            <Text style={styles.label}>سنة الانتهاء</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    this.state.expiryYearError && { borderColor: colors.red },
                                ]}
                                placeholder={'e.g. : 21'}
                                value={this.state.expiryYear}
                                onChangeText={(value) => this.setState({ expiryYear: value })}
                                keyboardType={'numeric'}
                                maxLength={2}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.subContainer, { width: '50%' }]}>
                            <Text style={styles.label}>المبلغ</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    this.state.amountError && { borderColor: colors.red },
                                ]}
                                value={this.state.amount}
                                onChangeText={(value) => this.setState({ amount: value })}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={[styles.subContainer, { width: '50%' }]}>
                            <Text style={styles.label}>العملة</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    this.state.currencyError && { borderColor: colors.red },
                                ]}
                                value={this.state.currency}
                                onChangeText={(value) => this.setState({ currency: value })}
                                maxLength={3}
                            />
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <Text style={styles.label}>رقم ال CVV</Text>
                        <TextInput
                            style={[
                                styles.input,
                                this.state.cvcError && { borderColor: colors.red },
                            ]}
                            value={this.state.cvc}
                            onChangeText={(value) => this.setState({ cvc: value })}
                            keyboardType={'numeric'}
                            maxLength={3}
                        />
                    </View>
                    {this.state.expiryMonthrror && (
                        <Text style={styles.monthText}>
                            يرجى ادخال شهر صحيح متل 1 ,2 ,10
                        </Text>
                    )}
                    {this.state.donateSuccess && (
                        <Text style={[styles.monthText, { color: colors.green2 }]}>
                            شكرا لك , تم الدفع بنجاح
                        </Text>
                    )}
                    {this.state.donateFaile && (
                        <Text style={styles.monthText}>
                            {this.props.book.donation_error.message}
                        </Text>
                    )}
                    {this.state.dateError && (
                        <Text style={styles.monthText}>
                            برجى ادخال تاريخ انتهاء صحيح
                        </Text>
                    )}
                    <Button
                        title={'إرسال'}
                        style={styles.btn1}
                        load={this.props.book.load}
                        onPress={() => this.Validate()}
                        textColor={colors.white}
                    />
                </Content>
            </Container>
        );
    }

    onChangeMonth(value) {
        console.log(this.ValidateMonth(value));
    }

    validDate() {
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear() % 100;
        if (year > parseInt(this.state.expiryYear, 10)) {
            this.setState({ dateError: true });
            return false;
        } else if (
            year === parseInt(this.state.expiryYear, 10) &&
            month > parseInt(this.state.expiryMonth, 10)
        ) {
            this.setState({ dateError: true });
            return false;
        }
        this.setState({ dateError: false });
        return true;
    }

    reset() {
        this.setState({
            cardNumber: '',
            expiryYear: '',
            expiryMonth: '',
            amount: '',
            cvc: '',
            currency: '',
            donateSuccess: false,
        });
    }

    Validate() {
        const monthes = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
        ];
        const {
            cardNumber,
            expiryYear,
            expiryMonth,
            amount,
            cvc,
            currency,
        } = this.state;

        this.setState(
            {
                cardNumberError: cardNumber === '',
                expiryYearError: expiryYear === '',
                expiryMonthrror:
                    expiryMonth === '' || monthes.indexOf(expiryMonth) === -1,
                amountError: amount === '',
                cvcError: cvc === '',
                currencyError: currency === '',
            },
            () => {
                if (
                    !this.state.cardNumberError &&
                    !this.state.expiryYearError &&
                    !this.state.expiryMonthrror &&
                    !this.state.amountError &&
                    !this.state.cvcError &&
                    !this.state.currencyError &&
                    this.validDate()
                ) {
                    this.pay();
                }
            },
        );
    }

    pay() {
        const {
            cardNumber,
            expiryYear,
            expiryMonth,
            amount,
            cvc,
            currency,
        } = this.state;

        const form = {
            card: cardNumber.split(' ').join(''),
            expiry_year: parseInt(expiryYear, 10),
            expiry_month: parseInt(expiryMonth, 10),
            amount,
            cvc,
            currency,
        };
        this.props.donateByCreditCard(form);
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    donateByCreditCard: (form) =>
        dispatch({
            type: creditCardDonate,
            form,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);
