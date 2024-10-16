import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export default function TodoList({ todos, setTodos }: Props) {
  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            if (todo.show) {
              return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
            } else {
              return null;
            }
          })}
        </ul>
      ) : (
        <h4>Todo list is empty</h4>
      )}
    </>
  );
}
