import React, { ReactNode } from 'react';
import { Text, Platform, StyleProp, TextStyle } from 'react-native';

export const appFont = Platform.OS === 'ios' ? 'PingFang TC' : 'normal';

export function AppText({ style, children }: { style?: StyleProp<TextStyle>; children: ReactNode }) {
  return <Text style={[{ fontFamily: appFont }, style]}>{children}</Text>;
}
