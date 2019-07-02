import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

export class AppListItem extends Component<{ onPress?: () => void; style?: any }> {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress!();
    }
  };

  render() {
    return (
      <View
        style={[
          { paddingLeft: 18, paddingRight: 18, height: 38, marginBottom: 12, width: '100%', flexDirection: 'column' },
          this.props.style
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          onPress={this.onPress}
        >
          {this.props.children}
        </TouchableOpacity>

        <View style={{ marginLeft: 34, marginTop: -2, height: 1.1, backgroundColor: '#e8e8e8' }}></View>
      </View>
    );
  }
}
