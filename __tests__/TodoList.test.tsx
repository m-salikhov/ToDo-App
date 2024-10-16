import { render, screen } from '@testing-library/react';
import TodoList from '../src/Components/TodoList';

const todos = [
  {
    id: 1,
    text: 'todo 1',
    completed: false,
    show: true,
  },

  {
    id: 2,
    text: 'todo 2',
    completed: true,
    show: true,
  },

  {
    id: 3,
    text: 'todo 3',
    completed: false,
    show: false,
  },
  {
    id: 4,
    text: 'todo 4',
    completed: true,
    show: false,
  },
];

describe('TodoList render', () => {
  test('render empty todo list', () => {
    render(<TodoList todos={[]} setTodos={() => {}} />);

    const fillerElement = screen.getByText('Todo list is empty');
    expect(fillerElement).toBeInTheDocument();
  });

  test('render todo list', () => {
    render(<TodoList todos={todos} setTodos={() => {}} />);

    const list = screen.getByRole('list');
    expect(list).toMatchSnapshot();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);

    const paragraphDefaultTodo = screen.getByText(/todo 1/i);
    expect(paragraphDefaultTodo).not.toHaveClass('completed');
    expect(paragraphDefaultTodo).toBeInTheDocument();

    const paragraphCompletedTodo = screen.getByText(/todo 2/i);
    expect(paragraphCompletedTodo).toHaveClass('completed');
  });
});

describe('Todo Items render', () => {
  test('uncompleted todo item', () => {
    render(<TodoList todos={todos} setTodos={() => {}} />);

    const paragraphTodo = screen.getByText(/todo 1/i);

    expect(paragraphTodo).toBeInTheDocument();
    expect(paragraphTodo).not.toHaveClass('completed');
  });

  test('completed todo item', () => {
    render(<TodoList todos={todos} setTodos={() => {}} />);

    const paragraphTodo = screen.getByText(/todo 2/i);

    expect(paragraphTodo).toBeInTheDocument();
    expect(paragraphTodo).toHaveClass('completed');
  });
});
