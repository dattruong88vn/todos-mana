import React, { useEffect, useReducer } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteAllTodos,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo } from "./models/todo";

import { InputTodo, ItemTodo, Button, CheckBox } from "src/components";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = (todo: Todo) => {
    dispatch(createTodo(todo));
  };

  const onUpdateTodoContent = (id: string, newContent: string) => {
    dispatch(updateTodoContent(id, newContent));
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const renderTodos = (list: Todo[]) => {
    return list.map((todo) => {
      return (
        <ItemTodo
          key={todo.id}
          todo={todo}
          onUpdateTodoContent={onUpdateTodoContent}
          onDeleteTodo={onDeleteTodo}
        />
      );
    });
  };

  return (
    <div className="ToDo__container">
      <InputTodo onCreateTodo={onCreateTodo} />

      <div className="ToDo__list">{renderTodos(todos)}</div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? <CheckBox onChange={() => {}} /> : <div />}
        <div className="Todo__tabs">
          <Button onClick={() => {}} title="All" />
          <Button onClick={() => {}} title="Active" />
          <Button onClick={() => {}} title="Completed" />
        </div>
        <Button onClick={onDeleteAllTodo} title="Clear all todos" />
      </div>
    </div>
  );
};

export default ToDoPage;
