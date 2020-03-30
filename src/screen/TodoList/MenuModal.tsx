import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import i18n from 'i18n-js';
import { AppText } from '../../component/AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppRootState } from '../../redux/reducer/reducer';

function ListItem({ text, icon, onPress }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onPress();
      }}
    >
      <FontAwesomeIcon
        size={20}
        style={{
          marginLeft: 7,
          marginRight: 16
        }}
        color="#222"
        icon={icon}
      />
      <AppText
        style={{
          color: '#333',
          fontSize: 16
        }}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
}

export function MenuModal({ visible, closeModal }) {
  const dispatch = useDispatch();
  const showDone = useSelector((state: AppRootState) => state.todo.showDone);
  const switchShowDone = () => {
    dispatch({
      type: 'SWITCH_TODO_LIST_SHOW_DONE',
      payload: !showDone
    });
    closeModal();
  };

  return (
    <Modal
      animationOut="slideOutDown"
      animationOutTiming={100}
      avoidKeyboard={true}
      isVisible={visible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
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
          paddingTop: 18,
          paddingBottom: 10,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
      >
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <AppText
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#333'
            }}
          >
            {i18n.t('listOption')}
          </AppText>
        </View>
        <View
          style={{
            paddingBottom: 28,
            paddingTop: 18
          }}
        >
          <ListItem
            icon={faCheckCircle}
            text={showDone ? i18n.t('showDoingTodo') : i18n.t('showAllTodo')}
            onPress={switchShowDone}
          />
        </View>
      </View>
    </Modal>
  );
}
