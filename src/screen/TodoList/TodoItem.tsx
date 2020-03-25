import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { CheckBox } from '../../component/CheckBox';
import { Deadline } from '../../component/Deadline.component';
import { AppText } from '../../component/AppText';
import { useDispatch } from 'react-redux';
import { updateTodoRequest } from '../../redux/action/todo';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onCheckBoxChange = (checked: boolean) => {
    dispatch(
      updateTodoRequest({
        ...todo,
        status: checked ? 'Done' : 'Doing'
      })
    );
  };

  const onClick = () => {
    // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate('TodoDetail', {
      todoID: todo.id
    });
  };

  return (
    <TouchableHighlight
      underlayColor="rgba(100,149,237, 0.05)"
      style={{ width: '100%', flex: 1 }}
      onPress={() => onClick()}
    >
      <View
        style={{
          paddingLeft: 5,
          paddingRight: 10,
          paddingBottom: 0,
          paddingTop: 0,
          flexDirection: 'row',
          width: '100%',
          backgroundColor: 'white',
          marginTop: 2,
          borderRadius: 9
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <CheckBox checked={todo.status === 'Done'} onChange={checked => onCheckBoxChange(checked)} />

          <AppText
            style={{
              color: 'black',
              flexShrink: 1,
              padding: 12,
              paddingLeft: 10,
              width: '100%',
              fontSize: 15,
              textDecorationLine: todo.done ? 'line-through' : 'none'
            }}
          >
            {todo.content}
          </AppText>

          {todo.deadline ? <Deadline style={{ flexShrink: 0 }} deadline={todo.deadline} /> : null}
        </View>
      </View>
    </TouchableHighlight>
  );
}
