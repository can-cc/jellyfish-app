import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  WingBlank,
  TextareaItem,
  Flex,
  Modal,
  WhiteSpace,
  Button,
  List,
  InputItem,
  DatePicker
} from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import format from 'date-fns/format';
import R from 'ramda';

const Item = List.Item;

class TodoDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
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
    Modal.alert('删除', '确定删除这条事项吗？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.actions.DELETE_TODO_REQUEST({ id: this.props.todo.id });
          this.props.navigation.goBack();
        }
      }
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <List>
          <InputItem
            defaultValue={this.props.todo.content}
            placeholder="Todo"
            onBlur={() => this.onChangeTodo({ content: this.state.content })}
            onChangeText={value => {
              this.contentTouched = true;
              this.setState({ content: value });
            }}
          />

          <Item>
            <Flex>
              <Ionicons name="ios-time-outline" size={25} />

              <TouchableOpacity
                style={{ marginLeft: 10, width: '100%' }}
                onPress={this.showDateTimePicker}
              >
                <Text style={{ color: '#cdcdd1', fontSize: 16 }}>
                  {this.props.todo.deadline
                    ? format(this.props.todo.deadline, 'YYYY/MM/dd HH:mm')
                    : '请选择'}
                </Text>
              </TouchableOpacity>
            </Flex>

            <DateTimePicker
              mode="datetime"
              date={this.props.todo.deadline ? new Date(this.props.todo.deadline) : new Date()}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </Item>

          <Item>
            <Flex style={{ alignItems: 'flex-start' }}>
              <Ionicons
                style={{ marginLeft: 3, marginTop: 2 }}
                name="ios-clipboard-outline"
                size={25}
              />
              <Flex.Item style={{ marginLeft: 3, marginTop: 1 }}>
                <TextareaItem
                  onChange={value => {
                    this.setState({ detail: value });
                    this.detailTouched = true;
                  }}
                  onBlur={() => {
                    this.onChangeTodo({ detail: this.state.detail });
                  }}
                  defaultValue={this.props.todo.detail}
                  style={{ fontSize: 16 }}
                  placeholder="备注"
                  rows={5}
                  labelNumber={0}
                />
              </Flex.Item>
            </Flex>
          </Item>
        </List>
        <WhiteSpace style={{ height: 20 }} />

        <List>
          <Item onClick={this.deleteTodo}>
            <Flex style={{ alignItems: 'center' }}>
              <Ionicons
                style={{ marginLeft: 3, marginTop: 2, marginRight: 17, color: '#f54c41' }}
                name="ios-trash-outline"
                size={25}
              />
              <Text style={{ color: '#999' }}>删除此事项</Text>
            </Flex>
          </Item>
        </List>

        <WhiteSpace size="lg" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const TodoDetailScreenContainer = connect(
  (state, props) => {
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
