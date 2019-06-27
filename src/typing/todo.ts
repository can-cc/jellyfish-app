export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export interface Todo {
  id: string;
  content: string;
  done: boolean;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
