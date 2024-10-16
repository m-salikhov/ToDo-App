import { useState } from 'react';
import { Todo } from './TodoApp';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoForm({ setTodos }: Props) {
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text) return;

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text,
        completed: false,
        show: true,
      },
    ]);
    setText('');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
    >
      <input
        type='text'
        placeholder='What needs to be done?'
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />

      <button type='button' onClick={addTodo}>
        Add
      </button>
    </form>
  );
}
