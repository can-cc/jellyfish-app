import React, { Component, useState } from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './CreateTodoToggle';
import { AppButton } from '../Button';
import { AppText } from '../AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCalendar, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createTodoRequest } from '../../action/todo';

export function TodoCreator() {
  const dispatch = useDispatch();

  const windowHeight = Dimensions.get('window').height;
  const [showModal, setShowModal] = useState(false);
  const [todoContent, setTodoContent] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const submit = () => {
    dispatch(
      createTodoRequest({
        content: todoContent
      })
    );
    closeModal();
  };

  return (
    <View style={{ position: 'absolute', top: windowHeight - 200, right: 20, zIndex: 1000 }}>
      <Modal
        avoidKeyboard={true}
        isVisible={showModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
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
            paddingBottom: 30,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          <TextInput
            placeholder="您希望做什么？"
            autoFocus
            style={{
              height: 40,
              paddingLeft: 10,
              borderColor: '#dadada',
              borderBottomWidth: 0,
              textAlign: 'left',
              fontWeight: '800',
              fontSize: 18
            }}
            placeholderTextColor="#bbb"
            onSubmitEditing={() => submit()}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={setTodoContent}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: -8
            }}
          >
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faListAlt} />
            </AppButton>
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faBell} />
            </AppButton>
            <AppButton transparent>
              <FontAwesomeIcon color="#555" icon={faCalendar} />
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
