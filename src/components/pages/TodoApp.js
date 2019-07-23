import React from 'react';
import AddTodo from 'components/component-todo/AddTodo';
import TodoList from 'components/component-todo/TodoList';
import VisibilityFilters from 'components/component-todo/VisibilityFilters';
import '../../style.css';

export default function TodoApp() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
