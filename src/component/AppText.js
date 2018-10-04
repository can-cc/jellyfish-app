// @flow
import React from 'react';
import { Text, Platform } from 'react-native';

export const appFont = Platform.OS === 'ios' ? 'PingFang TC' : 'normal';

export class AppText extends React.Component<{
  children: any,
  style: any
}> {
  render() {
    return <Text style={[{ fontFamily: appFont, letterSpacing: 2 }, this.props.style]}>{this.props.children}</Text>;
  }
}
