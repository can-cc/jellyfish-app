//
import React from 'react';
import { View, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Item = List.Item;
import format from 'date-fns/format';
import { appFont, AppText } from '../AppText';
import RNPickerSelect from 'react-native-picker-select';

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

  submit = event => {
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
        <Modal
          visible={this.state.modal1}
          avoidKeyboard={true}
          onBackButtonPress={this.onClose}
          style={{
            bottom: 0,
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

            <TextInput
              placeholder="您希望做什么？"
              style={{
                marginTop: 25,
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

            <Item
              style={{
                marginTop: 20,
                marginLeft: 0,
                paddingLeft: 0,
                borderBottomWidth: 0.2,
                borderColor: '#dadada'
              }}
            >
              <View>
                <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/clock.png')} />

                <TouchableOpacity style={{ marginLeft: 10, width: '100%' }} onPress={this.showDateTimePicker}>
                  <AppText
                    style={{
                      color: this.state.deadline ? '#333' : '#bbb',
                      fontSize: 16,
                      letterSpacing: 1.3,
                      fontWeight: '400',
                      marginLeft: 1
                    }}
                  >
                    {this.state.deadline ? format(this.state.deadline, 'yyyy/MM/dd HH:mm') : '任务deadline'}
                  </AppText>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                mode="datetime"
                date={this.state.deadline ? new Date(this.state.deadline) : new Date()}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
              />
            </Item>

            {/*TODO_TYPE*/}
            <Item
              style={{
                marginTop: 7,
                marginLeft: 0,
                paddingLeft: 0,
                borderBottomWidth: 0.2,
                borderColor: '#dadada'
              }}
            >
              <View>
                <Image style={{ width: 20, height: 20 }} source={require('../../assets/icons/clock.png')} />

                <RNPickerSelect
                  placeholder={{}}
                  placeholderTextColor="#333"
                  style={{
                    inputIOS: {
                      width: '100%',
                      marginLeft: 10,
                      marginTop: 2.5,
                      color: '#333',
                      fontSize: 16,
                      letterSpacing: 1.3,
                      fontWeight: '400'
                    },
                    inputAndroid: {
                      width: 100,
                      marginLeft: 4,
                      height: 18,
                      color: '#333'
                    },
                    underline: {
                      borderTopWidth: 0
                    }
                  }}
                  hideIcon={true}
                  items={TODO_TYPE_ITEMS}
                  onValueChange={value => {
                    this.setState({
                      type: value
                    });
                  }}
                  value={this.state.type}
                />
              </View>
            </Item>

            {/* 备注 */}
            <View style={{ alignItems: 'flex-start', marginTop: 5 }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  position: 'relative',
                  top: 5,
                  marginRight: 7,
                  marginLeft: 0,
                  marginTop: 5
                }}
                source={require('../../assets/icons/pencil.png')}
              />

              <View.Item style={{ height: 60 }}>
                <TextInput
                  onChange={value => {
                    this.setState({ detail: value });
                  }}
                  style={{
                    fontFamily: appFont,
                    marginTop: Platform.OS === 'ios' ? 3 : -9,
                    fontSize: 16,
                    width: '100%',
                    height: '100%',
                    fontWeight: '400',
                    letterSpacing: 2
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="+备注"
                  placeholderColor="#bbb"
                  placeholderStyle={{
                    fontFamily: appFont
                  }}
                  autoCapitalize="none"
                  multiline={true}
                />
              </View.Item>
            </View>

            <Button
              style={{
                height: 45,
                backgroundColor: '#c2ddff',
                borderWidth: 0,
                shadowColor: 'rgb(194, 221, 255)',
                shadowOpacity: 0.58,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 7 }
              }}
              onClick={e => {
                this.submit(e);
              }}
            >
              <AppText
                style={{
                  color: '#4295ff'
                }}
              >
                OK
              </AppText>
            </Button>
          </View>
        </Modal>

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
