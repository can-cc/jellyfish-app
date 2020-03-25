import { AppRootState } from '../reducer';
import { Todo } from '../../../typing/todo';

export function selectAllTodo(state: AppRootState) {
  if (!state.todo.allTodoIDs) {
    return [];
  }
  return state.todo.allTodoIDs
    .filter(t => !!t)
    .map((id: string) => {
      return state.todo.entities.todo[id];
    })
    .filter(t => !!t);
}

export function selectAllTodoSortByID(state: AppRootState) {
  return selectAllTodo(state).sort((a, b) => (a.id as any) - (b.id as any));
}

export function selectTodoByID(state: AppRootState, id: string): Todo {
  return state.todo.entities.todo[id];
}
