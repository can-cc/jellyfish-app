import React, { Component, useState } from 'react';
import { View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { CreateTodoToggle } from './TodoCreatorToggle';
import { AppButton } from '../../component/Button';
import { AppText } from '../../component/AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCalendar, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createTodoRequest } from '../../redux/action/todo';
import { TodoCreatorModal } from './TodoCreatorModal';

export function TodoCreator() {
  const dispatch = useDispatch();

  const windowHeight = Dimensions.get('window').height;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1000, width: '100%' }}>
      <TodoCreatorModal showModal={showModal} closeModal={closeModal} />

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
