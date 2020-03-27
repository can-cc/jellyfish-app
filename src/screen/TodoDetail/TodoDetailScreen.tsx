import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoByID } from '../../redux/reducer/selector/todo-selector';
import { AppRootState } from '../../redux/reducer/reducer';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { updateTodoRequest } from '../../redux/action/todo';
import { CheckBox } from '../../component/CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faBell, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import i18n from 'i18n-js';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { DetailFooter } from './DetailFooter';
import { AppText } from '../../component/AppText';
import { Todo } from '../../typing/todo';

function OperationItem({ text, faIcon, iconColor }: { text: string; faIcon: IconProp; iconColor: string }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#f8f8f8'
      }}
    >
      <FontAwesomeIcon
        size={20}
        icon={faIcon}
        color={iconColor}
        style={{
          marginRight: 20
        }}
      />
      <AppText
        style={{
          color: '#666',
          fontSize: 16
        }}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
}

export function TodoDetailScreen({ route, navigation }) {
  const { todoID } = route.params;
  const dispatch = useDispatch();
  const todo: Todo = useSelector((state: AppRootState) => selectTodoByID(state, todoID));
  const updateTodo = payload => {
    dispatch(updateTodoRequest({ ...todo, ...payload }));
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 12
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 6,
          paddingLeft: 2
        }}
      >
        <CheckBox
          checked={todo.status === 'Done'}
          onChange={checked => updateTodo({ status: checked ? 'Done' : 'Doing' })}
        />
        <TextInput
          style={{
            paddingLeft: 6,
            paddingRight: 66,
            marginBottom: 4,
            borderColor: '#dadada',
            borderBottomWidth: 0,
            textAlign: 'left',
            fontSize: 21,
            color: '#555'
          }}
          multiline={true}
          value={todo.content}
          placeholderTextColor="#bbb"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={content => updateTodo({ content })}
        />
      </View>

      <ScrollView
        style={{
          paddingLeft: 18,
          paddingRight: 18
        }}
      >
        <OperationItem text={i18n.t('addDeadlineText')} faIcon={faCalendarAlt} iconColor="#999" />
        <OperationItem text={i18n.t('remindMeText')} faIcon={faBell} iconColor="#999" />
        <OperationItem text={i18n.t('addFileText')} faIcon={faPaperclip} iconColor="#999" />

        <TextInput
          placeholder={i18n.t('addNoteText')}
          placeholderTextColor="#666"
          value={todo.detail}
          style={{
            paddingTop: 18,
            fontSize: 16
          }}
          multiline
          onChangeText={detail => updateTodo({ detail })}
        ></TextInput>
      </ScrollView>

      <DetailFooter todo={todo} />
    </View>
  );
}
