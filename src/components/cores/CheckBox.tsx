import React from "react";

interface CheckBoxProps {
  onChange: () => void;
  checked?: boolean;
}

function CheckBox({ onChange, checked = false }: CheckBoxProps) {
  console.warn("Render {Checkbox}");
  return <input type="checkbox" onChange={onChange} checked={checked} />;
}

const compare = (prevProps: CheckBoxProps, nextProps: CheckBoxProps) => {
  return prevProps.checked === nextProps.checked;
};

export default React.memo(CheckBox, compare);
