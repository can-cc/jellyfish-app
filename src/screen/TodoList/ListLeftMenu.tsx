import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MenuModal } from './MenuModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";

export function ListLeftMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon
          color="#fff"
          size={20}
          icon={faListUl}
          style={{
            marginLeft: 16
          }}
        />
      </TouchableOpacity>

      <MenuModal visible={modalVisible} closeModal={() => setModalVisible(false)} />
    </>
  );
}
