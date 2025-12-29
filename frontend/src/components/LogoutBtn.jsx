import React, { useEffect } from "react";
import Button from "./Button.jsx";
import { logoutUser } from "../store/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Button type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutBtn;
