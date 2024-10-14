import { useEffect, useState } from 'react';
import { Todo } from './TodoList';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  itemsLeft: number;
}
export default function TodoControl({ setTodos, itemsLeft, todos }: Props) {
  const [filterSelected, setFilterSelected] = useState<'all' | 'active' | 'completed'>('all');

  const filter = (value: string) => {
    switch (value) {
      case 'all':
        setTodos((prev) => prev.map((todo) => ({ ...todo, show: true })));
        setFilterSelected('all');
        break;

      case 'active':
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo.completed) {
              return { ...todo, show: false };
            }
            return { ...todo, show: true };
          })
        );
        setFilterSelected('active');
        break;

      case 'completed':
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo.completed) {
              return { ...todo, show: true };
            }
            return { ...todo, show: false };
          })
        );
        setFilterSelected('completed');
        break;
    }
  };

  const onFilter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLParagraphElement) {
      filter(e.target.id);
    }
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    filter(filterSelected);
  }, [todos]);

  return (
    <div className='todo-control'>
      <p>{`${itemsLeft} items left`}</p>

      <div className='todo-control-filter' onClick={onFilter}>
        <p id='all' className={filterSelected === 'all' ? 'active' : undefined}>
          All
        </p>
        <p id='active' className={filterSelected === 'active' ? 'active' : undefined}>
          Active
        </p>
        <p id='completed' className={filterSelected === 'completed' ? 'active' : undefined}>
          Completed
        </p>
      </div>

      <p onClick={clearCompleted}>Clear completed</p>
    </div>
  );
}
