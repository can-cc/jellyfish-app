//
import React from 'react';
import { View, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex } from 'antd-mobile-rn';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Item = List.Item;
import format from 'date-fns/format';
import { appFont, AppText } from '../AppText';
import RNPickerSelect from 'react-native-picker-select';

class TodoCreaterCompoent extends React.Component {
  state = {
    content: '',
    value: '',
    deadline: null,
    isDateTimePickerVisible: false,
    modal1: false,
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
      modal1: false
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
        <TouchableOpacity
          style={{
            width: 115,
            height: 50,
            borderWidth: 0,
            borderRadius: 25,
            position: 'absolute',
            left: '50%',
            top: '0%',
            marginLeft: -55,
            marginTop: -25
          }}
          onPress={e => {
            e.preventDefault();
            this.setState({
              content: '',
              deadline: null,
              detail: '',
              modal1: true
            });
          }}
        >
          <View
            style={{
              flex: 1,
              shadowColor: 'rgba(64, 64, 64, 0.15)',
              shadowOpacity: 1,
              shadowRadius: 9,
              shadowOffset: { width: 0, height: 5 },
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingTop: 5
            }}
          >
            <Image
              style={{
                width: 10,
                height: 10
              }}
              source={require('../../assets/icons/+.png')}
            />
            <View style={{ width: 3, height: 10 }} />
            <AppText style={{ marginLeft: 5, fontSize: 15, fontWeight: '200' }}>新任务</AppText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export const TodoCreater = TodoCreaterCompoent;
