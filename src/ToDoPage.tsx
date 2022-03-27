import React, { useEffect, useReducer, useRef, useState } from "react";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleMultiTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { Todo, TodoStatus } from "./models/todo";

import { InputTodo, ItemTodo } from "src/components";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);

  const [listCheck, setListCheck] = useState<string[]>([]);

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

  const onCheckTodo = (todoId: string) => {
    let listTemp = [...listCheck];
    const index = listTemp.findIndex((item) => item === todoId);
    if (index > -1) {
      listTemp = listTemp.filter((item) => item !== todoId);
    } else {
      listTemp.push(todoId);
    }
    setListCheck(listTemp);
  };

  const onCheckAll = () => {
    if (todos.length === listCheck.length) {
      setListCheck([]);
    } else {
      setListCheck(todos.map((item) => item.id));
    }
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const onToggleMultiCheckTodo = (type: string) => {
    if (listCheck.length === 0) return;
    dispatch(toggleMultiTodos({ status: type, ids: listCheck }));
    setListCheck([]);
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
          <input
            type="checkbox"
            onChange={onCheckAll}
            checked={todos.length === listCheck.length}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          {/* <button className="Action__btn">All</button> */}
          <button
            className="Action__btn"
            onClick={() => onToggleMultiCheckTodo(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className="Action__btn"
            onClick={() => onToggleMultiCheckTodo(TodoStatus.COMPLETED)}
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
