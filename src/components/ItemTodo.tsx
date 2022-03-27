import React, { useRef, useState } from "react";
import { Todo, TodoStatus } from "src/models/todo";

import { CheckBox } from "src/components";

import { useClickOutside } from "src/hooks/";

interface ItemTodoProps {
  todo: Todo;
  onUpdateTodoContent: (id: string, newContent: string) => void;
  onDeleteTodo: (id: string) => void;
}

function ItemTodo({ todo, onUpdateTodoContent, onDeleteTodo }: ItemTodoProps) {
  console.warn("Render {ItemTodo} {Todos}");

  const { id, content } = todo;
  const inputUpdateRef = useRef<HTMLInputElement>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isShowUpdate, setIsShowUpdate] = useClickOutside(inputUpdateRef);

  const handleCheckTodo = (id: String) => {};

  const handleDoubleClickTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsShowUpdate(true);
  };

  const handleUpdateTodoContent = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && selectedTodo) {
      onUpdateTodoContent(selectedTodo.id, inputUpdateRef.current?.value || "");
      setIsShowUpdate(false);
    }
  };

  const handleDeleteTodo = (id: string) => {
    onDeleteTodo(id);
  };

  return (
    <div key={id} className="ToDo__item">
      <CheckBox onChange={() => handleCheckTodo(id)} />
      {selectedTodo && selectedTodo.id === todo.id && isShowUpdate ? (
        <input
          ref={inputUpdateRef}
          className="Todo__input"
          autoFocus
          defaultValue={selectedTodo.content}
          onKeyDown={handleUpdateTodoContent}
        />
      ) : (
        <span onDoubleClick={() => handleDoubleClickTodo(todo)}>{content}</span>
      )}
      <button className="Todo__delete" onClick={() => handleDeleteTodo(id)}>
        X
      </button>
    </div>
  );
}

export default ItemTodo;
