import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import RNCheckBox from 'react-native-check-box';

export class CheckBox extends Component<any, any> {
  render() {
    return (
      <RNCheckBox
        style={[{}, this.props.style]}
        onClick={() => {
          this.props.onChange(!this.props.checked);
        }}
        isChecked={this.props.checked}
        checkedImage={<Image source={require('../assets/check.png')} style={{ width: 20, height: 20 }} />}
        unCheckedImage={
          <View style={{ width: 26, height: 26, borderWidth: 1, borderColor: '#999', borderRadius: 6 }} />
        }
      />
    );
  }
}
