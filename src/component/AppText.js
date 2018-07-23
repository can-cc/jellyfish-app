// @flow
import React from 'react';
import { Text } from 'react-native';

export class AppText extends React.Component<{
  children: any,
  style: any
}> {
  render() {
    return (
      <Text style={[{ fontFamily: 'PingFang TC', letterSpacing: 2 }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
