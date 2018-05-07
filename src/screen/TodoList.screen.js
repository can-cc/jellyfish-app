import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actions';
import { connect } from 'react-redux';

class TodoListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>List</Text>
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

export const TodoListScreenContainer = connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);
