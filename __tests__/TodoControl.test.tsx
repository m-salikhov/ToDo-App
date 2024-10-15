import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import TodoControl from '../src/Components/TodoControl';

describe('TodoControl render', () => {
  test('render todo control', () => {
    render(<TodoControl setTodos={() => {}} itemsLeft={0} />);

    const todoControlElement = screen.getByTestId('todo-control');
    const filterAllElement = screen.getByText('All');

    expect(todoControlElement).toBeInTheDocument();
    expect(filterAllElement).toHaveClass('active');
  });

  test('left items counter render', () => {
    let itemsLeft = 0;
    const { rerender } = render(<TodoControl setTodos={() => {}} itemsLeft={itemsLeft} />);

    const itemsLeftElementEmpty = screen.getByText(`0 items left`);

    itemsLeft = 5;
    rerender(<TodoControl setTodos={() => {}} itemsLeft={itemsLeft} />);

    const itemsLeftElementNotEmpty = screen.getByText(`5 items left`);

    expect(itemsLeftElementEmpty).toBeInTheDocument();
    expect(itemsLeftElementNotEmpty).toBeInTheDocument();
  });
});

describe('user interactions with todo control', () => {
  test('click on filter block', async () => {
    const fn = vi.fn();
    render(<TodoControl setTodos={fn} itemsLeft={5} />);

    const filterAllElement = screen.getByText('All');
    const filterActiveElement = screen.getByText('Active');
    const filterCompletedElement = screen.getByText('Completed');

    await userEvent.click(filterActiveElement);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(filterAllElement).not.toHaveClass('active');
    expect(filterActiveElement).toHaveClass('active');
    expect(filterCompletedElement).not.toHaveClass('active');

    await userEvent.click(filterActiveElement);
    expect(fn).toHaveBeenCalledTimes(1);

    await userEvent.click(filterCompletedElement);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(filterAllElement).not.toHaveClass('active');
    expect(filterActiveElement).not.toHaveClass('active');
    expect(filterCompletedElement).toHaveClass('active');

    await userEvent.click(filterAllElement);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(filterAllElement).toHaveClass('active');
    expect(filterActiveElement).not.toHaveClass('active');
    expect(filterCompletedElement).not.toHaveClass('active');
  });

  test('click on clear completed button', async () => {
    const fn = vi.fn();
    render(<TodoControl setTodos={fn} itemsLeft={5} />);

    const clearCompletedElement = screen.getByText('Clear completed');
    await userEvent.click(clearCompletedElement);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

test('useEffect', async () => {
  const fn = vi.fn();

  const { rerender } = render(<TodoControl setTodos={fn} itemsLeft={0} />);
  const filterActiveElement = screen.getByText('Active');
  expect(fn).toHaveBeenCalledTimes(0);

  rerender(<TodoControl setTodos={fn} itemsLeft={4} />);
  expect(fn).toHaveBeenCalledTimes(0);

  await userEvent.click(filterActiveElement);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(filterActiveElement).toHaveClass('active');

  rerender(<TodoControl setTodos={fn} itemsLeft={5} />);
  expect(filterActiveElement).toHaveClass('active');
  expect(fn).toHaveBeenCalledTimes(2);

  rerender(<TodoControl setTodos={fn} itemsLeft={5} />);
  expect(fn).toHaveBeenCalledTimes(2);
  expect(filterActiveElement).toHaveClass('active');
});
