import React, { useState, useEffect, Children } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    //authentication = true && authStatus (false) !=== authentication(true)
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      //!authentication = false && authStatus (true) !=== authentication(false)
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default Protected;
