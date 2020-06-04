import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView } from 'react-native';
import styles from './styles';

/**
 * Class representing a container component.
 * @extends React.Component
 */
class Container extends Component {
  /**
   * Render container component
   * @return {React native element}
   */
  render() {
    const { style } = this.props;
    return (
      <KeyboardAvoidingView ref={c => (this._root = c)} {...this.props} style={[styles.container, style , {borderRadius:this.props.rounded?20:0} ]} >
          {this.props.children}
      </KeyboardAvoidingView>
    );
  }
}

/**
 * Runtime type checking for React props.
 */
Container.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

export default Container;
