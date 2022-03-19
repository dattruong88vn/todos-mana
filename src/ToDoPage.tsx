import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";
import useClickOutside from "./hooks/useClickOutside";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const inputUpdateRef = useRef<any>(null);
  const [isShowUpdate, setIsShowUpdate] = useClickOutside(inputUpdateRef);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedTodo) {
      dispatch(
        updateTodoContent(selectedTodo.id, inputUpdateRef.current.value)
      );
      setIsShowUpdate(false);
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onDeleteTodo = (todoId: any) => {
    dispatch(deleteTodo(todoId));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDoubleClickTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsShowUpdate(true);
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={showing === todo.status}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              {selectedTodo && selectedTodo.id === todo.id && isShowUpdate ? (
                <input
                  className="Todo__input"
                  ref={inputUpdateRef}
                  defaultValue={selectedTodo.content}
                  autoFocus
                  onKeyDown={onUpdateTodoContent}
                />
              ) : (
                <span onDoubleClick={() => onDoubleClickTodo(todo)}>
                  {todo.content}
                </span>
              )}
              <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input type="checkbox" onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn">All</button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
