//
import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './CreateTodoToggle';
import { appFont } from '../AppText';
import { AppButton } from '../Button';
import { AppText } from '../AppText';

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
          hasBackdrop={true}
          avoidKeyboard={true}
          isVisible={this.state.showModal}
          onBackButtonPress={this.onClose}
          onBackdropPress={this.onClose}
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
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
          >
            <TextInput
              placeholder="您希望做什么？"
              autoFocus
              style={{
                height: 40,
                borderColor: '#dadada',
                borderBottomWidth: 0,
                textAlign: 'left',
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

            <View>
              <AppButton
                transparent
                style={{ width: 80, paddingRight: 0, alignSelf: 'flex-end' }}
                onPress={e => {
                  this.submit(e);
                }}
              >
                <AppText>保存</AppText>
              </AppButton>
            </View>
          </View>
        </Modal>
        <CreateTodoToggle onClick={this.onToggleClick} />
      </View>
    );
  }
}
