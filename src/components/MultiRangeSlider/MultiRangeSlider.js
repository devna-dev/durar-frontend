import React, { Component } from 'react';
import { View } from 'react-native';
import { colors } from '../../config/styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';
import Step from './Step';

class MultiRangeSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: props.value,
            viewWidth : 280
        };
    }

    multiSliderValuesChange = values => {
        this.setState({
            multiSliderValue: values,
        });
        this.props.onRangeChanged(values)
    };

    find_dimesions(layout){
        const {x, y, width, height} = layout;
        this.setState({
            viewWidth: width,
        });

      }

    render() {
        return (
            <View onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
            style={{alignSelf:'center'}}>
                <MultiSlider
                    values={[
                        this.state.multiSliderValue[0],
                        this.state.multiSliderValue[1],
                    ]}
                    sliderLength={280}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={10}
                    step={1}
                    allowOverlap
                    snapped
                    trackStyle={{
                        height: 4,
                        backgroundColor: colors.paleLilac,
                    }}
                    selectedStyle = {{
                        backgroundColor: colors.primary,
                    }}
                    markerStyle = {{
                        backgroundColor : colors.white,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        width:28,
                        height:28
                    }}
                />
                {/*<View style = {styles.stepsContainer}>*/}
                    {/*<Step title = {0}></Step>*/}
                    {/*<Step title = {250}></Step>*/}
                    {/*<Step title = {500}></Step>*/}
                    {/*<Step title = {750}></Step>*/}
                    {/*<Step title = {1000}></Step>*/}
                {/*</View>*/}
            </View>);
    }
}

export default MultiRangeSlider
