import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn.jsx";

const Header = () => {
  const authStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();
  // console.log("Auth status:", authStatus);

  /*const handleLogout = () => {
    try {
      dispatch(logoutUser);
    } catch (error) {
      throw error.message;
    }
  };*/

  return (
    <div className="flex w-full align-middle bg-red-700 items-center justify-evenly h-12 text-white font-medium">
      <div className="mr-45 ml-2 text-2xl">Todos</div>

      {!authStatus ? (
        <div className="text-lg flex gap-2">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="text-md">
          <Link to="/profile">Profile</Link>
          <LogoutBtn />
        </div>
      )}
    </div>
  );
};

export default Header;
