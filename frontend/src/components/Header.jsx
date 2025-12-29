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
          <LogoutBtn />
        </div>
      )}
    </div>
  );
};

export default Header;
