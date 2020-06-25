import { AppRootState } from '../reducer';
import { ITodo } from '../../../typing/todo';
import R from 'ramda';
import { isBasicBox } from "../../../screen/BoxList/util";

export function selectTodo(state: AppRootState) {
  const showDone = state.todo.showDone;
  const boxId = state.todo.boxId;

  return R.values(state.todo.entities.todo)
    .filter((todo: ITodo) => {
      if (isBasicBox(boxId)) {
        return (todo.status !== 'Done' || showDone )
      }
      return todo.boxId === boxId && (todo.status !== 'Done' || showDone )
    })
    .filter(t => !!t && (t.status !== 'Done' || showDone ));
}

export function selectTodoSortByID(state: AppRootState) {
  return selectTodo(state).sort((a, b) => (a.id as any) - (b.id as any));
}

export function selectTodoByID(state: AppRootState, id: string): ITodo {
  return state.todo.entities.todo[id];
}
