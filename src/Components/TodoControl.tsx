import { useLayoutEffect, useState } from 'react';
import { Todo } from './TodoApp';

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  itemsLeft: number;
}
export default function TodoControl({ setTodos, itemsLeft }: Props) {
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

      default:
        console.error('unknown filter');
        break;
    }
  };

  const onFilter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLParagraphElement && e.target.id !== filterSelected) {
      filter(e.target.id);
    }
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  useLayoutEffect(() => {
    if (filterSelected === 'all') return;

    filter(filterSelected);
  }, [itemsLeft]);

  return (
    <div className='todo-control' data-testid='todo-control'>
      <p>{`${itemsLeft} items left`}</p>

      <div className='todo-control-filter' onClick={onFilter}>
        <p id='all' className={filterSelected === 'all' ? 'selected' : undefined}>
          All
        </p>
        <p id='active' className={filterSelected === 'active' ? 'selected' : undefined}>
          Active
        </p>
        <p id='completed' className={filterSelected === 'completed' ? 'selected' : undefined}>
          Completed
        </p>
      </div>

      <p onClick={clearCompleted}>Clear completed</p>
    </div>
  );
}
