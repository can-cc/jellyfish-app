import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppButton } from '../../component/Button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Todo } from '../../typing/todo';
import moment from 'moment';
import i18n from 'i18n-js';
import { AppText } from '../../component/AppText';
import { ConfirmModal } from '../../component/ConfirmModal';

export function DetailFooter({ todo }: { todo: Todo }) {
  return (
    <>
      <ConfirmModal visible={true} onClose={() => {}} text={i18n.t('deleteTodoConfirm')} />
      <View
        style={{
          paddingBottom: 18,
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
          <TouchableOpacity>
            <FontAwesomeIcon size={20} color="#726D6C" icon={faTrashAlt} style={{}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
