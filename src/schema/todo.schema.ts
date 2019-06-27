import { schema } from 'normalizr';

export const TodoSchema = new schema.Entity('todo');
export const TodoListSchema = new schema.Array(TodoSchema);
