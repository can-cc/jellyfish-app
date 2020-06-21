import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

export class ListButton extends Component<{ style?: any; onPress?: () => void }, any> {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={[
          {
            width: '100%',
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 12,
            paddingRight: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            backgroundColor: '#f8f8f8'
          },
          this.props.style
        ]}
        activeOpacity={1}
        onPress={this.onPress}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
