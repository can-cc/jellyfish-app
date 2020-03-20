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

export function selectAllTodoSortByID(state: AppRootState) {
  return selectAllTodo(state).sort((a, b) => (a.id as any) - (b.id as any));
}
