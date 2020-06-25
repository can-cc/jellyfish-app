import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { queryBoxList, selectBoxId } from "../../redux/action/box";
import { selectBoxes } from "../../redux/reducer/selector/box-selector";
import { AppRootState } from "../../redux/reducer/reducer";
import { BoxItem } from "./BoxItem";
import { faCalendar, faSortAlphaUp, faStar, faSun, faTasks } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "../../component/Divider";
import { useNavigation } from "@react-navigation/native";

export function BoxListScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(queryBoxList());
  }, []);

  const boxes = useSelector((state: AppRootState) => selectBoxes(state));

  const onBoxClick = (boxId: string) => {
    dispatch(selectBoxId(boxId));
    navigation.navigate("TodoList")
  };

  return <View style={{
    backgroundColor: 'white',
    flex: 1
  }}>
    <View>
      <BoxItem
        iconColor="#556735"
        icon={faSortAlphaUp}
        name="全部"
        onClick={() => onBoxClick("@ALL")}
      />
      <BoxItem
        iconColor="#ECC30B"
        icon={faSun}
        name="我的一天"
        onClick={() => onBoxClick("@MY_DAILY")}
      />
      <BoxItem
        iconColor="#FF0000"
        icon={faStar}
        name="重要"
        onClick={() => onBoxClick("@IMPORTANT")}
      />
      <BoxItem
        iconColor="#2292A4"
        icon={faTasks}
        name="任务"
        onClick={() => onBoxClick("@TASK")}
      />
      <BoxItem
        iconColor="#9FCC2E"
        icon={faCalendar}
        name="已安排日程"
        onClick={() => onBoxClick("@SCHEDULE")}
      />
    </View>

    <View style={{paddingRight: 13, paddingLeft: 13, marginTop: 8, marginBottom: 8}}>
      <Divider />
    </View>

    {
      boxes.map(box =>
        <BoxItem
          key={box.id}
          iconColor="#354B9E"
          icon={faCalendar}
          name={box.name}
          onClick={() => onBoxClick(box.id)} />)
    }
  </View>;
}