import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import  computeProps  from '../../utils/computeProps';


const deviceHeight = Dimensions.get('window').height;

/**
 * Class representing a content component.
 * @extends React.Component
 */
class Content extends Component {
    /**
     * Renders content component
     * @return {string} markup
     */
    render() {
        const computedProps = computeProps(this.props,
            { style: [styles.content, this.props.padder && styles.padder] }
        );

        return (
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                resetScrollToCoords={this.props.disableKBDismissScroll ? null : { x: 0, y: 0 }}
                keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps ? this.props.keyboardShouldPersistTaps : 'handled'}
                showsVerticalScrollIndicator={true}
                enableAutomaticScroll={true}
                contentContainerStyle={
                    this.props.center? {
                        flexGrow : 1,
                        justifyContent: 'center',
                    } : {flexGrow: 1}
                }
                ref={c => {
                    this._scrollview = c;
                    this._root = c;
                }}
                refreshControl={this.props.refreshControl}
                {...computedProps}>
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}

/**
 * Runtime type checking for React props.
 */
Content.propTypes = {
    disableKBDismissScroll: PropTypes.bool,
    enableResetScrollToCoords: PropTypes.bool,
    keyboardShouldPersistTaps: PropTypes.string,
    padder: PropTypes.bool,
    center: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

export default Content;
