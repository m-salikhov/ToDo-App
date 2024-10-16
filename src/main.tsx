import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TodoApp from './Components/TodoApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoApp />
  </StrictMode>
);
