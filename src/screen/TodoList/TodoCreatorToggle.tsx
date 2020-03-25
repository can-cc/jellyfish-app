import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text, TouchableHighlight } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import i18n from 'i18n-js';
import { AppText } from '../../component/AppText';
import { StyleControl } from '../../component/feature/StyleControl';
import * as Haptics from 'expo-haptics';

export class CreateTodoToggle extends Component<any, any> {
  render() {
    const remainPadding = StyleControl.needPaddingBottom();
    return (
      <View
        style={{
          width: '100%',
          paddingBottom: remainPadding ? 36 : 12,
          paddingTop: 12,
          paddingRight: 12,
          paddingLeft: 12,
          backgroundColor: '#FF8976'
        }}
      >
        <TouchableHighlight
          underlayColor="#E58876"
          style={{
            width: '100%',
            height: 43,
            borderRadius: 6,
            paddingLeft: 13,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#D67F6E'
          }}
          onPress={e => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            e.preventDefault();
            this.props.onClick();
          }}
        >
          <>
            <FontAwesomeIcon
              color="#fff"
              size={20}
              icon={faPlus}
              style={{
                marginRight: 16
              }}
            />

            <View>
              <AppText
                style={{
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '500'
                }}
              >
                {i18n.t('createTodoToggleText')}
              </AppText>
            </View>
          </>
        </TouchableHighlight>
      </View>
    );
  }
}
