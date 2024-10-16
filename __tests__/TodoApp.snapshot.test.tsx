import TodoApp from '../src/Components/TodoApp';
import { render } from '@testing-library/react';

test('render todo app', () => {
  const { container } = render(<TodoApp />);
  expect(container).toMatchSnapshot();
});
