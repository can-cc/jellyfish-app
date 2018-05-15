import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';

class TodoDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Todo',
    headerRight: <TouchableOpacity onPress={this.onPressDone}>Save</TouchableOpacity>
  };

  onPressDone = () => {};

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <View style={styles.container}>
        <List>
          <InputItem
            labelNumber={5}
            {...getFieldProps('username', {
              rules: [{ required: true }]
            })}
          >
            Todo
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const TodoDetailScreenContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(createForm()(TodoDetailScreen));
