import React from "react";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  title: string;
}

function Button({ className, onClick, title }: ButtonProps) {
  return (
    <button className={className || "Action__btn"} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
