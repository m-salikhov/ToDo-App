import { render, screen } from '@testing-library/react';
import TodoForm from '../src/Components/TodoForm';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('render todo form', () => {
  render(<TodoForm setTodos={() => {}} />);

  const inputElement = screen.getByPlaceholderText('What needs to be done?');
  const buttonElement = screen.getByRole('button', { name: 'Add' });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

describe('user interactions with form', () => {
  test('change input value', async () => {
    const fn = vi.fn();
    render(<TodoForm setTodos={fn} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');

    await userEvent.type(inputElement, 'test');
    expect(inputElement).toHaveValue('test');
    expect(fn).toHaveBeenCalledTimes(0);

    await userEvent.clear(inputElement);
    expect(inputElement).toHaveValue('');
    expect(fn).toHaveBeenCalledTimes(0);
  });

  test('add todo by enter or click Add button', async () => {
    const fn = vi.fn();
    render(<TodoForm setTodos={fn} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    const buttonElement = screen.getByRole('button', { name: 'Add' });

    //with empty input
    await userEvent.keyboard('{Enter}');
    await userEvent.click(buttonElement);
    expect(fn).toHaveBeenCalledTimes(0);

    await userEvent.type(inputElement, 'test');
    await userEvent.click(buttonElement);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('');

    await userEvent.type(inputElement, 'test');
    await userEvent.keyboard('{Enter}');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(inputElement).toHaveValue('');
  });
});
