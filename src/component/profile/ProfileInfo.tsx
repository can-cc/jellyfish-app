import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { UserInfo } from '../../typing/user';
import { WEBSITE } from '../../env/env';

export class ProfileInfo extends Component<{ onPress?: () => void; style?: any; userInfo: UserInfo }> {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress!();
    }
  };

  render() {
    return (
      <View
        style={[
          {
            paddingLeft: 18,
            paddingRight: 18,
            height: 120,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          },
          this.props.style
        ]}
      >
        <TouchableOpacity>
          {this.props.userInfo.avatarUrl ? (
            <Image
              style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#d8d8d8' }}
              source={{ uri: WEBSITE + '/' + this.props.userInfo.avatarUrl }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}
