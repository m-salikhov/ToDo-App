import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import TodoControl from '../src/Components/TodoControl';

describe('TodoControl render', () => {
  test('todo control', () => {
    render(<TodoControl setTodos={() => {}} itemsLeft={0} />);

    const todoControlElement = screen.getByTestId('todo-control');
    const filterAllElement = screen.getByText('All');

    expect(todoControlElement).toBeInTheDocument();
    expect(filterAllElement).toHaveClass('selected');
  });

  test('left items counter', () => {
    let itemsLeft = 0;
    const { rerender } = render(<TodoControl setTodos={() => {}} itemsLeft={itemsLeft} />);

    const itemsLeftElementEmpty = screen.getByText(/0/);
    expect(itemsLeftElementEmpty).toHaveTextContent('0 items left');

    itemsLeft = 5;
    rerender(<TodoControl setTodos={() => {}} itemsLeft={itemsLeft} />);

    const itemsLeftElementNotEmpty = screen.getByText(/5/);
    expect(itemsLeftElementNotEmpty).toHaveTextContent('5 items left');
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
    expect(filterAllElement).not.toHaveClass('selected');
    expect(filterActiveElement).toHaveClass('selected');
    expect(filterCompletedElement).not.toHaveClass('selected');

    await userEvent.click(filterActiveElement);
    expect(fn).toHaveBeenCalledTimes(1);

    await userEvent.click(filterCompletedElement);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(filterAllElement).not.toHaveClass('selected');
    expect(filterActiveElement).not.toHaveClass('selected');
    expect(filterCompletedElement).toHaveClass('selected');

    await userEvent.click(filterAllElement);
    expect(fn).toHaveBeenCalledTimes(3);
    expect(filterAllElement).toHaveClass('selected');
    expect(filterActiveElement).not.toHaveClass('selected');
    expect(filterCompletedElement).not.toHaveClass('selected');
  });

  test('click on clear completed button', async () => {
    const fn = vi.fn();
    render(<TodoControl setTodos={fn} itemsLeft={5} />);

    const clearCompletedElement = screen.getByText('Clear completed');
    await userEvent.click(clearCompletedElement);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

test('filter in useEffect when itemsLeft changes', async () => {
  const fn = vi.fn();

  const { rerender } = render(<TodoControl setTodos={fn} itemsLeft={0} />);
  expect(fn).toHaveBeenCalledTimes(0);

  rerender(<TodoControl setTodos={fn} itemsLeft={4} />);
  expect(fn).toHaveBeenCalledTimes(0);

  const filterActiveElement = screen.getByText('Active');

  await userEvent.click(filterActiveElement);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(filterActiveElement).toHaveClass('selected');

  rerender(<TodoControl setTodos={fn} itemsLeft={5} />);
  expect(filterActiveElement).toHaveClass('selected');
  expect(fn).toHaveBeenCalledTimes(2);

  rerender(<TodoControl setTodos={fn} itemsLeft={5} />);
  expect(fn).toHaveBeenCalledTimes(2);
  expect(filterActiveElement).toHaveClass('selected');
});
