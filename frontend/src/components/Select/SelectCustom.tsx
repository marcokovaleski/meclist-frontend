import React from "react";
import './SelectCustom.css'
type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const SelectCustom: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <select
      className={`select-filtro ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
