import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface BoxItemProps {
  iconColor: string;
  name: string;
  icon: IconProp;
  selected: boolean;
  onClick: () => void;
}

export function BoxItem({  icon, iconColor, name }: BoxItemProps) {
  return <TouchableOpacity >
    <View style={{flexDirection: 'row', alignItems: 'center', height: 36 }}>
      <FontAwesomeIcon
        color={iconColor}
        size={20}
        icon={icon}
        style={{
          marginLeft: 16,
        }}
      />
      <Text>{name}</Text>
    </View>
  </TouchableOpacity>;
}

