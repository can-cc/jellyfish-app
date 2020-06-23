import { schema } from 'normalizr';

export const TodoSchema = new schema.Entity('todo');
export const TodoListSchema = new schema.Array(TodoSchema);

export const BoxSchema = new schema.Entity('Box');
export const BoxListSchema = new schema.Array(BoxSchema);