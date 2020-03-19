import React, { Component, useState, useCallback, useRef } from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './TodoCreatorToggle';
import { AppButton } from '../../component/Button';
import { AppText } from '../../component/AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCalendar, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { createTodoRequest } from '../../redux/action/todo';
import i18n from 'i18n-js';
import { StyleControl } from '../../component/feature/StyleControl';

export function TodoCreatorModal({ showModal, closeModal }) {
  const dispatch = useDispatch();
  const [todoContent, setTodoContent] = useState('');

  const textInputNodeRef = useRef<TextInput>();

  const focusRef = useCallback((node: TextInput) => {
    // make keyboard popup more natural
    if (node !== null) {
      textInputNodeRef.current = node;
      setTimeout(() => {
        node.focus();
      }, 200);
    }
  }, []);

  const onClose = () => {
    textInputNodeRef.current!.blur();
    setTimeout(() => {
      closeModal();
    }, 200);
  };

  const submit = () => {
    dispatch(
      createTodoRequest({
        content: todoContent
      })
    );
    closeModal();
  };

  return (
    <Modal
      animationOut="slideOutDown"
      animationOutTiming={100}
      avoidKeyboard={true}
      isVisible={showModal}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        justifyContent: 'flex-end',
        margin: 0
      }}
      useNativeDriver={true}
    >
      <View
        style={{
          backgroundColor: '#fff',
          padding: 12,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <FontAwesomeIcon size={20} style={{
              marginLeft: 7
          }} color="#555" icon={faCircle} />
          <TextInput
            ref={focusRef}
            placeholder={i18n.t('createTodoToggleText')}
            style={{
              height: 40,
              paddingLeft: 10,
              borderColor: '#dadada',
              borderBottomWidth: 0,
              textAlign: 'left',
              fontSize: 18
            }}
            placeholderTextColor="#bbb"
            onSubmitEditing={() => submit()}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={setTodoContent}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: -8
          }}
        >
          <AppButton transparent>
            <FontAwesomeIcon color="#555" icon={faListAlt} />
          </AppButton>
          <AppButton transparent>
            <FontAwesomeIcon color="#555" icon={faBell} />
          </AppButton>
          <AppButton transparent>
            <FontAwesomeIcon color="#555" icon={faCalendar} />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
}
