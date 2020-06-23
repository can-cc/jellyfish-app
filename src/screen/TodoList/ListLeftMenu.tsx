import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { useNavigation } from "@react-navigation/native";

export function ListLeftMenu() {
  const navigation = useNavigation();

  const goBoxList = () => {
    navigation.navigate("BoxList", {});
  };

  return (
    <>
      <TouchableOpacity onPress={() => goBoxList()}>
        <FontAwesomeIcon
          color="#fff"
          size={20}
          icon={faListUl}
          style={{
            marginLeft: 16
          }}
        />
      </TouchableOpacity>
    </>
  );
}
