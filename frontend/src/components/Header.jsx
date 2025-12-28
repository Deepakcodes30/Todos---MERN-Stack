import React from "react";
import AddTodo from "./AddTodo.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.user.status);
  // console.log("Auth status:", authStatus);

  return (
    <div className="flex w-full space-x-2.5">
      <div>Logo</div>

      {!authStatus ? (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
