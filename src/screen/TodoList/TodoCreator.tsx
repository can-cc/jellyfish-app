import React, { useState } from 'react';
import { View } from 'react-native';
import { CreateTodoToggle } from './TodoCreatorToggle';
import { useDispatch } from "react-redux";
import { TodoCreatorModal } from './TodoCreatorModal';

interface Props {
  onCreated: () => void
}

export function TodoCreator({onCreated}: Props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1000, width: '100%' }}>
      <TodoCreatorModal onCreated={onCreated} showModal={showModal} closeModal={closeModal} />

      <CreateTodoToggle onClick={() => setShowModal(true)} />
    </View>
  );
}
