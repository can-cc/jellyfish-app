import { AppRootState } from '../reducer';
import { ITodo } from '../../../typing/todo';

export function selectTodo(state: AppRootState) {
  const showDone = state.todo.showDone;

  if (!state.todo.allTodoIDs) {
    return [];
  }
  return state.todo.allTodoIDs
    .map((id: string) => {
      return state.todo.entities.todo[id];
    })
    .filter(t => !!t && (t.status !== 'Done' || showDone));
}

export function selectTodoSortByID(state: AppRootState) {
  return selectTodo(state).sort((a, b) => (a.id as any) - (b.id as any));
}

export function selectTodoByID(state: AppRootState, id: string): ITodo {
  return state.todo.entities.todo[id];
}
