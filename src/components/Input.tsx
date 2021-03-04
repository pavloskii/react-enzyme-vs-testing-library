import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input = ({ name, label, ...otherProps }: InputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type="text" className="Input" {...otherProps} id={name} />
  </div>
);

export default Input;
