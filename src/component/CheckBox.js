// @flow
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import RNCheckBox from 'react-native-check-box';

export class CheckBox extends React.Component<{
  style: any,
  checked: boolean,
  onChange: any
}> {
  render() {
    return (
      <RNCheckBox
        style={[{}, this.props.style]}
        onClick={() => {
          this.props.onChange(!this.props.checked);
        }}
        isChecked={this.props.checked}
        checkedImage={<Image source={require('../assets/check.png')} style={{ width: 16, height: 16 }} />}
        unCheckedImage={
          <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: '#999', borderRadius: 4 }} />
        }
      />
    );
  }
}
