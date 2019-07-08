import React from 'react';
import { Text, Platform, TextStyle, StyleProp } from 'react-native';

export const appFont = Platform.OS === 'ios' ? 'PingFang TC' : 'normal';

export class AppText extends React.Component<{
  style?: StyleProp<TextStyle>
}> {

  render() {
    return <Text style={[{ fontFamily: appFont}, this.props.style]}>{this.props.children}</Text>;
  }
}
