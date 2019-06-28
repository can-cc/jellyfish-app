import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import Input from '../component/Input';

const Item = View;

class TodoDetailScreen extends Component<any, any> {
  static defaultNavigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: '',
      tabBarLabel: '清单',
      headerBackTitle: null
    };
  };

  state = {
    content: '',
    detail: '',
    isDateTimePickerVisible: false
  };

  contentTouched = false;
  detailTouched = false;

  componentWillMount() {
    const didBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
      this.onChangeTodo({
        content: this.contentTouched ? this.state.content : this.props.todo.content,
        detail: this.detailTouched ? this.state.detail : this.props.todo.detail
      });
    });
  }

  componentWillUnmount() {}

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.props.actions.UPDATE_TODO_REQUEST({
      ...this.props.todo,
      deadline: date.getTime()
    });
    this.hideDateTimePicker();
  };

  onChangeTodo(changed) {
    this.props.actions.UPDATE_TODO_REQUEST({ ...this.props.todo, ...changed });
  }

  deleteTodo = () => {
    // Modal.alert('删除', '确定删除这条事项吗？', [
    //   { text: '取消' },
    //   {
    //     text: '确定',
    //     onPress: () => {
    //       this.props.actions.DELETE_TODO_REQUEST({ id: this.props.todo.id });
    //       this.props.navigation.goBack();
    //     }
    //   }
    // ]);
  };

  render() {
    return (
      <View style={styles.container}>
         <Input
            defaultValue={this.props.todo.content}
            placeholder="Todo"
            onBlur={() => this.onChangeTodo({ content: this.state.content })}
            onChangeText={value => {
              this.contentTouched = true;
              this.setState({ content: value });
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const TodoDetailScreenContainer = connect(
  (state: any, props: any) => {
    const todoId = props.navigation.getParam('todoId', 'NO-ID');
    return {
      todo: state.todo.entities.todo[todoId]
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoDetailScreen);
