import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={"max-w-screen-xl mx-auto p-2" + className}>{children}</div>
  );
}
