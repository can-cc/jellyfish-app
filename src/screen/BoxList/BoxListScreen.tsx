import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { queryBoxList } from "../../redux/action/box";
import { selectBoxes } from "../../redux/reducer/selector/box-selector";
import { AppRootState } from "../../redux/reducer/reducer";
import { BoxItem } from "./BoxItem";
import { faCalendar, faSortAlphaUp, faStar, faSun, faTasks } from "@fortawesome/free-solid-svg-icons";

export function BoxListScreen() {
  const [selectedBoxId, setSelectedBoxId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryBoxList());
  }, []);

  const boxes = useSelector((state: AppRootState) => selectBoxes(state));

  const onBoxClick = (name: string) => {};

  return <View style={{
    backgroundColor: 'white'
  }}>
    <View>
      <BoxItem
        iconColor="#556735"
        icon={faSortAlphaUp}
        name="全部"
        selected={selectedBoxId === "@ALL"}
        onClick={() => onBoxClick("@ALL")}
      />
      <BoxItem
        iconColor="#ECC30B"
        icon={faSun}
        name="我的一天"
        selected={selectedBoxId === "@MY_DAILY"}
        onClick={() => onBoxClick("@MY_DAILY")}
      />
      <BoxItem
        iconColor="#FF0000"
        icon={faStar}
        name="重要"
        selected={selectedBoxId === "@IMPORTANT"}
        onClick={() => onBoxClick("@IMPORTANT")}
      />
      <BoxItem
        iconColor="#2292A4"
        icon={faTasks}
        name="任务"
        selected={selectedBoxId === "@TASK"}
        onClick={() => onBoxClick("@TASK")}
      />
      <BoxItem
        iconColor="#9FCC2E"
        icon={faCalendar}
        name="已安排日程"
        selected={selectedBoxId === "@SCHEDULE"}
        onClick={() => onBoxClick("@SCHEDULE")}
      />
    </View>

    {
      boxes.map(box =>
        <BoxItem
          key={box.id}
          iconColor="#9FCC2E"
          icon={faCalendar}
          name={box.name}
          selected={selectedBoxId === "@SCHEDULE"}
          onClick={() => onBoxClick("@SCHEDULE")} />)
    }
  </View>;
}