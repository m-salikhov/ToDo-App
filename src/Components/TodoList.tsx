import './todo-list.css';
import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoControl from './TodoControl';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  show: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <h1>todos</h1>

      <div className='todo-wrapper'>
        <TodoForm setTodos={setTodos} />

        {todos.length > 0 ? (
          todos.map((todo) => {
            if (todo.show) {
              return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
            } else {
              return null;
            }
          })
        ) : (
          <h4>Todo list is empty</h4>
        )}

        <TodoControl setTodos={setTodos} itemsLeft={todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0)} />
      </div>
    </>
  );
}
