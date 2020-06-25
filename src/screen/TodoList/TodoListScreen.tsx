import React, { useEffect, useRef } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TodoCreator } from "./TodoCreator";
import { getTodoListRequest } from "../../redux/action/todo";
import { AppRootState } from "../../redux/reducer/reducer";
import { selectTodoSortByID } from "../../redux/reducer/selector/todo-selector";
import { TodoList } from "./TodoList";
import { selectCurrentBox } from "../../redux/reducer/selector/box-selector";
import { AppText } from "../../component/AppText";
import { mapBasicBoxIdToName } from "../BoxList/util";

export function TodoListScreen() {
  const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView>(null);

  const getTodoList = (boxId: string) => {
    dispatch(getTodoListRequest(boxId));
  };

  const boxId = useSelector((state: AppRootState) => state.todo.boxId);
  const box = useSelector((state: AppRootState) => selectCurrentBox(state));
  const boxName = mapBasicBoxIdToName(boxId) || box.name;

  useEffect(() => {
    getTodoList(boxId);
  }, []);

  const todoList = useSelector(selectTodoSortByID);
  const refreshing = useSelector((state: AppRootState) => state.todo.refreshing);
  const onTodoCreated = () => {
    if (scrollViewRef.current) {
      return;
    }
    scrollViewRef.current!.scrollToEnd()
  };

  return (
    <View style={styles.container}>

      <TodoCreator onCreated={onTodoCreated}/>

      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: "#FF8976",
          flex: 1
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => getTodoList(boxId)}/>}
      >
        <View style={{
          marginLeft: 12
        }}>
          <AppText style={{
            color: "white",
            fontSize: 32,
            fontWeight: "900"
          }}>{boxName}</AppText>
        </View>

        <TodoList
          todoList={todoList}
          style={{
            padding: 8,
            marginBottom: 90
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1
  }
});
