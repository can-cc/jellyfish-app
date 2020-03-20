import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { CheckBox } from '../../component/CheckBox';
import { Deadline } from '../../component/Deadline.component';
import { AppText } from '../../component/AppText';
import { Todo } from '../../typing/todo';
import { useDispatch } from 'react-redux';
import { updateTodoRequest } from '../../redux/action/todo';

export function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const onCheckBoxChange = (checked: boolean) => {
    dispatch(
      updateTodoRequest({
        ...todo,
        status: checked ? 'Done' : 'Done'
      })
    );
  };

  const onClick = () => {};

  return (
    <TouchableHighlight underlayColor="rgba(100,149,237, 0.05)" style={{ width: '100%', flex: 1 }} onPress={() => onClick()}>
      <View
        style={{
          paddingLeft: 18,
          paddingRight: 10,
          paddingBottom: 12,
          paddingTop: 12,
          flexDirection: 'row',
          width: '100%',
          backgroundColor: 'white',
          marginTop: 2,
          borderRadius: 6
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
          <CheckBox style={{ marginTop: 2, flexShrink: 0 }} checked={todo.status === 'Done'} onChange={checked => onCheckBoxChange(checked)} />
          <AppText
            style={{
              color: 'black',
              flexShrink: 1,
              paddingLeft: 12,
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
