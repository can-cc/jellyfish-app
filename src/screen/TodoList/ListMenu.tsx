import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { MenuModal } from './MenuModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export function ListMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon
          color="#fff"
          size={20}
          icon={faEllipsisH}
          style={{
            marginRight: 16
          }}
        />
      </TouchableOpacity>

      <MenuModal visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </>
  );
}
