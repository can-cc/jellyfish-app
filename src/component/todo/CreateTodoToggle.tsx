import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export class CreateTodoToggle extends Component<any, any> {
  state = {};

  render() {
    return (
      <View style={{}}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ddecff'
          }}
          onPress={e => {
            e.preventDefault();
            this.props.onClick();
          }}
        >
          <FontAwesomeIcon color="red" icon={faPlus} />
        </TouchableOpacity>
      </View>
    );
  }
}
