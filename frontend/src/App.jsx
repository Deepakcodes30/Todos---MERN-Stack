import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/userSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return !loading ? (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  ) : null;
}

export default App;
