// @flow
import React from 'react';
import { Button as RNButton, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import RNCheckBox from 'react-native-check-box';

import { createForm } from 'rc-form';

export class CheckBox extends React.Component<{}> {
  render() {
    return (
      <RNCheckBox
        style={[{}, this.props.style]}
        onClick={() => {
          this.props.onChange(!this.props.checked);
        }}
        isChecked={this.props.checked}
        checkedImage={<Image source={require('../assets/check.png')} style={{ width: 16, height: 6 }} />}
        unCheckedImage={
          <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: '#999', borderRadius: 4 }} />
        }
      />
    );
  }
}
