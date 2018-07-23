import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProperties,
  View
} from 'react-native';

export class Button extends React.Component<> {
  render() {
    const shadow = {
      shadowColor: 'rgba(64, 64, 64, 0.15)',
      shadowOpacity: 1,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 5 }
    };
    return (
      <TouchableHighlight
        style={[
          {
            height: 50,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderRadius: 16,
            backgroundColor: '#ddecff'
          },
          this.props.style
        ]}
        activeOpacity={1}
        underlayColor="#C0D9FA"
        onPress={(e?: any) => this.props.onPress(e)}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}
