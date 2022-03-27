import React, { useRef, memo } from "react";

import Service from "src/service";

interface InputTodoProps {
  onCreateTodo: Function;
}

const InputTodo = ({ onCreateTodo }: InputTodoProps) => {
  console.warn("Render {InputTodo} {Todo}");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current !== null && e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      onCreateTodo(resp);
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={handleCreateTodo}
        />
      </div>
    </div>
  );
};

export default memo(InputTodo, () => true);
