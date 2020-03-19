import { AppRootState } from '../reducer';

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
