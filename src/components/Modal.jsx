import React from "react";

const Modal = ({ children }) => {
  return <div className="bg-neutral-950 bg-opacity-50 min-h-[100vh] min-w-[100vw] flex items-center justify-center fixed left-0 top-0">{children}</div>;
};

export default Modal;
