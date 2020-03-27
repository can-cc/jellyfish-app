import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { AppButton } from './Button';
import { AppText } from './AppText';

export function ConfirmModal({ onClose, visible, text }) {
  return (
    <Modal
      animationOut="slideOutDown"
      animationOutTiming={100}
      avoidKeyboard={true}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        margin: 0
      }}
      useNativeDriver={true}
    >
      <View
        style={{
          backgroundColor: 'white',
          marginLeft: 60,
          marginRight: 60,
          paddingTop: 30,
          paddingBottom: 30,
          paddingRight: 18,
          paddingLeft: 18,
          borderRadius: 10
        }}
      >
        <View style={{
            alignItems: 'center'
        }}>
          <AppText>{text}</AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 30,
            paddingLeft: 30
          }}
        >
          <AppButton>
            <AppText>confirm</AppText>
          </AppButton>

          <AppButton>
            <AppText>Cancel</AppText>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
}
