import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { UserInfo } from '../../typing/user';
import { WEBSITE } from '../../env/env';
import { AppText } from '../AppText';

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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image
            style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#d8d8d8', marginRight: 18 }}
            source={{ uri: WEBSITE + '/' + this.props.userInfo.avatarUrl }}
          />

          <AppText style={{
            fontSize: 18,
            color: '#4295ff'
          }}>{this.props.userInfo.username}</AppText>
        </TouchableOpacity>
      </View>
    );
  }
}
