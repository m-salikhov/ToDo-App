import { render, screen } from '@testing-library/react';
import TodoItem from '../src/Components/TodoItem';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const todo = {
  id: 1,
  text: 'test',
  completed: false,
  show: true,
};

describe('TodoItem render', () => {
  test('render todo item', () => {
    render(<TodoItem todo={todo} setTodos={() => {}} />);

    const paragraphElement = screen.getByText(/test/i);
    const greenArrowIcon = screen.queryByRole('img', { name: 'todo completed icon' });
    const redCrossIcon = screen.queryByRole('img', { name: 'remove todo icon' });

    expect(greenArrowIcon).toBeNull();
    expect(paragraphElement).toBeInTheDocument();
    expect(redCrossIcon).toBeInTheDocument();
  });

  test('render completed todo item', () => {
    render(<TodoItem todo={{ ...todo, completed: true }} setTodos={() => {}} />);

    const paragraphElement = screen.getByText(/test/i);
    const greenArrowIcon = screen.getByRole('img', { name: 'todo completed icon' });

    expect(paragraphElement).toBeInTheDocument();
    expect(greenArrowIcon).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('completed');
  });
});

describe('TodoItem click', () => {
  test('click on todo item paragraph', async () => {
    const todoItem = { ...todo };

    const fn = vi.fn().mockImplementation(() => {
      todoItem.completed = !todoItem.completed;
    });

    const { rerender } = render(<TodoItem todo={todoItem} setTodos={fn} />);
    const paragraphElement = screen.getByText(/test/i);
    expect(paragraphElement).not.toHaveClass('completed');

    await userEvent.click(paragraphElement);

    rerender(<TodoItem todo={todoItem} setTodos={fn} />);
    const paragraphElementCompleted = screen.getByText(/test/i);
    expect(paragraphElementCompleted).toHaveClass('completed');
    expect(fn).toHaveBeenCalledTimes(1);

    await userEvent.click(paragraphElement);

    rerender(<TodoItem todo={todoItem} setTodos={fn} />);
    const paragraphElementUnCompleted = screen.getByText(/test/i);
    expect(paragraphElementUnCompleted).not.toHaveClass('completed');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('click on todo status icon', async () => {
    const todoItem = { ...todo };

    const fn = vi.fn().mockImplementation(() => {
      todoItem.completed = !todoItem.completed;
    });

    const { rerender } = render(<TodoItem todo={todoItem} setTodos={fn} />);

    const statusIconElement = screen.getByTestId('change-status-icon');
    const greenArrowIcon = screen.queryByRole('img', { name: 'todo completed icon' });
    expect(greenArrowIcon).not.toBeInTheDocument();

    await userEvent.click(statusIconElement);

    rerender(<TodoItem todo={todoItem} setTodos={fn} />);
    const greenArrowIconCompleted = screen.getByRole('img', { name: 'todo completed icon' });
    expect(greenArrowIconCompleted).toBeInTheDocument();
    expect(fn).toHaveBeenCalledTimes(1);

    await userEvent.click(statusIconElement);

    rerender(<TodoItem todo={todoItem} setTodos={fn} />);
    const greenArrowIconUnCompleted = screen.queryByRole('img', { name: 'todo completed icon' });
    expect(greenArrowIconUnCompleted).not.toBeInTheDocument();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('click on delete icon', async () => {
    const fn = vi.fn();
    render(<TodoItem todo={todo} setTodos={fn} />);

    const deleteIconElement = screen.getByTestId('delete-icon');

    await userEvent.click(deleteIconElement);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
