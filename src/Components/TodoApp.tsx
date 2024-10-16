import './todo-list.css';
import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoControl from './TodoControl';
import TodoList from './TodoList';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  show: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <h1>todos</h1>

      <div className='todo-wrapper'>
        <TodoForm setTodos={setTodos} />

        <TodoList todos={todos} setTodos={setTodos} />

        <TodoControl setTodos={setTodos} itemsLeft={todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0)} />
      </div>
    </>
  );
}
