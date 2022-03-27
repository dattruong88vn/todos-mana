import { useEffect, useReducer, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  deleteAllTodos,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";

import { InputTodo, ItemTodo, Button, CheckBox } from "src/components";

type EnhancedTodosStatus = TodoStatus | "All";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [show, setShow] = useState<EnhancedTodosStatus>("All");

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

  return (
    <div className="ToDo__container">
      <InputTodo onCreateTodo={onCreateTodo} />

      <div className="ToDo__list">
        {todos.map((todo) => {
          return (
            <ItemTodo
              key={todo.id}
              todo={todo}
              onUpdateTodoContent={onUpdateTodoContent}
              onDeleteTodo={onDeleteTodo}
            />
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <CheckBox onChange={() => {}} checked={show === "All"} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <Button onClick={() => {}} title="All" />
          <Button onClick={() => setShow(TodoStatus.ACTIVE)} title="Active" />
          <Button
            onClick={() => setShow(TodoStatus.COMPLETED)}
            title="Completed"
          />
        </div>
        <Button onClick={onDeleteAllTodo} title="Clear all todos" />
      </div>
    </div>
  );
};

export default ToDoPage;
