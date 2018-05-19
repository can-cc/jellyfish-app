import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, Button, List, InputItem, DatePicker } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import R from 'ramda';

class TodoDetailScreen extends React.Component {
  static navigationOptions = {
    title: '',
    headerRight: <TouchableOpacity onPress={this.onPressDone}>Save</TouchableOpacity>
  };

  onPressDone = () => {};

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <View style={styles.container}>
        <List>
          <DatePicker
            {...getFieldProps('deadline', {
              rules: [{ required: true, message: 'Must select a date' }]
            })}
          >
            <List.Item arrow="horizontal">
              <Ionicons name="ios-time-outline" size={25} />
            </List.Item>
          </DatePicker>
          <InputItem {...getFieldProps('content', {})} placeholder="Content">
            <Ionicons name="ios-barcode-outline" size={25} />
          </InputItem>
          <InputItem {...getFieldProps('detail')} placeholder="Detail">
            <Ionicons name="ios-clipboard-outline" size={25} />
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});

export const TodoDetailScreenContainer = connect(
  (state, props) => {
    const todoId = props.navigation.getParam('todoId', 'NO-ID');
    return {
      todo: R.find(R.propEq('id', todoId))(state.todo.todos)
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(createForm()(TodoDetailScreen));
