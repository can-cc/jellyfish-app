//
import React from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './CreateTodoToggle';
import { appFont } from '../AppText';

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
    console.log('---------> unmount');
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
            justifyContent: 'flex-end',
            margin: 0
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

            <TextInput
              placeholder="您希望做什么？"
              autoFocus
              style={{
                height: 40,
                borderColor: '#dadada',
                borderBottomWidth: 0.8,
                textAlign: 'center',
                fontWeight: '800',
                fontSize: 18
              }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderStyle={{
                fontFamily: appFont
              }}
              onChangeText={text => this.setState({ content: text })}
            />
          </View>
        </Modal>
        <CreateTodoToggle onClick={this.onToggleClick} />
      </View>
    );
  }
}
