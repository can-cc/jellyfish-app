import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';

class TodoDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Todo'
    /* headerRight: <TouchableOpacity onPress={this.onPressDone}>Save</TouchableOpacity> */
  };

  onPressDone = () => {
    console.log('done');
  };

  render() {
    return (
      <View style={styles.container}>
        <WingBlank>
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
        </WingBlank>
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
)(TodoDetailScreen);
