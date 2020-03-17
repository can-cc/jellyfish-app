import React, { Component, useState } from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './CreateTodoToggle';
import { AppButton } from '../Button';
import { AppText } from '../AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCalendar, faListAlt } from '@fortawesome/free-solid-svg-icons';

export function TodoCreator() {
  const windowHeight = Dimensions.get('window').height;
  const [showModal, setShowModal] = useState(false);
  const [todoContent, setTodoContent] = useState('');
  const onClose = () => {
    setShowModal(false);
  };

  const submit = () => {};

  return (
    <View style={{ position: 'absolute', top: windowHeight - 200, right: 20, zIndex: 1000 }}>
      <Modal
        avoidKeyboard={true}
        isVisible={showModal}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        useNativeDriver={true}
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
            onChangeText={setTodoContent}
          />

          <View>
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faListAlt} />
            </AppButton>
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faBell} />
            </AppButton>
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faCalendar} />
            </AppButton>
            <AppButton
              transparent
              style={{ width: 80, paddingRight: 0, alignSelf: 'flex-end' }}
              onPress={(e: any) => {
                submit();
              }}
            >
              <AppText>保存</AppText>
            </AppButton>
          </View>
        </View>
      </Modal>

      <CreateTodoToggle onClick={() => setShowModal(true)} />
    </View>
  );
}

// export class TodoCreator extends Component<any, any> {
//   state: any = {
//     content: '',
//     value: '',
//     deadline: null,
//     isDateTimePickerVisible: false,
//     showModal: false,
//     type: 'NORMAL'
//   };

//   componentWillUnmount() {
//     this.onClose();
//   }

//   submit = () => {
//     this.props.onSubmit({
//       content: this.state.content,
//       deadline: this.state.deadline,
//       detail: this.state.detail,
//       type: this.state.type
//     });
//     this.onClose();
//   };

//   onClose = () => {
//     this.setState({
//       showModal: false
//     });
//   };

//   onToggleClick = () => {
//     this.setState({
//       showModal: true
//     });
//   };

//   render() {

//   }
// }
