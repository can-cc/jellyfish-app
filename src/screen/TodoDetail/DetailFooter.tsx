import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Todo } from '../../typing/todo';
import moment from 'moment';
import i18n from 'i18n-js';
import { AppText } from '../../component/AppText';
import { useDispatch } from 'react-redux';
import { deleteTodoRequest } from '../../redux/action/todo';
import * as Haptics from 'expo-haptics';

export function DetailFooter({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    Alert.alert(i18n.t('deleteTodoTitle'), i18n.t('deleteTodoConfirm'), [
      {
        text: i18n.t('cancelText'),
        style: 'cancel'
      },
      {
        text: i18n.t('deleteText'),
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

          dispatch(
            deleteTodoRequest({
              id: todo.id
            })
          );
        }
      }
    ]);
  };

  return (
    <>
      <View
        style={{
          paddingBottom: 12,
          paddingRight: 12,
          paddingLeft: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View></View>
        <View>
          <AppText
            style={{
              color: '#777'
            }}
          >
            {i18n.t('createdAtText')} {moment(todo.createdAt).format(`YYYY Mo Do ddd`)}
          </AppText>
        </View>

        <View>
          <TouchableOpacity
            onPress={onDelete}
            style={{
              padding: 10
            }}
          >
            <FontAwesomeIcon size={20} color="#726D6C" icon={faTrashAlt} style={{}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
