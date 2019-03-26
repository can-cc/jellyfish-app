//
import React from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, TextInput, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './CreateTodoToggle';

const TODO_TYPE_ITEMS = [
  {
    label: '代办',
    value: 'NORMAL'
  },
  {
    label: '习惯',
    value: 'HABIT'
  }
];

export class TodoCreater extends React.Component {
  state = {
    content: '',
    value: '',
    deadline: null,
    isDateTimePickerVisible: false,
    showModal: false,
    type: 'NORMAL'
  };

  componentWillUnmount() {
    this.onClose();
  }

  submit = () => {
    this.props.onSubmit({
      content: this.state.content,
      deadline: this.state.deadline,
      detail: this.state.detail,
      type: this.state.type
    });
    this.onClose();
  };

  onClose = () => {
    this.setState({
      showModal: false
    });
  };

  onToggleClick = () => {
    this.setState({
      showModal: true
    });
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({ deadline: date.getTime() });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View style={{ width: '100%' }}>
        <Modal
          isVisible={this.state.showModal}
          backdropColor="transparent"
          onBackButtonPress={this.onClose}
          style={{
            top: -10,
            paddingRight: 5,
            paddingLeft: 5,
            shadowColor: 'rgba(64, 64, 64, 0.15)',
            shadowOpacity: 1,
            shadowRadius: 9,
            shadowOffset: { width: 0, height: 0 },
            position: 'relative'
          }}
          useNativeDriver={true}
          title={null}
          footer={null}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 8,
              elevation: 5,
              position: 'relative'
            }}
          >
            <TouchableOpacity
              onPress={this.onClose}
              style={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/x.png')} />
            </TouchableOpacity>
          </View>
        </Modal>
        <CreateTodoToggle onClick={this.onToggleClick} />
      </View>
    );
  }
}
