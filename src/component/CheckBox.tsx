import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import * as Haptics from 'expo-haptics';

export function CheckBox(props: { checked: boolean; onChange?: Function; style?: StyleProp<ViewStyle> }) {
  return (
    <TouchableOpacity
      style={{
        padding: 12
      }}
      onPress={() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        props.onChange && props.onChange(!props.checked);
      }}
    >
      {props.checked ? (
        <FontAwesomeIcon color="#F08F7C" size={25} icon={faCheckCircle} />
      ) : (
        <FontAwesomeIcon color="#F08F7C" size={25} icon={faCircle} />
      )}
    </TouchableOpacity>
  );
}
