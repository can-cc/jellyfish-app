// @flow
import React from 'react';
import { Text, Platform } from 'react-native';

const font = Platform.OS === 'ios' ? 'PingFang TC' : 'monospace';

export class AppText extends React.Component<{
  children: any,
  style: any
}> {
  render() {
    return <Text style={[{ fontFamily: font, letterSpacing: 2 }, this.props.style]}>{this.props.children}</Text>;
  }
}
