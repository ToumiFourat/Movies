import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-dark-subtle  w-full text-lg outline-none focus:border-white p-1 text-white peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
        htmlFor="email"
      >
        {label}
      </label>
    </div>
  );
}
