export type TodoStatus = 'Doing' | 'Done';

export interface Todo {
  id: string;
  status: TodoStatus;
  content: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export type UpdateTodoInput = Todo;

export interface DeleteTodoInput {
  id: string;
}
