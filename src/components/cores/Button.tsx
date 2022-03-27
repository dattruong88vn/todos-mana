import React from "react";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  title: string;
}

function Button({ className, onClick, title }: ButtonProps) {
  console.warn("Render {Button}");
  return (
    <button className={className || "Action__btn"} onClick={onClick}>
      {title}
    </button>
  );
}

const compare = (prevProps: ButtonProps, nextProps: ButtonProps) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title
  );
};

export default React.memo(Button, compare);
