import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../redux/action/actions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { AppText } from '../component/AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateTodoRequest, deleteTodoRequest } from '../redux/action/todo';

// TODO remove
class TodoDetailScreen extends Component<
  NavigationContainerProps & {
    todo: any;
    actions: ActionCreatorsMapObject;
  },
  any
> {
  static navigationOptions = ({ navigation }): NavigationScreenOptions => {
    return {
      title: '',
      headerBackTitle: '',
      headerTruncatedBackTitle: '',
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
            <FontAwesomeIcon color="#555" icon={faEllipsisH} />
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{
              marginTop: 24,
              borderRadius: 4,
              width: 150
            }}
          >
            <MenuOption
              onSelect={navigation.getParam('deleteTodo')}
              customStyles={{
                optionWrapper: {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  paddingLeft: 12,
                  paddingTop: 12,
                  paddingBottom: 12
                }
              }}
            >
              <FontAwesomeIcon color="red" icon={faTrashAlt} />
              <AppText style={{ paddingLeft: 8 }}>Delete</AppText>
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
  didBlurSubscription: NavigationEventSubscription | null = null;

  componentWillMount() {
    this.didBlurSubscription = this.props.navigation!.addListener('willBlur', payload => {
      this.onChangeTodo({
        content: this.contentTouched ? this.state.content : this.props.todo.content,
        detail: this.detailTouched ? this.state.detail : this.props.todo.detail
      });
    });
  }

  componentDidMount() {
    this.props.navigation!.setParams({
      deleteTodo: this.deleteTodo
    });
  }

  componentWillUnmount() {
    if (this.didBlurSubscription) {
      this.didBlurSubscription!.remove();
    }
  }

  onChangeTodo(changed) {
    this.props.actions.updateTodo({ ...this.props.todo, ...changed });
  }

  deleteTodo = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure to delete this todo?',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.actions.deleteTodo({
              id: this.props.todo.id
            });
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      {
        cancelable: false
      }
    );
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
  (dispatch: Dispatch) => {
    return {
      actions: bindActionCreators(
        {
          updateTodo: updateTodoRequest,
          deleteTodo: deleteTodoRequest
        },
        dispatch
      )
    };
  }
)(TodoDetailScreen);
