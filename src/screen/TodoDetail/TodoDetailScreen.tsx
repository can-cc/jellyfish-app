import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoByID } from '../../redux/reducer/selector/todo-selector';
import { AppRootState } from '../../redux/reducer/reducer';
import { TextInput } from 'react-native-gesture-handler';
import { updateTodoRequest } from '../../redux/action/todo';
import { CheckBox } from '../../component/CheckBox';

export function TodoDetailScreen({ route, navigation }) {
  const { todoID } = route.params;
  const dispatch = useDispatch();
  const todo = useSelector((state: AppRootState) => selectTodoByID(state, todoID));
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
          alignItems: 'center'
        }}
      >
        <CheckBox
          checked={todo.status === 'Done'}
          onChange={checked => updateTodo({ status: checked ? 'Done' : 'Doing' })}
        />
        <TextInput
          style={{
            paddingLeft: 10,
            paddingRight: 10,
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
    </View>
  );
}
