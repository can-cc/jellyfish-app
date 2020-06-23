export type TodoStatus = 'Doing' | 'Done';

export interface ITodo {
  id: string;
  status: TodoStatus;
  content: string;
  detail: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export type UpdateTodoInput = ITodo;

export interface DeleteTodoInput {
  id: string;
}
