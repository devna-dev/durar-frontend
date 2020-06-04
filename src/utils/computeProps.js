import {
  StyleSheet
} from 'react-native';
import _ from 'lodash';

export default (incomingProps, defaultProps) => {
  // External props has a higher precedence
  let computedProps = {};

  incomingProps = _.clone(incomingProps);
  delete incomingProps.children;

  const incomingPropsStyle = incomingProps.styles;
  delete incomingProps.styles;

  // console.log(defaultProps, incomingProps);
  if (incomingProps) {
    _.assign(computedProps, defaultProps, incomingProps);
  } else {
    computedProps = defaultProps;
  }
  // Pass the merged Style Object instead
  if (incomingPropsStyle) {
    let computedPropsStyle = {};
    computedProps.style = {};
    if (Array.isArray(incomingPropsStyle)) {
      _.forEach(incomingPropsStyle, style => {
        if (typeof style === 'number') {
          _.merge(computedPropsStyle, StyleSheet.flatten(style));
        } else {
          _.merge(computedPropsStyle, style);
        }
      });
    } else if (typeof incomingPropsStyle === 'number') {
      computedPropsStyle = StyleSheet.flatten(incomingPropsStyle);

    } else {
      computedPropsStyle = incomingPropsStyle;
    }

    _.merge(computedProps.style, defaultProps.styles, computedPropsStyle);
  }
  // console.log("computedProps ", computedProps);
  return computedProps;
};