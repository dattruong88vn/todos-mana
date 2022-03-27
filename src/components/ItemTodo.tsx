import React, { useRef, useState, memo } from "react";
import { Todo, TodoStatus } from "src/models/todo";

import { CheckBox } from "src/components";

import { useClickOutside } from "src/hooks/";

interface ItemTodoProps {
  todo: Todo;
  onUpdateTodoContent: (id: string, newContent: string) => void;
  onDeleteTodo: (id: string) => void;
}

function ItemTodo({ todo, onUpdateTodoContent, onDeleteTodo }: ItemTodoProps) {
  console.warn(`Render {${todo.id}} {ItemTodo} {Todos}`);

  const { id, content, status } = todo;
  const inputUpdateRef = useRef<HTMLInputElement>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isShowUpdate, setIsShowUpdate] = useClickOutside(inputUpdateRef);

  const handleCheckTodo = (id: string) => {};

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

const compare = (prevProps: ItemTodoProps, nextProps: ItemTodoProps) => {
  const { todo: prevTodo } = prevProps;
  const { todo: nextTodo } = nextProps;

  return (
    prevTodo.id === nextTodo.id &&
    prevTodo.content === nextTodo.content &&
    prevTodo.status === nextTodo.status
  );
};

export default memo(ItemTodo, compare);
