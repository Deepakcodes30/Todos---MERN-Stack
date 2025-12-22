import React from "react";
import AddTodo from "./AddTodo.jsx";

const Header = () => {
  return (
    <div className="flex w-full space-x-2.5">
      <div>Logo</div>
      <AddTodo />
      <div>Profile</div>
    </div>
  );
};

export default Header;
