import { useEffect, useState } from 'react';
import { Todo } from './TodoList';

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
    }
  };

  const onFilter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLParagraphElement && e.target.id !== filterSelected) {
      filter(e.target.id);
    }
  };

  const clearCompleted = () => {
    if (!itemsLeft) return;

    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  useEffect(() => {
    if (filterSelected === 'all') return;

    filter(filterSelected);
  }, [itemsLeft]);

  return (
    <div className='todo-control' data-testid='todo-control'>
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
