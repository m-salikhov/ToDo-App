import { Todo } from './TodoApp';
import green_mark from '../assets/green_mark.svg';
import red_cross from '../assets/red_cross.svg';

interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({ todo, setTodos }: Props) {
  const onDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((elem) => elem.id !== todo.id));
  };

  const onClick = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((elem) => {
        if (elem.id === todo.id) {
          return { ...elem, completed: !elem.completed };
        }
        return elem;
      });
    });
  };

  return (
    <li>
      <div className='todo-item-icon'>
        <div className='todo-item-circle' onClick={onClick} data-testid='change-status-icon'>
          {todo.completed && <img src={green_mark} alt='todo completed icon' />}
        </div>
      </div>

      <p onClick={onClick} className={todo.completed ? 'completed' : undefined}>
        {todo.text}
      </p>

      <div className='todo-item-remove'>
        <img src={red_cross} alt='remove todo icon' onClick={onDelete} data-testid='delete-icon' />
      </div>
    </li>
  );
}
