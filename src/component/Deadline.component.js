// @flow
import React from 'react';
import {
  Button as RNButton,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';

import { createForm } from 'rc-form';

export class Deadline extends React.Component<{ deadline: number, style: any }> {
  state = {};

  render() {
    const isOutDay = isBefore(this.props.deadline, new Date());
    const isToday = isSameDay(this.props.deadline, new Date());
    const isTomorrow = isSameDay(this.props.deadline, addDays(new Date(), 1));
    const deadlineText = isOutDay
      ? '过期'
      : isToday ? '今天' : isTomorrow ? '明天' : format(this.props.deadline, 'M.d');
    return (
      <View style={[this.props.style]}>
        <Text>{deadlineText}</Text>
      </View>
    );
  }
}
