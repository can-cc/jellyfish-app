import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import Input from '../component/Input';
import { NavigationScreenOptions } from 'react-navigation';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { AppText } from '../component/AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class TodoDetailScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }): NavigationScreenOptions => {
    return {
      title: '',
      headerBackTitle: '',
      headerRight: (
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerOuterWrapper: {
                marginRight: 10
              },
              triggerWrapper: {
                height: 24,
                paddingRight: 6,
                paddingLeft: 6,
                justifyContent: 'center',
                alignItems: 'center'
              },
              triggerTouchable: {
                underlayColor: 'transparent'
              }
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{
              marginTop: 24,
              borderRadius: 4
            }}
          >
            <MenuOption
              customStyles={{
                optionWrapper: {
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexWrap: 'nowrap'
                }
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              <AppText style={{ color: 'red' }}>Delete</AppText>
            </MenuOption>
          </MenuOptions>
        </Menu>
      )
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
          style={{
            fontSize: 18
          }}
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
  container: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 12
  }
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
