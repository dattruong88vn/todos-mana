import React from "react";

interface CheckBoxProps {
  onChange: () => void;
  checked?: boolean;
}

function CheckBox({ onChange, checked = false }: CheckBoxProps) {
  return <input type="checkbox" onChange={onChange} checked={checked} />;
}

export default CheckBox;
