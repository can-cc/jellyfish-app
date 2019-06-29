import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';

export class CreateTodoToggle extends Component<any, any> {
  state = {};

  render() {
    return (
      <View style={{   }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ddecff',
          }}
          onPress={e => {
            console.log('press');
            e.preventDefault();
            this.props.onClick();
          }}
        >
          <View
            style={{
              flex: 1,
              shadowColor: 'rgba(64, 64, 64, 0.15)',
              shadowOpacity: 1,
              shadowRadius: 9,
              shadowOffset: { width: 0, height: 5 },
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              paddingTop: 0
            }}
          >
            <Image
              style={{
                width: 22,
                height: 22
              }}
              source={require('../../assets/icons/plus.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
