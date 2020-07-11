import React from 'react';
import Slider from 'react-native-slider';
import {View, Text, Platform} from 'react-native';

const TrackingBar = ({
                         currentTimeString,
                         onSliderEditStart,
                         onSliderEditEnd,
                         onSliderEditing,
                         playSeconds,
                         duration,
                         durationString,
                         maximumTrackTintColor = 'gray',
                         minimumTrackTintColor = 'white',
                         thumbTintColor = 'white',
                     }) => {
    console.log(playSeconds, duration, durationString);
    return (
        <View
            style={{marginVertical: 5, marginHorizontal: 15, flexDirection: 'row'}}>
            <Text style={{color: 'white', alignSelf: 'center'}}>
                {currentTimeString}
            </Text>
            <Slider
                onTouchStart={onSliderEditStart}
                onTouchEnd={onSliderEditEnd}
                onValueChange={onSliderEditing}
                value={playSeconds}
                maximumValue={Math.abs(duration)}
                maximumTrackTintColor={maximumTrackTintColor}
                minimumTrackTintColor={minimumTrackTintColor}
                thumbTintColor={thumbTintColor}
                style={{
                    flex: 1,
                    alignSelf: 'center',
                    marginHorizontal: Platform.select({ios: 5}),
                }}
            />
            <Text style={{color: 'white', alignSelf: 'center'}}>
                {durationString}
            </Text>
        </View>
    );
};
export default TrackingBar;
