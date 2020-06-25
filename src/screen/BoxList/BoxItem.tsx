import {TouchableOpacity, View } from "react-native";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppText } from "../../component/AppText";

interface BoxItemProps {
  iconColor: string;
  name: string;
  icon: IconProp;
  onClick: () => void;
}

export function BoxItem({  icon, iconColor, name, onClick }: BoxItemProps) {
  return <TouchableOpacity onPress={onClick}>
    <View style={{flexDirection: 'row', alignItems: 'center', height: 42 }}>
      <FontAwesomeIcon
        color={iconColor}
        size={20}
        icon={icon}
        style={{
          marginLeft: 16,
          marginRight: 12
        }}
      />
      <AppText style={{fontSize: 17}}>{name}</AppText>
    </View>
  </TouchableOpacity>;
}

