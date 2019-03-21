//
import React from 'react';
import { Button as RNButton, StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import { AppText } from './AppText';

import { createForm } from 'rc-form';

export class Deadline extends React.Component {
  state = {};

  render() {
    const isOutDay = isBefore(this.props.deadline, new Date());
    const isToday = isSameDay(this.props.deadline, new Date());
    const isTomorrow = isSameDay(this.props.deadline, addDays(new Date(), 1));
    const deadlineText = isOutDay
      ? '过期'
      : isToday
        ? '今天'
        : isTomorrow
          ? '明天'
          : format(this.props.deadline, 'M.d');

    const color = isOutDay ? '#ff644b' : isTomorrow ? '#4295ff' : '#9b9b9b';
    return (
      <View style={[this.props.style]}>
        <AppText style={{ color }}>{deadlineText}</AppText>
      </View>
    );
  }
}
